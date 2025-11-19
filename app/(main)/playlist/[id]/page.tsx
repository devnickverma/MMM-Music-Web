'use client'

import { Button } from '@/components/ui/button'
import { SongRow } from '@/components/song/SongRow'
import { Play, Heart, MoreHorizontal, Clock, Share2, Pencil, Trash2 } from 'lucide-react'
import { mockSongs, mockPlaylists } from '@/lib/mock-data'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ShareModal } from '@/components/modals/ShareModal'
import { EditPlaylistModal } from '@/components/modals/EditPlaylistModal'
import { DeleteModal } from '@/components/modals/DeleteModal'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import toast from 'react-hot-toast'

export default function PlaylistPage() {
  const params = useParams()
  const router = useRouter()
  const playlistId = params.id as string
  
  const [shareOpen, setShareOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  
  // Find playlist from global mock data
  const playlist = mockPlaylists.find(p => p.id === playlistId)

  // If playlist doesn't exist (deleted or invalid ID), show 404 or redirect
  useEffect(() => {
    if (!playlist && playlistId) {
      // In a real app, we might redirect or show a not found state
      // For now, we'll just let it render null or a fallback
    }
  }, [playlist, playlistId])

  if (!playlist) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-4">Playlist not found</h1>
        <Button onClick={() => router.push('/library')}>Go to Library</Button>
      </div>
    )
  }

  const handleDelete = () => {
    const index = mockPlaylists.findIndex(p => p.id === playlistId)
    if (index !== -1) {
      mockPlaylists.splice(index, 1)
      toast.success("Playlist deleted")
      router.push('/library')
    }
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Playlist Header */}
      <div className="bg-gradient-to-b from-primary/20 to-background p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
          {/* Cover Image */}
          <div className="w-full md:w-64 aspect-square relative rounded-lg overflow-hidden shadow-2xl group">
            <Image
              src={playlist.cover_image_url || mockSongs[0].cover_image_url}
              alt={playlist.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <Button variant="secondary" size="sm" onClick={() => setEditOpen(true)}>
                 <Pencil className="h-4 w-4 mr-2" />
                 Edit
               </Button>
            </div>
          </div>

          {/* Playlist Info */}
          <div className="flex-1 space-y-4">
            <p className="text-sm font-medium uppercase tracking-wider">Playlist</p>
            <h1 className="text-4xl md:text-6xl font-bold">{playlist.name}</h1>
            {playlist.description && (
              <p className="text-muted-foreground text-lg">{playlist.description}</p>
            )}
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold">User {playlist.user_id}</span>
              <span>•</span>
              <span>{playlist.songs.length} songs</span>
              <span>•</span>
              <span>{playlist.is_public ? 'Public' : 'Private'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 md:px-8 py-6 flex items-center gap-4">
        <Button size="lg" className="rounded-full h-14 w-14 p-0">
          <Play className="h-6 w-6" fill="currentColor" />
        </Button>
        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full">
          <Heart className="h-6 w-6" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-12 w-12 rounded-full"
          onClick={() => setShareOpen(true)}
        >
          <Share2 className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full">
              <MoreHorizontal className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setEditOpen(true)}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Details
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600" onClick={() => setDeleteOpen(true)}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Playlist
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Songs List */}
      <div className="px-6 md:px-8">
        {/* Table Header */}
        <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-2 text-sm text-muted-foreground border-b">
          <div className="w-8">#</div>
          <div>Title</div>
          <div className="hidden md:block">Artist</div>
          <div className="w-12">
            <Clock className="h-4 w-4" />
          </div>
        </div>

        {/* Songs */}
        <div className="mt-2 space-y-1">
          {playlist.songs.length > 0 ? (
            playlist.songs.map((song, index) => (
              <SongRow
                key={song.id}
                song={song}
                queue={playlist.songs}
                index={index}
                showIndex
              />
            ))
          ) : (
            <div className="py-12 text-center text-muted-foreground">
              <p>No songs in this playlist yet.</p>
              <Button variant="link" onClick={() => router.push('/library')}>
                Find songs to add
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ShareModal 
        open={shareOpen} 
        onOpenChange={setShareOpen} 
        type="playlist" 
        title={playlist.name} 
      />
      
      <EditPlaylistModal 
        open={editOpen} 
        onOpenChange={setEditOpen} 
        playlist={playlist} 
      />

      <DeleteModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Playlist"
        description={`Are you sure you want to delete "${playlist.name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
      />
    </div>
  )
}
