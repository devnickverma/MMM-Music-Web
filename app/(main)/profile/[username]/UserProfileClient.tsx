'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SongRow } from '@/components/song/SongRow'
import { 
  UserPlus, 
  UserCheck, 
  MessageCircle, 
  ListMusic, 
  Heart,
  Users,
  CheckCircle2
} from 'lucide-react'
import type { UserProfile } from '@/lib/mock-data'
import { mockSongs, mockFollowingArtists } from '@/lib/mock-data'
import toast from 'react-hot-toast'

interface UserProfileClientProps {
  user: UserProfile
  isOwnProfile: boolean
  userPlaylists: Array<{
    id: string
    name: string
    songCount: number
    coverUrl: string
  }>
}

export function UserProfileClient({ user, isOwnProfile, userPlaylists }: UserProfileClientProps) {
  const [isFollowing, setIsFollowing] = useState(false)

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    toast.success(isFollowing ? 'Unfollowed' : 'Followed!')
  }

  const handleMessage = () => {
    toast.success('Opening message...')
  }

  const handleEditProfile = () => {
    toast.success('Edit profile coming soon!')
  }

  // Mock liked songs (subset of mockSongs)
  const likedSongs = mockSongs.slice(0, 8)

  return (
    <div className="space-y-6 pb-8">
      {/* User Info Section */}
      <div className="space-y-4">
        {/* Name and Username */}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-4xl font-bold">{user.full_name}</h1>
            {user.is_verified && (
              <CheckCircle2 className="h-7 w-7 text-primary" fill="currentColor" />
            )}
          </div>
          <p className="text-muted-foreground text-lg">@{user.username}</p>
        </div>

        {/* Bio */}
        <p className="text-base max-w-2xl">{user.bio}</p>

        {/* Stats Row */}
        <div className="flex items-center gap-6 text-sm">
          <div>
            <span className="font-semibold">{user.playlist_count}</span>
            <span className="text-muted-foreground ml-1">Playlists</span>
          </div>
          <div>
            <span className="font-semibold">{user.follower_count.toLocaleString()}</span>
            <span className="text-muted-foreground ml-1">Followers</span>
          </div>
          <div>
            <span className="font-semibold">{user.following_count}</span>
            <span className="text-muted-foreground ml-1">Following</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          {isOwnProfile ? (
            <Button onClick={handleEditProfile}>
              Edit Profile
            </Button>
          ) : (
            <>
              <Button onClick={handleFollow}>
                {isFollowing ? (
                  <>
                    <UserCheck className="h-4 w-4 mr-2" />
                    Following
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Follow
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleMessage}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="playlists" className="space-y-6">
        <TabsList>
          <TabsTrigger value="playlists" className="gap-2">
            <ListMusic className="h-4 w-4" />
            Public Playlists
          </TabsTrigger>
          <TabsTrigger value="liked" className="gap-2">
            <Heart className="h-4 w-4" />
            Liked Songs
          </TabsTrigger>
          <TabsTrigger value="following" className="gap-2">
            <Users className="h-4 w-4" />
            Following
          </TabsTrigger>
        </TabsList>

        {/* Public Playlists Tab */}
        <TabsContent value="playlists" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {userPlaylists.map((playlist) => (
              <Link key={playlist.id} href={`/playlist/${playlist.id}`}>
                <Card className="group overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                  <div className="aspect-square relative bg-secondary overflow-hidden">
                    <Image
                      src={playlist.coverUrl}
                      alt={playlist.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button size="icon" className="h-12 w-12 rounded-full">
                        <Play className="h-6 w-6" fill="currentColor" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm truncate">
                      {playlist.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {playlist.songCount} songs
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        {/* Liked Songs Tab */}
        <TabsContent value="liked" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Liked Songs</h2>
              <p className="text-sm text-muted-foreground">{likedSongs.length} songs</p>
            </div>
            <Button>Play All</Button>
          </div>
          <div className="space-y-1">
            {likedSongs.map((song, index) => (
              <SongRow key={song.id} song={song} queue={likedSongs} index={index} />
            ))}
          </div>
        </TabsContent>

        {/* Following Tab */}
        <TabsContent value="following" className="space-y-4">
          <h2 className="text-2xl font-bold">Following</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {mockFollowingArtists.map((artist) => (
              <Link key={artist.id} href={`/artist/${artist.id}`}>
                <Card className="group overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                  <div className="p-6 flex flex-col items-center text-center space-y-4">
                    {/* Circular Profile Picture */}
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={artist.avatar} alt={artist.name} />
                        <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                    
                    {/* Artist Info */}
                    <div className="space-y-1 w-full">
                      <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
                        {artist.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {artist.followers} followers
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Play icon component
function Play(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}
