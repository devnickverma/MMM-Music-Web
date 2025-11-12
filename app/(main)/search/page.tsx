'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SongCard } from '@/components/song/SongCard'
import { SongCardSkeleton } from '@/components/ui/SongCardSkeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { Search as SearchIcon, X } from 'lucide-react'
import { mockSongs } from '@/lib/mock-data'

const genres = ['All', 'Pop', 'Rock', 'Hip-Hop', 'Electronic', 'Jazz', 'Classical']
const moods = ['All', 'Happy', 'Sad', 'Energetic', 'Chill', 'Romantic']

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [selectedMood, setSelectedMood] = useState('All')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const query = searchParams.get('q')
    if (query) {
      setSearchQuery(query)
      // Simulate search loading
      setIsLoading(true)
      const timer = setTimeout(() => setIsLoading(false), 800)
      return () => clearTimeout(timer)
    }
  }, [searchParams])

  // Filter songs based on search and filters
  const filteredSongs = mockSongs.filter(song => {
    const matchesSearch = searchQuery === '' || 
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist_name.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesSearch
  })

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold">Search Results</h1>
        <p className="text-muted-foreground mt-1">Use the search bar above to find songs, artists, and albums</p>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        {/* Genre Filter */}
        <div>
          <h3 className="text-sm font-medium mb-2">Genre</h3>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Badge
                key={genre}
                variant={selectedGenre === genre ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </Badge>
            ))}
          </div>
        </div>

        {/* Mood Filter */}
        <div>
          <h3 className="text-sm font-medium mb-2">Mood</h3>
          <div className="flex flex-wrap gap-2">
            {moods.map((mood) => (
              <Badge
                key={mood}
                variant={selectedMood === mood ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedMood(mood)}
              >
                {mood}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {searchQuery ? (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {filteredSongs.length} results for "{searchQuery}"
              </h2>
              {(selectedGenre !== 'All' || selectedMood !== 'All') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedGenre('All')
                    setSelectedMood('All')
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <SongCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredSongs.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                {filteredSongs.map((song) => (
                  <SongCard key={song.id} song={song} queue={filteredSongs} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={SearchIcon}
                title="No results found"
                description="Try different keywords or filters"
                action={{
                  label: "Clear Filters",
                  onClick: () => {
                    setSelectedGenre('All')
                    setSelectedMood('All')
                  }
                }}
              />
            )}
          </>
        ) : (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Browse All</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
              {mockSongs.map((song) => (
                <SongCard key={song.id} song={song} queue={mockSongs} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
