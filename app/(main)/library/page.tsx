'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SongCard } from '@/components/song/SongCard'
import { SongRow } from '@/components/song/SongRow'
import { EmptyState } from '@/components/ui/EmptyState'
import { PlaylistCardSkeleton } from '@/components/ui/PlaylistCardSkeleton'
import { Plus, ListMusic, Heart, Clock, Music, MoreVertical, Pencil } from 'lucide-react'
import { mockSongs, mockPlaylists } from '@/lib/mock-data'
import { CreatePlaylistModal, EditPlaylistModal } from '@/components/modals'

export default function LibraryPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedPlaylist, setSelectedPlaylist] = useState<any>(null)

  // Simulate loading - remove this in production when using real API
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleEditPlaylist = (playlist: any) => {
    setSelectedPlaylist(playlist)
    setEditModalOpen(true)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Library</h1>
        <Button className="gap-2" onClick={() => setCreateModalOpen(true)}>
          <Plus className="h-4 w-4" />
          Create Playlist
        </Button>
      </div>

      <Tabs defaultValue="playlists" className="space-y-6">
        <TabsList>
          <TabsTrigger value="playlists" className="gap-2">
            <ListMusic className="h-4 w-4" />
            Playlists
          </TabsTrigger>
          <TabsTrigger value="liked" className="gap-2">
            <Heart className="h-4 w-4" />
            Liked Songs
          </TabsTrigger>
          <TabsTrigger value="recent" className="gap-2">
            <Clock className="h-4 w-4" />
            Recently Played
          </TabsTrigger>
        </TabsList>

        {/* Playlists Tab */}
        <TabsContent value="playlists" className="space-y-4">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <PlaylistCardSkeleton key={i} />
              ))}
            </div>
          ) : mockPlaylists.length === 0 ? (
            <EmptyState
              icon={Music}
              title="No playlists yet"
              description="Create your first playlist to organize your music"
              action={{
                label: "Create Playlist",
                onClick: () => setCreateModalOpen(true)
              }}
            />
          ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {mockPlaylists.map((playlist) => (
              <Card
                key={playlist.id}
                className="group cursor-pointer hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="aspect-square relative bg-secondary overflow-hidden">
                  <img
                    src={playlist.cover_image_url || mockSongs[0].cover_image_url}
                    alt={playlist.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="icon" className="h-12 w-12 rounded-full">
                      <Play className="h-6 w-6" fill="currentColor" />
                    </Button>
                  </div>
                  {/* Edit Button */}
                  <Button
                    size="icon-sm"
                    variant="secondary"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEditPlaylist(playlist)
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm truncate">
                    {playlist.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {playlist.songs.length} songs
                  </p>
                </div>
              </Card>
            ))}
            
            {/* Create New Playlist Card */}
            <Card
              className="group cursor-pointer hover:shadow-lg transition-all border-dashed border-2 hover:border-primary"
              onClick={() => setCreateModalOpen(true)}
            >
              <div className="aspect-square flex items-center justify-center bg-secondary/30">
                <Plus className="h-12 w-12 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm">Create New Playlist</h3>
                <p className="text-xs text-muted-foreground">Build your collection</p>
              </div>
            </Card>
          </div>
          )}
        </TabsContent>

        {/* Liked Songs Tab */}
        <TabsContent value="liked" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Liked Songs</h2>
              <p className="text-sm text-muted-foreground">{mockSongs.length} songs</p>
            </div>
            <Button>Play All</Button>
          </div>
          <div className="space-y-1">
            {mockSongs.map((song, index) => (
              <SongRow key={song.id} song={song} queue={mockSongs} index={index} />
            ))}
          </div>
        </TabsContent>

        {/* Recently Played Tab */}
        <TabsContent value="recent" className="space-y-4">
          <h2 className="text-2xl font-bold">Recently Played</h2>
          <div className="space-y-1">
            {mockSongs.slice(0, 8).map((song, index) => (
              <SongRow key={song.id} song={song} queue={mockSongs} index={index} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <CreatePlaylistModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />

      {selectedPlaylist && (
        <EditPlaylistModal
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          playlist={selectedPlaylist}
        />
      )}
    </div>
  )
}

function Play(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}
