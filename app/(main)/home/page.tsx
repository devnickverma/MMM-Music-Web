'use client'

import { Button } from '@/components/ui/button'
import { SongCard } from '@/components/song/SongCard'
import { SongRow } from '@/components/song/SongRow'
import { Play, TrendingUp, Sparkles, Music } from 'lucide-react'
import Image from 'next/image'
import { featuredSong, newReleases, trendingSongs, recommendedSongs } from '@/lib/mock-data'
import { usePlayerStore } from '@/lib/store/player-store'

export default function Home() {
  const { playSong } = usePlayerStore()

  const handlePlayFeatured = () => {
    playSong(featuredSong, newReleases)
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden rounded-lg mx-6 mt-6">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 z-10" />
        {featuredSong.cover_image_url && (
          <Image
            src={featuredSong.cover_image_url}
            alt={featuredSong.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="relative z-20 flex flex-col justify-end h-full p-8 text-white">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Featured Today
              </span>
            </div>
            <h1 className="text-5xl font-bold mb-2">{featuredSong.title}</h1>
            <p className="text-xl mb-6 text-white/90">{featuredSong.artist_name}</p>
            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="gap-2"
                onClick={handlePlayFeatured}
              >
                <Play className="h-5 w-5" fill="currentColor" />
                Play Now
              </Button>
              <Button size="lg" variant="secondary" className="gap-2">
                <Music className="h-5 w-5" />
                View Album
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* New Releases */}
      <section className="px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">New Releases</h2>
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          </div>
          <Button variant="ghost">View All</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {newReleases.map((song) => (
            <SongCard key={song.id} song={song} queue={newReleases} />
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section className="px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Trending Now</h2>
          </div>
          <Button variant="ghost">View All</Button>
        </div>
        <div className="space-y-1">
          {trendingSongs.map((song, index) => (
            <SongRow key={song.id} song={song} queue={trendingSongs} index={index} />
          ))}
        </div>
      </section>

      {/* Recommended For You */}
      <section className="px-6 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Recommended For You</h2>
            <p className="text-sm text-muted-foreground">Based on your listening history</p>
          </div>
          <Button variant="ghost">View All</Button>
        </div>
        <div className="space-y-1">
          {recommendedSongs.map((song, index) => (
            <SongRow key={song.id} song={song} queue={recommendedSongs} index={index} />
          ))}
        </div>
      </section>
    </div>
  )
}
