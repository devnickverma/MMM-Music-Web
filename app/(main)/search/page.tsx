'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SongCard } from '@/components/song/SongCard'
import { Search as SearchIcon, X } from 'lucide-react'
import { mockSongs } from '@/lib/mock-data'

const genres = ['All', 'Pop', 'Rock', 'Hip-Hop', 'Electronic', 'Jazz', 'Classical']
const moods = ['All', 'Happy', 'Sad', 'Energetic', 'Chill', 'Romantic']

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [selectedMood, setSelectedMood] = useState('All')

  // Filter songs based on search and filters
  const filteredSongs = mockSongs.filter(song => {
    const matchesSearch = searchQuery === '' || 
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist_name.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesSearch
  })

  return (
    <div className="p-6 space-y-6">
      {/* Search Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Search</h1>
        
        {/* Search Input */}
        <div className="relative max-w-2xl">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for songs, artists, albums..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 h-12 text-base"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              onClick={() => setSearchQuery('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
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
            
            {filteredSongs.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                {filteredSongs.map((song) => (
                  <SongCard key={song.id} song={song} queue={filteredSongs} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-lg font-medium mb-2">No results found</p>
                <p className="text-sm text-muted-foreground">
                  Try searching for something else
                </p>
              </div>
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
