'use client'

import { Button } from '@/components/ui/button'
import { Play, Pause, Heart, MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePlayerStore, type Song } from '@/lib/store/player-store'
import { cn } from '@/lib/utils'

interface SongRowProps {
  song: Song
  queue?: Song[]
  index?: number
  showIndex?: boolean
}

export function SongRow({ song, queue = [], index, showIndex = false }: SongRowProps) {
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
      <div 
        className={cn(
          "group flex items-center gap-4 p-2 rounded-md hover:bg-secondary/50 transition-colors cursor-pointer",
          isCurrentSong && "bg-secondary/30"
        )}
      >
        {/* Index / Play Button */}
        <div className="w-8 flex items-center justify-center flex-shrink-0">
          <span className={cn(
            "text-sm text-muted-foreground group-hover:hidden",
            isCurrentSong && "hidden"
          )}>
            {index !== undefined ? index + 1 : ''}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 hidden group-hover:flex",
              isCurrentSong && "flex"
            )}
            onClick={handlePlayClick}
          >
            {showPauseButton ? (
              <Pause className="h-4 w-4" fill="currentColor" />
            ) : (
              <Play className="h-4 w-4" fill="currentColor" />
            )}
          </Button>
        </div>

        {/* Cover Image & Info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative w-10 h-10 rounded flex-shrink-0 overflow-hidden bg-secondary">
            {song.cover_image_url ? (
              <Image
                src={song.cover_image_url}
                alt={song.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/10">
                <span className="text-xs font-bold text-primary">
                  {song.title.charAt(0)}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex flex-col min-w-0">
            <span className={cn(
              "font-medium truncate text-sm",
              isCurrentSong && "text-primary"
            )}>
              {song.title}
            </span>
            <span className="text-xs text-muted-foreground truncate">
              {song.artist_name}
            </span>
          </div>
        </div>

        {/* Duration */}
        <div className="hidden md:block text-sm text-muted-foreground">
          {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8"
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
            className="h-8 w-8"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Link>
  )
}
