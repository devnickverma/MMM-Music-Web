'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { SongCard } from '@/components/song/SongCard'
import { SongCardSkeleton } from '@/components/ui/SongCardSkeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { Search as SearchIcon, X, SlidersHorizontal, Music2, User, ListMusic, Disc } from 'lucide-react'
import { mockSongs } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

// Filter data
const quickFilters = [
  { id: 'all', label: 'All', icon: Music2 },
  { id: 'songs', label: 'Songs', icon: Music2 },
  { id: 'artists', label: 'Artists', icon: User },
  { id: 'playlists', label: 'Playlists', icon: ListMusic },
  { id: 'albums', label: 'Albums', icon: Disc },
]

const genres = ['Pop', 'Rock', 'Jazz', 'Hip-Hop', 'Electronic', 'Indie', 'Classical', 'R&B', 'Metal']
const moods = ['Happy', 'Sad', 'Energetic', 'Calm', 'Romantic', 'Relaxing']

const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'most-played', label: 'Most Played' },
  { value: 'recent', label: 'Recent' },
  { value: 'alphabetical', label: 'Alphabetical' },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [isLoading, setIsLoading] = useState(false)
  
  // Quick filter
  const [quickFilter, setQuickFilter] = useState('all')
  
  // Advanced filters
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedMoods, setSelectedMoods] = useState<string[]>([])
  const [durationRange, setDurationRange] = useState([0, 10])
  const [releaseDate, setReleaseDate] = useState('any')
  const [sortBy, setSortBy] = useState('relevance')
  
  // Mobile filter sheet state
  const [filterSheetOpen, setFilterSheetOpen] = useState(false)

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

  // Toggle genre selection
  const handleGenreToggle = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    )
  }

  // Toggle mood selection
  const handleMoodToggle = (mood: string) => {
    setSelectedMoods(prev => 
      prev.includes(mood) 
        ? prev.filter(m => m !== mood)
        : [...prev, mood]
    )
  }

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedGenres([])
    setSelectedMoods([])
    setDurationRange([0, 10])
    setReleaseDate('any')
    toast.success('Filters cleared')
  }

  // Apply filters
  const handleApplyFilters = () => {
    setFilterSheetOpen(false)
    toast.success('Filters applied')
  }

  // Filter songs based on search and filters
  const filteredSongs = mockSongs.filter(song => {
    const matchesSearch = searchQuery === '' || 
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist_name.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Duration filter (convert seconds to minutes)
    const songDurationMinutes = song.duration / 60
    const matchesDuration = songDurationMinutes >= durationRange[0] && songDurationMinutes <= durationRange[1]
    
    return matchesSearch && matchesDuration
  })

  // Sort results
  const sortedSongs = [...filteredSongs].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetical':
        return a.title.localeCompare(b.title)
      case 'recent':
        return b.id.localeCompare(a.id) // Mock: newer IDs are more recent
      case 'most-played':
        return Math.random() - 0.5 // Mock: random for demo
      default:
        return 0 // Relevance (default order)
    }
  })

  const resultsCount = sortedSongs.length

  // Filter Panel Component (reusable for desktop sidebar and mobile sheet)
  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Genre Filter */}
      <div className="space-y-3">
        <h3 className="font-semibold">Genre</h3>
        <div className="space-y-2">
          {genres.map((genre) => (
            <div key={genre} className="flex items-center space-x-2">
              <Checkbox
                id={`genre-${genre}`}
                checked={selectedGenres.includes(genre)}
                onCheckedChange={() => handleGenreToggle(genre)}
              />
              <Label
                htmlFor={`genre-${genre}`}
                className="text-sm font-normal cursor-pointer"
              >
                {genre}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Mood Filter */}
      <div className="space-y-3">
        <h3 className="font-semibold">Mood</h3>
        <div className="space-y-2">
          {moods.map((mood) => (
            <div key={mood} className="flex items-center space-x-2">
              <Checkbox
                id={`mood-${mood}`}
                checked={selectedMoods.includes(mood)}
                onCheckedChange={() => handleMoodToggle(mood)}
              />
              <Label
                htmlFor={`mood-${mood}`}
                className="text-sm font-normal cursor-pointer"
              >
                {mood}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Duration Filter */}
      <div className="space-y-3">
        <h3 className="font-semibold">Duration</h3>
        <div className="space-y-4 pt-2">
          <Slider
            value={durationRange}
            onValueChange={setDurationRange}
            max={10}
            step={1}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{durationRange[0]} min</span>
            <span>{durationRange[1]} min</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Release Date Filter */}
      <div className="space-y-3">
        <h3 className="font-semibold">Release Date</h3>
        <RadioGroup value={releaseDate} onValueChange={setReleaseDate}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="any" id="any" />
            <Label htmlFor="any" className="font-normal cursor-pointer">
              Any time
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="week" id="week" />
            <Label htmlFor="week" className="font-normal cursor-pointer">
              Past week
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="month" id="month" />
            <Label htmlFor="month" className="font-normal cursor-pointer">
              Past month
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="year" id="year" />
            <Label htmlFor="year" className="font-normal cursor-pointer">
              Past year
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button onClick={handleApplyFilters} className="w-full">
          Apply Filters
        </Button>
        <Button onClick={handleClearFilters} variant="outline" className="w-full">
          Clear All
        </Button>
      </div>
    </div>
  )

  return (
    <div className="flex h-full">
      {/* Desktop Sidebar - Hidden on mobile */}
      <aside className="hidden lg:block w-64 border-r border-border p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">Filters</h2>
          {(selectedGenres.length > 0 || selectedMoods.length > 0) && (
            <Badge variant="secondary">{selectedGenres.length + selectedMoods.length}</Badge>
          )}
        </div>
        <FilterPanel />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Top Section */}
          <div className="space-y-4">
            {/* Search Input */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search songs, artists, playlists..."
                  className="pl-10 pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              {/* Mobile Filter Button */}
              <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterPanel />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Quick Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              {quickFilters.map((filter) => {
                const Icon = filter.icon
                return (
                  <Badge
                    key={filter.id}
                    variant={quickFilter === filter.id ? 'default' : 'outline'}
                    className="cursor-pointer px-3 py-1.5 gap-1.5"
                    onClick={() => setQuickFilter(filter.id)}
                  >
                    <Icon className="h-3 w-3" />
                    {filter.label}
                  </Badge>
                )
              })}
            </div>
          </div>

          {/* Results Header with Sort */}
          {searchQuery && (
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  {resultsCount} {resultsCount === 1 ? 'result' : 'results'}
                  {searchQuery && ` for "${searchQuery}"`}
                </h2>
                {(selectedGenres.length > 0 || selectedMoods.length > 0) && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedGenres.length + selectedMoods.length} filter(s) applied
                  </p>
                )}
              </div>

              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Results Section */}
          <div>
            {searchQuery ? (
              <>
                {isLoading ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <SongCardSkeleton key={i} />
                    ))}
                  </div>
                ) : resultsCount > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                    {sortedSongs.map((song) => (
                      <SongCard key={song.id} song={song} queue={sortedSongs} />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={SearchIcon}
                    title="No results found"
                    description={`No results for "${searchQuery}". Try different keywords or adjust your filters.`}
                    action={{
                      label: "Clear Filters",
                      onClick: handleClearFilters
                    }}
                  />
                )}
              </>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Browse All</h2>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                  {sortedSongs.map((song) => (
                    <SongCard key={song.id} song={song} queue={sortedSongs} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
