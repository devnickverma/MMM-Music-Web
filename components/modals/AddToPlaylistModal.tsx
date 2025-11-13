"use client"

import * as React from "react"
import { Search, Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Playlist {
  id: string
  name: string
  song_count: number
  cover_image_url?: string
  containsSong?: boolean
}

interface AddToPlaylistModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  songId: string
  songTitle?: string
  onCreateNew?: () => void
}

// Mock playlists data
const mockPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'My Favorites',
    song_count: 24,
    cover_image_url: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=100&h=100&fit=crop',
    containsSong: true,
  },
  {
    id: '2',
    name: 'Chill Vibes',
    song_count: 18,
    cover_image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop',
    containsSong: false,
  },
  {
    id: '3',
    name: 'Workout Mix',
    song_count: 32,
    cover_image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
    containsSong: false,
  },
  {
    id: '4',
    name: 'Road Trip',
    song_count: 45,
    cover_image_url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=100&h=100&fit=crop',
    containsSong: false,
  },
  {
    id: '5',
    name: 'Late Night Study',
    song_count: 28,
    cover_image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop',
    containsSong: false,
  },
  {
    id: '6',
    name: 'Party Hits',
    song_count: 50,
    cover_image_url: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=100&h=100&fit=crop',
    containsSong: true,
  },
]

export function AddToPlaylistModal({ 
  open, 
  onOpenChange, 
  songId, 
  songTitle,
  onCreateNew 
}: AddToPlaylistModalProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedPlaylists, setSelectedPlaylists] = React.useState<Set<string>>(
    new Set(mockPlaylists.filter(p => p.containsSong).map(p => p.id))
  )

  // Filter playlists based on search query
  const filteredPlaylists = React.useMemo(() => {
    if (!searchQuery.trim()) return mockPlaylists
    return mockPlaylists.filter(playlist =>
      playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const handleTogglePlaylist = (playlistId: string) => {
    setSelectedPlaylists(prev => {
      const newSet = new Set(prev)
      if (newSet.has(playlistId)) {
        newSet.delete(playlistId)
      } else {
        newSet.add(playlistId)
      }
      return newSet
    })
  }

  const handleDone = () => {
    // Handle adding/removing song from playlists
    console.log("Updating playlists for song:", songId)
    console.log("Selected playlists:", Array.from(selectedPlaylists))
    onOpenChange(false)
  }

  const handleCreateNew = () => {
    onOpenChange(false)
    onCreateNew?.()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add to Playlist</DialogTitle>
          <DialogDescription>
            {songTitle ? `Add "${songTitle}" to your playlists` : "Choose playlists to add this song"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Create New Playlist Button */}
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleCreateNew}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Playlist
          </Button>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search playlists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Playlist List */}
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-2">
              {filteredPlaylists.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No playlists found
                </p>
              ) : (
                filteredPlaylists.map((playlist) => {
                  const isSelected = selectedPlaylists.has(playlist.id)
                  const wasOriginallySelected = playlist.containsSong

                  return (
                    <div
                      key={playlist.id}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50",
                        isSelected && "bg-muted/30"
                      )}
                      onClick={() => handleTogglePlaylist(playlist.id)}
                    >
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => handleTogglePlaylist(playlist.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      
                      {/* Playlist Cover */}
                      {playlist.cover_image_url && (
                        <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={playlist.cover_image_url}
                            alt={playlist.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Playlist Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm truncate">
                            {playlist.name}
                          </p>
                          {wasOriginallySelected && (
                            <Check className="h-4 w-4 text-primary flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {playlist.song_count} songs
                        </p>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </ScrollArea>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleDone}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
