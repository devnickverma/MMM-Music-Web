'use client'

import { Button } from '@/components/ui/button'
import { SongRow } from '@/components/song/SongRow'
import { Play, Heart, MoreHorizontal, Clock, Share2 } from 'lucide-react'
import { mockSongs } from '@/lib/mock-data'
import { useParams } from 'next/navigation'
import Image from 'next/image'

export default function PlaylistPage() {
  const params = useParams()
  const playlistId = params.id as string

  // Mock playlist data
  const playlist = {
    id: playlistId,
    name: 'Chill Vibes',
    description: 'Relax and unwind with these smooth tracks',
    coverUrl: mockSongs[0].cover_image_url,
    creator: 'John Doe',
    songCount: mockSongs.length,
    totalDuration: '2 hr 15 min',
    isPublic: true,
  }

  const playlistSongs = mockSongs

  return (
    <div className="min-h-screen pb-24">
      {/* Playlist Header */}
      <div className="bg-gradient-to-b from-primary/20 to-background p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
          {/* Cover Image */}
          <div className="w-full md:w-64 aspect-square relative rounded-lg overflow-hidden shadow-2xl">
            <Image
              src={playlist.coverUrl}
              alt={playlist.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Playlist Info */}
          <div className="flex-1 space-y-4">
            <p className="text-sm font-medium uppercase tracking-wider">Playlist</p>
            <h1 className="text-4xl md:text-6xl font-bold">{playlist.name}</h1>
            {playlist.description && (
              <p className="text-muted-foreground text-lg">{playlist.description}</p>
            )}
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold">{playlist.creator}</span>
              <span>•</span>
              <span>{playlist.songCount} songs</span>
              <span>•</span>
              <span>{playlist.totalDuration}</span>
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
        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full">
          <Share2 className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full">
          <MoreHorizontal className="h-6 w-6" />
        </Button>
      </div>

      {/* Songs List */}
      <div className="px-6 md:px-8">
        {/* Table Header */}
        <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-2 text-sm text-muted-foreground border-b">
          <div className="w-8">#</div>
          <div>Title</div>
          <div className="hidden md:block">Album</div>
          <div className="w-12">
            <Clock className="h-4 w-4" />
          </div>
        </div>

        {/* Songs */}
        <div className="mt-2 space-y-1">
          {playlistSongs.map((song, index) => (
            <SongRow
              key={song.id}
              song={song}
              queue={playlistSongs}
              index={index}
              showIndex
            />
          ))}
        </div>
      </div>
    </div>
  )
}
