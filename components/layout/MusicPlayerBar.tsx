'use client'

import { usePlayerStore } from '@/lib/store/player-store'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Repeat,
  Shuffle,
  ListMusic,
  Heart
} from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function MusicPlayerBar() {
  const { 
    currentSong, 
    isPlaying, 
    volume, 
    currentTime, 
    duration,
    repeat,
    shuffle,
    togglePlayPause,
    next,
    previous,
    seek,
    setVolume,
    toggleRepeat,
    toggleShuffle
  } = usePlayerStore()

  const [isMuted, setIsMuted] = useState(false)
  const [previousVolume, setPreviousVolume] = useState(volume)

  const handleVolumeToggle = () => {
    if (isMuted) {
      setVolume(previousVolume)
      setIsMuted(false)
    } else {
      setPreviousVolume(volume)
      setVolume(0)
      setIsMuted(true)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
    if (newVolume > 0) {
      setPreviousVolume(newVolume)
    }
  }

  const handleSeek = (value: number[]) => {
    seek(value[0])
  }

  // Calculate progress percentage
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  if (!currentSong) {
    return null // Don't show player if no song is playing
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Progress Bar */}
      <div className="relative h-1 bg-secondary cursor-pointer group" onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const percentage = x / rect.width
        seek(percentage * duration)
      }}>
        <div 
          className="absolute h-full bg-primary transition-all"
          style={{ width: `${progress}%` }}
        />
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
        />
      </div>

      <div className="flex items-center justify-between px-4 py-3 gap-4">
        {/* Left: Song Info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative w-14 h-14 rounded-md overflow-hidden flex-shrink-0 bg-secondary">
            {currentSong.cover_image_url ? (
              <Image
                src={currentSong.cover_image_url}
                alt={currentSong.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ListMusic className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <h4 className="text-sm font-semibold truncate">{currentSong.title}</h4>
            <p className="text-xs text-muted-foreground truncate">{currentSong.artist_name}</p>
          </div>
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Center: Player Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleShuffle}
              className={cn(shuffle && 'text-primary')}
            >
              <Shuffle className="h-4 w-4" />
            </Button>
            
            <Button variant="ghost" size="icon" onClick={previous}>
              <SkipBack className="h-5 w-5" />
            </Button>
            
            <Button 
              size="icon" 
              className="h-10 w-10 rounded-full"
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" fill="currentColor" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" fill="currentColor" />
              )}
            </Button>
            
            <Button variant="ghost" size="icon" onClick={next}>
              <SkipForward className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleRepeat}
              className={cn(repeat !== 'off' && 'text-primary')}
            >
              <Repeat className="h-4 w-4" />
              {repeat === 'one' && (
                <span className="absolute text-[10px] font-bold">1</span>
              )}
            </Button>
          </div>
          
          {/* Time and Slider */}
          <div className="hidden md:flex items-center gap-2 w-full">
            <span className="text-xs text-muted-foreground w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              onValueChange={handleSeek}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Right: Volume Control */}
        <div className="hidden lg:flex items-center gap-2 flex-1 justify-end">
          <Button variant="ghost" size="icon" onClick={handleVolumeToggle}>
            {isMuted || volume === 0 ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="w-24"
          />
        </div>
      </div>
    </div>
  )
}
