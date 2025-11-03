'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Pause, Heart, MoreVertical } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePlayerStore, type Song } from '@/lib/store/player-store'
import { cn } from '@/lib/utils'

interface SongCardProps {
  song: Song
  queue?: Song[]
}

export function SongCard({ song, queue = [] }: SongCardProps) {
  const { currentSong, isPlaying, playSong, pause, play } = usePlayerStore()
  
  const isCurrentSong = currentSong?.id === song.id
  const showPauseButton = isCurrentSong && isPlaying

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isCurrentSong) {
      if (isPlaying) {
        pause()
      } else {
        play()
      }
    } else {
      playSong(song, queue)
    }
  }

  return (
    <Link href={`/song/${song.id}`}>
      <Card className="group relative overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer">
        <div className="relative aspect-square overflow-hidden bg-secondary">
          {song.cover_image_url ? (
            <Image
              src={song.cover_image_url}
              alt={song.title}
              fill
              className="object-cover transition-transform group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
              <span className="text-4xl font-bold text-primary/40">
                {song.title.charAt(0)}
              </span>
            </div>
          )}
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              size="icon"
              className={cn(
                "h-12 w-12 rounded-full shadow-lg transform transition-transform",
                "group-hover:scale-100 scale-90",
                isCurrentSong && "scale-100"
              )}
              onClick={handlePlayClick}
            >
              {showPauseButton ? (
                <Pause className="h-6 w-6" fill="currentColor" />
              ) : (
                <Play className="h-6 w-6 ml-0.5" fill="currentColor" />
              )}
            </Button>
          </div>

          {/* Current Playing Indicator */}
          {isCurrentSong && (
            <div className="absolute top-2 right-2">
              <div className="flex items-center gap-0.5 bg-primary px-2 py-1 rounded-full">
                <div className="w-1 h-3 bg-primary-foreground rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                <div className="w-1 h-3 bg-primary-foreground rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                <div className="w-1 h-3 bg-primary-foreground rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold truncate mb-1 group-hover:text-primary transition-colors">
            {song.title}
          </h3>
          <p className="text-sm text-muted-foreground truncate mb-2">
            {song.artist_name}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
            </span>
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
