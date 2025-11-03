import type { Song } from './store/player-store'

export const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Midnight Dreams',
    artist_name: 'Luna Wave',
    audio_url: '/demo-music/song1.mp3',
    cover_image_url: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400&h=400&fit=crop',
    duration: 234,
  },
  {
    id: '2',
    title: 'Electric Heartbeat',
    artist_name: 'Neon Pulse',
    audio_url: '/demo-music/song2.mp3',
    cover_image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    duration: 198,
  },
  {
    id: '3',
    title: 'Sunset Boulevard',
    artist_name: 'The Wanderers',
    audio_url: '/demo-music/song3.mp3',
    cover_image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    duration: 267,
  },
  {
    id: '4',
    title: 'Ocean Waves',
    artist_name: 'Serene Sounds',
    audio_url: '/demo-music/song4.mp3',
    cover_image_url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop',
    duration: 312,
  },
  {
    id: '5',
    title: 'City Lights',
    artist_name: 'Urban Echo',
    audio_url: '/demo-music/song5.mp3',
    cover_image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop',
    duration: 189,
  },
  {
    id: '6',
    title: 'Mountain High',
    artist_name: 'Peak Performance',
    audio_url: '/demo-music/song6.mp3',
    cover_image_url: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop',
    duration: 245,
  },
  {
    id: '7',
    title: 'Desert Storm',
    artist_name: 'Wild Horizon',
    audio_url: '/demo-music/song7.mp3',
    cover_image_url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=400&fit=crop',
    duration: 221,
  },
  {
    id: '8',
    title: 'Starlight Melody',
    artist_name: 'Cosmic Harmony',
    audio_url: '/demo-music/song8.mp3',
    cover_image_url: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=400&h=400&fit=crop',
    duration: 278,
  },
  {
    id: '9',
    title: 'Thunder Road',
    artist_name: 'Storm Chasers',
    audio_url: '/demo-music/song9.mp3',
    cover_image_url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=400&fit=crop',
    duration: 256,
  },
  {
    id: '10',
    title: 'Golden Hour',
    artist_name: 'Sunset Collective',
    audio_url: '/demo-music/song10.mp3',
    cover_image_url: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=400&h=400&fit=crop',
    duration: 192,
  },
  {
    id: '11',
    title: 'Neon Nights',
    artist_name: 'Retro Fusion',
    audio_url: '/demo-music/song11.mp3',
    cover_image_url: 'https://images.unsplash.com/photo-1484755560615-a4c64e778a6c?w=400&h=400&fit=crop',
    duration: 203,
  },
  {
    id: '12',
    title: 'Forest Whispers',
    artist_name: 'Nature Sounds',
    audio_url: '/demo-music/song12.mp3',
    cover_image_url: 'https://images.unsplash.com/photo-1476431995121-fc5d0da7a086?w=400&h=400&fit=crop',
    duration: 289,
  },
]

export const featuredSong: Song = mockSongs[0]
export const newReleases: Song[] = mockSongs.slice(0, 6)
export const trendingSongs: Song[] = mockSongs.slice(3, 9)
export const recommendedSongs: Song[] = mockSongs.slice(6, 12)
