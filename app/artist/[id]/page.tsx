'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SongRow } from '@/components/song/SongRow'
import { Play, Heart, Share2, Music, Users } from 'lucide-react'
import { mockSongs } from '@/lib/mock-data'
import { useParams } from 'next/navigation'
import Image from 'next/image'

export default function ArtistPage() {
  const params = useParams()
  const artistId = params.id as string

  // Mock artist data
  const artist = {
    id: artistId,
    name: 'The Weeknd',
    bio: 'Abel Makkonen Tesfaye, known professionally as The Weeknd, is a Canadian singer, songwriter, and record producer. Known for his sonic versatility and dark lyricism.',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    followers: '85M',
    monthlyListeners: '105M',
    verified: true,
  }

  // Filter songs by this artist
  const artistSongs = mockSongs.filter(song => 
    song.artist_name.toLowerCase().includes('weekend') || 
    song.artist_name.toLowerCase().includes('weeknd')
  ).length > 0 
    ? mockSongs.filter(song => 
        song.artist_name.toLowerCase().includes('weekend') || 
        song.artist_name.toLowerCase().includes('weeknd')
      )
    : mockSongs.slice(0, 8) // Fallback to first 8 songs if no match

  // Mock albums
  const albums = [
    { id: '1', title: 'After Hours', year: 2020, coverUrl: mockSongs[0].cover_image_url },
    { id: '2', title: 'Starboy', year: 2016, coverUrl: mockSongs[1].cover_image_url },
    { id: '3', title: 'Beauty Behind the Madness', year: 2015, coverUrl: mockSongs[2].cover_image_url },
    { id: '4', title: 'Dawn FM', year: 2022, coverUrl: mockSongs[3].cover_image_url },
  ]

  return (
    <div className="min-h-screen pb-24">
      {/* Artist Header */}
      <div className="relative h-96 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={artist.coverUrl}
            alt={artist.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-background" />
        </div>

        {/* Artist Info */}
        <div className="relative h-full flex items-end p-6 md:p-8">
          <div className="space-y-4 text-white">
            {artist.verified && (
              <div className="flex items-center gap-2">
                <div className="bg-blue-500 rounded-full p-1">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Verified Artist</span>
              </div>
            )}
            <h1 className="text-5xl md:text-7xl font-bold">{artist.name}</h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{artist.followers} followers</span>
              </div>
              <span>•</span>
              <span>{artist.monthlyListeners} monthly listeners</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 md:px-8 py-6 flex items-center gap-4 bg-gradient-to-b from-background/50 to-background">
        <Button size="lg" className="rounded-full h-14 w-14 p-0">
          <Play className="h-6 w-6" fill="currentColor" />
        </Button>
        <Button variant="outline" size="lg" className="rounded-full">
          <Heart className="h-5 w-5 mr-2" />
          Follow
        </Button>
        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full">
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Content Tabs */}
      <div className="px-6 md:px-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="songs">Songs</TabsTrigger>
            <TabsTrigger value="albums">Albums</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Popular Songs */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Popular</h2>
              <div className="space-y-1">
                {artistSongs.slice(0, 5).map((song, index) => (
                  <SongRow
                    key={song.id}
                    song={song}
                    queue={artistSongs}
                    index={index}
                    showIndex
                  />
                ))}
              </div>
            </div>

            {/* Albums */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Albums</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {albums.map((album) => (
                  <Card
                    key={album.id}
                    className="group cursor-pointer hover:shadow-lg transition-all overflow-hidden"
                  >
                    <div className="aspect-square relative bg-secondary overflow-hidden">
                      <Image
                        src={album.coverUrl}
                        alt={album.title}
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
                      <h3 className="font-semibold text-sm truncate">{album.title}</h3>
                      <p className="text-xs text-muted-foreground">{album.year} • Album</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Songs Tab */}
          <TabsContent value="songs" className="space-y-4">
            <div className="space-y-1">
              {artistSongs.map((song, index) => (
                <SongRow
                  key={song.id}
                  song={song}
                  queue={artistSongs}
                  index={index}
                  showIndex
                />
              ))}
            </div>
          </TabsContent>

          {/* Albums Tab */}
          <TabsContent value="albums" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {albums.map((album) => (
                <Card
                  key={album.id}
                  className="group cursor-pointer hover:shadow-lg transition-all overflow-hidden"
                >
                  <div className="aspect-square relative bg-secondary overflow-hidden">
                    <Image
                      src={album.coverUrl}
                      alt={album.title}
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
                    <h3 className="font-semibold text-sm truncate">{album.title}</h3>
                    <p className="text-xs text-muted-foreground">{album.year} • Album</p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold mb-4">About {artist.name}</h2>
              <p className="text-muted-foreground leading-relaxed">{artist.bio}</p>
              
              <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">Followers</span>
                  </div>
                  <p className="text-2xl font-bold">{artist.followers}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Music className="h-4 w-4" />
                    <span className="text-sm">Monthly Listeners</span>
                  </div>
                  <p className="text-2xl font-bold">{artist.monthlyListeners}</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
