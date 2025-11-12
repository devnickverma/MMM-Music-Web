import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { mockUsers, mockSongs } from '@/lib/mock-data'
import { UserProfileClient } from './UserProfileClient'
import { Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function UserProfilePage({ params }: { params: Promise<{ username: string }> }) {
  // Await params for Next.js 15+
  const { username } = await params
  
  // Find user (in real app, fetch from API)
  const user = mockUsers.find(u => u.username === username) || mockUsers[0]
  
  // Mock playlists for this user
  const userPlaylists = [
    { id: '1', name: 'Chill Vibes', songCount: 45, coverUrl: mockSongs[0].cover_image_url },
    { id: '2', name: 'Workout Mix', songCount: 32, coverUrl: mockSongs[1].cover_image_url },
    { id: '3', name: 'Road Trip', songCount: 28, coverUrl: mockSongs[2].cover_image_url },
    { id: '4', name: 'Focus Flow', songCount: 67, coverUrl: mockSongs[3].cover_image_url },
  ]

  // For demo purposes, assume this is the current user's profile
  const isOwnProfile = true

  return (
    <>
      {/* Cover Banner */}
      <div className="relative h-[300px] overflow-hidden">
        <Image
          src={user.cover_image_url}
          alt={`${user.full_name}'s cover`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        
        {/* Settings Icon (top right) */}
        <div className="absolute top-6 right-6 z-10">
          <Link href="/settings">
            <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full bg-white/90 hover:bg-white">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Profile Content */}
      <div className="px-6 max-w-7xl mx-auto">
        {/* Profile Picture (overlapping banner) */}
        <div className="relative -mt-20 mb-6">
          <div className="w-40 h-40 rounded-full border-4 border-background overflow-hidden bg-secondary">
            <Image
              src={user.avatar_url}
              alt={user.full_name}
              width={160}
              height={160}
              className="object-cover"
            />
          </div>
        </div>

        {/* Pass data to client component */}
        <UserProfileClient 
          user={user} 
          isOwnProfile={isOwnProfile}
          userPlaylists={userPlaylists}
        />
      </div>
    </>
  )
}
