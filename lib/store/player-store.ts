import { create } from 'zustand'
import { Howl } from 'howler'

export interface Song {
  id: string
  title: string
  artist_name: string
  audio_url: string
  cover_image_url: string
  duration: number
}

interface PlayerState {
  currentSong: Song | null
  queue: Song[]
  isPlaying: boolean
  volume: number
  currentTime: number
  duration: number
  howl: Howl | null
  repeat: 'off' | 'one' | 'all'
  shuffle: boolean
  
  playSong: (song: Song, queue?: Song[]) => void
  play: () => void
  pause: () => void
  togglePlayPause: () => void
  next: () => void
  previous: () => void
  seek: (time: number) => void
  setVolume: (vol: number) => void
  addToQueue: (song: Song) => void
  removeFromQueue: (index: number) => void
  clearQueue: () => void
  toggleRepeat: () => void
  toggleShuffle: () => void
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSong: null,
  queue: [],
  isPlaying: false,
  volume: 0.7,
  currentTime: 0,
  duration: 0,
  howl: null,
  repeat: 'off',
  shuffle: false,
  
  playSong: (song, queue = []) => {
    const { howl } = get()
    if (howl) {
      howl.unload()
    }
    
    const newHowl = new Howl({
      src: [song.audio_url],
      html5: true,
      volume: get().volume,
      onplay: () => set({ isPlaying: true }),
      onpause: () => set({ isPlaying: false }),
      onend: () => {
        const state = get()
        if (state.repeat === 'one') {
          newHowl.play()
        } else {
          state.next()
        }
      },
      onload: function() {
        set({ duration: this.duration() })
      },
      onseek: () => {
        const currentTime = newHowl.seek() as number
        set({ currentTime })
      }
    })
    
    newHowl.play()
    set({ 
      currentSong: song, 
      howl: newHowl,
      queue: queue.length > 0 ? queue : get().queue
    })
    
    // Update current time every 100ms
    const interval = setInterval(() => {
      if (newHowl.playing()) {
        const currentTime = newHowl.seek() as number
        set({ currentTime })
      }
    }, 100)
    
    newHowl.once('end', () => clearInterval(interval))
    newHowl.once('stop', () => clearInterval(interval))
  },
  
  play: () => {
    const { howl } = get()
    if (howl && !howl.playing()) {
      howl.play()
      set({ isPlaying: true })
    }
  },
  
  pause: () => {
    const { howl } = get()
    if (howl && howl.playing()) {
      howl.pause()
      set({ isPlaying: false })
    }
  },
  
  togglePlayPause: () => {
    const { isPlaying, play, pause } = get()
    isPlaying ? pause() : play()
  },
  
  next: () => {
    const { queue, repeat, shuffle } = get()
    
    if (queue.length > 0) {
      let nextSong: Song
      let newQueue: Song[]
      
      if (shuffle) {
        const randomIndex = Math.floor(Math.random() * queue.length)
        nextSong = queue[randomIndex]
        newQueue = queue.filter((_, i) => i !== randomIndex)
      } else {
        nextSong = queue[0]
        newQueue = queue.slice(1)
      }
      
      get().playSong(nextSong)
      set({ queue: newQueue })
      
      if (repeat === 'all' && get().currentSong) {
        set({ queue: [...newQueue, get().currentSong!] })
      }
    } else if (repeat === 'all' && get().currentSong) {
      get().playSong(get().currentSong!)
    }
  },
  
  previous: () => {
    const { howl, currentSong } = get()
    if (howl) {
      const currentTime = howl.seek() as number
      // If more than 3 seconds in, restart current song
      if (currentTime > 3 && currentSong) {
        howl.seek(0)
      }
      // Otherwise would go to actual previous (need history implementation)
    }
  },
  
  seek: (time) => {
    const { howl } = get()
    if (howl) {
      howl.seek(time)
      set({ currentTime: time })
    }
  },
  
  setVolume: (vol) => {
    const { howl } = get()
    if (howl) {
      howl.volume(vol)
    }
    set({ volume: vol })
  },
  
  addToQueue: (song) => {
    set((state) => ({ queue: [...state.queue, song] }))
  },
  
  removeFromQueue: (index) => {
    set((state) => ({
      queue: state.queue.filter((_, i) => i !== index)
    }))
  },
  
  clearQueue: () => {
    set({ queue: [] })
  },
  
  toggleRepeat: () => {
    set((state) => ({
      repeat: state.repeat === 'off' ? 'all' : state.repeat === 'all' ? 'one' : 'off'
    }))
  },
  
  toggleShuffle: () => {
    set((state) => ({ shuffle: !state.shuffle }))
  }
}))
