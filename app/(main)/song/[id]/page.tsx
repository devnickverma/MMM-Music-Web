'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { SongCard } from '@/components/song/SongCard'
import { Play, Heart, Share2, MoreHorizontal, Send, User } from 'lucide-react'
import { mockSongs } from '@/lib/mock-data'
import { usePlayerStore } from '@/lib/store/player-store'
import Image from 'next/image'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { useParams } from 'next/navigation'

export default function SongDetailPage() {
  const params = useParams()
  const { playSong } = usePlayerStore()
  const [comment, setComment] = useState('')
  
  // Find song (in real app, fetch from API)
  const song = mockSongs.find(s => s.id === params.id) || mockSongs[0]
  const relatedSongs = mockSongs.filter(s => s.id !== song.id).slice(0, 6)

  const handlePlay = () => {
    playSong(song, relatedSongs)
    toast.success('Now playing!')
  }

  const handleComment = () => {
    if (comment.trim()) {
      toast.success('Comment posted!')
      setComment('')
    }
  }

  // Mock comments
  const comments = [
    { id: '1', user: 'Music Lover', text: 'Amazing track! Been on repeat all day 🎵', time: '2h ago' },
    { id: '2', user: 'Alex Johnson', text: 'The production quality is incredible', time: '5h ago' },
    { id: '3', user: 'Sarah M', text: 'This artist never disappoints!', time: '1d ago' },
  ]

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Cover Art */}
        <div className="flex-shrink-0">
          <div className="relative w-full md:w-80 aspect-square rounded-lg overflow-hidden shadow-2xl">
            {song.cover_image_url ? (
              <Image
                src={song.cover_image_url}
                alt={song.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <span className="text-6xl font-bold text-primary/40">
                  {song.title.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Song Info */}
        <div className="flex-1 flex flex-col justify-center space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Song</p>
            <h1 className="text-5xl font-bold mb-4">{song.title}</h1>
            <p className="text-2xl text-muted-foreground">{song.artist_name}</p>
          </div>

          <div className="flex items-center gap-4">
            <Button size="lg" className="h-14 px-8 rounded-full" onClick={handlePlay}>
              <Play className="h-6 w-6 mr-2" fill="currentColor" />
              Play
            </Button>
            <Button size="lg" variant="outline" className="h-14 w-14 rounded-full">
              <Heart className="h-6 w-6" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 w-14 rounded-full">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 w-14 rounded-full">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-muted-foreground">Duration:</span>
              <span className="ml-2 font-medium">
                {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Plays:</span>
              <span className="ml-2 font-medium">1.2M</span>
            </div>
            <div>
              <span className="text-muted-foreground">Likes:</span>
              <span className="ml-2 font-medium">45K</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lyrics */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Lyrics</h2>
        <div className="text-muted-foreground space-y-4 leading-relaxed">
          <p>[Verse 1]</p>
          <p>Lost in the rhythm of the night<br/>
          Dancing under neon lights<br/>
          Feel the music come alive<br/>
          This is where we truly thrive</p>
          
          <p>[Chorus]</p>
          <p>We're chasing dreams that never fade<br/>
          In this moment that we've made<br/>
          Hearts beating to the same sound<br/>
          Together we are homeward bound</p>
        </div>
      </Card>

      {/* Comments Section */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>
        
        {/* Add Comment */}
        <div className="flex gap-3 mb-8">
          <Avatar>
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-3">
            <Textarea
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-20"
            />
            <div className="flex justify-end">
              <Button onClick={handleComment} disabled={!comment.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Post Comment
              </Button>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3">
              <Avatar>
                <AvatarFallback>
                  {c.user.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm">{c.user}</span>
                  <span className="text-xs text-muted-foreground">{c.time}</span>
                </div>
                <p className="text-sm">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Related Songs */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">More from {song.artist_name}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {relatedSongs.map((relatedSong) => (
            <SongCard key={relatedSong.id} song={relatedSong} queue={relatedSongs} />
          ))}
        </div>
      </div>
    </div>
  )
}
