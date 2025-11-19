"use client"

import * as React from "react"
import { X, GripVertical, Music, Save, Trash2 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { usePlayerStore } from "@/lib/store/player-store"
import { cn } from "@/lib/utils"

interface QueueDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Animated "Now Playing" bars component
function PlayingIndicator() {
  return (
    <div className="flex items-end gap-0.5 h-4 w-4">
      <div className="w-1 bg-primary rounded-full animate-[wave_1s_ease-in-out_infinite]" style={{ animationDelay: '0s', height: '40%' }} />
      <div className="w-1 bg-primary rounded-full animate-[wave_1s_ease-in-out_infinite]" style={{ animationDelay: '0.2s', height: '70%' }} />
      <div className="w-1 bg-primary rounded-full animate-[wave_1s_ease-in-out_infinite]" style={{ animationDelay: '0.4s', height: '50%' }} />
    </div>
  )
}

export function QueueDrawer({ open, onOpenChange }: QueueDrawerProps) {
  const { currentSong, queue, removeFromQueue, clearQueue } = usePlayerStore()

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSaveAsPlaylist = () => {
    console.log("Save queue as playlist")
    // This would open CreatePlaylistModal with queue songs pre-populated
  }

  const handleClearQueue = () => {
    if (confirm("Are you sure you want to clear the queue?")) {
      clearQueue()
    }
  }

  const isEmpty = !currentSong && queue.length === 0

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-full sm:w-[400px] p-0 flex flex-col"
      >
        {/* Header */}
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle>Queue</SheetTitle>
        </SheetHeader>

        {isEmpty ? (
          /* Empty State */
          <div className="flex-1 flex items-center justify-center px-6">
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <div className="rounded-full bg-muted p-4">
                  <Music className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Queue is empty</h3>
                <p className="text-sm text-muted-foreground">
                  Add songs to start playing!
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Content */}
            <ScrollArea className="flex-1 px-6 py-4">
              <div className="space-y-6">
                {/* Now Playing Section */}
                {currentSong && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      Now Playing
                    </h3>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                      {/* Cover Image */}
                      <div className="relative w-14 h-14 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        {currentSong.cover_image_url ? (
                          <Image
                            src={currentSong.cover_image_url}
                            alt={currentSong.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-primary/10">
                            <Music className="h-6 w-6 text-primary" />
                          </div>
                        )}
                      </div>

                      {/* Song Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-sm truncate">
                            {currentSong.title}
                          </p>
                          <PlayingIndicator />
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {currentSong.artist_name}
                        </p>
                      </div>

                      {/* Duration */}
                      <div className="text-xs text-muted-foreground flex-shrink-0">
                        {formatDuration(currentSong.duration)}
                      </div>
                    </div>
                  </div>
                )}

                {/* Up Next Section */}
                {queue.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Up Next
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {queue.length} {queue.length === 1 ? 'song' : 'songs'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      {queue.map((song, index) => (
                        <div
                          key={`${song.id}-${index}`}
                          className="group flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          {/* Drag Handle */}
                          <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                          </div>

                          {/* Cover Image */}
                          <div className="relative w-10 h-10 rounded overflow-hidden bg-muted flex-shrink-0">
                            {song.cover_image_url ? (
                              <Image
                                src={song.cover_image_url}
                                alt={song.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-primary/10">
                                <Music className="h-4 w-4 text-primary" />
                              </div>
                            )}
                          </div>

                          {/* Song Info */}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">
                              {song.title}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {song.artist_name}
                            </p>
                          </div>

                          {/* Duration */}
                          <div className="text-xs text-muted-foreground flex-shrink-0">
                            {formatDuration(song.duration)}
                          </div>

                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                            onClick={() => removeFromQueue(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Footer Actions */}
            {(currentSong || queue.length > 0) && (
              <div className="border-t px-6 py-4 space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={handleSaveAsPlaylist}
                >
                  <Save className="h-4 w-4" />
                  Save as Playlist
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-destructive hover:text-destructive"
                  onClick={handleClearQueue}
                  disabled={queue.length === 0}
                >
                  <Trash2 className="h-4 w-4" />
                  Clear Queue
                </Button>
              </div>
            )}
          </>
        )}
      </SheetContent>

      {/* CSS for wave animation */}
      <style jsx global>{`
        @keyframes wave {
          0%, 100% {
            height: 40%;
          }
          50% {
            height: 100%;
          }
        }
      `}</style>
    </Sheet>
  )
}
