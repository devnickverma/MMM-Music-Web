'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { 
  Headphones, 
  Mic2, 
  Music2, 
  Guitar, 
  Disc3, 
  Radio,
  Drum,
  Piano,
  Check,
  UserPlus,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

// Mock genres data
const genres = [
  { id: 'pop', name: 'Pop', icon: Music2, color: 'text-pink-500' },
  { id: 'rock', name: 'Rock', icon: Guitar, color: 'text-red-500' },
  { id: 'jazz', name: 'Jazz', icon: Piano, color: 'text-blue-500' },
  { id: 'hip-hop', name: 'Hip-Hop', icon: Radio, color: 'text-purple-500' },
  { id: 'electronic', name: 'Electronic', icon: Disc3, color: 'text-cyan-500' },
  { id: 'indie', name: 'Indie', icon: Guitar, color: 'text-orange-500' },
  { id: 'classical', name: 'Classical', icon: Piano, color: 'text-amber-500' },
  { id: 'r&b', name: 'R&B', icon: Music2, color: 'text-rose-500' },
  { id: 'metal', name: 'Metal', icon: Drum, color: 'text-gray-500' },
]

// Mock popular artists
const popularArtists = [
  {
    id: '1',
    name: 'Luna Wave',
    avatar: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=100&h=100&fit=crop',
    followers: '1.2M',
    genre: 'Indie Pop',
  },
  {
    id: '2',
    name: 'Neon Pulse',
    avatar: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop',
    followers: '890K',
    genre: 'Electronic',
  },
  {
    id: '3',
    name: 'The Wanderers',
    avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
    followers: '2.1M',
    genre: 'Folk Rock',
  },
  {
    id: '4',
    name: 'Urban Echo',
    avatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop',
    followers: '1.5M',
    genre: 'Hip-Hop',
  },
  {
    id: '5',
    name: 'Serene Sounds',
    avatar: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=100&h=100&fit=crop',
    followers: '750K',
    genre: 'Ambient',
  },
  {
    id: '6',
    name: 'Cosmic Harmony',
    avatar: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=100&h=100&fit=crop',
    followers: '1.8M',
    genre: 'Psychedelic',
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedRole, setSelectedRole] = useState<'listener' | 'artist' | null>(null)
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [followedArtists, setFollowedArtists] = useState<string[]>([])

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const handleRoleSelect = (role: 'listener' | 'artist') => {
    setSelectedRole(role)
  }

  const handleGenreToggle = (genreId: string) => {
    setSelectedGenres(prev => 
      prev.includes(genreId) 
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    )
  }

  const handleArtistFollow = (artistId: string) => {
    setFollowedArtists(prev => 
      prev.includes(artistId)
        ? prev.filter(id => id !== artistId)
        : [...prev, artistId]
    )
  }

  const handleNext = () => {
    if (currentStep === 1 && !selectedRole) {
      toast.error('Please select your role')
      return
    }
    if (currentStep === 2 && selectedGenres.length < 3) {
      toast.error('Please select at least 3 genres')
      return
    }
    
    setCurrentStep(prev => prev + 1)
  }

  const handleComplete = () => {
    // Mock: Save onboarding data
    const onboardingData = {
      role: selectedRole,
      genres: selectedGenres,
      followedArtists,
      completedAt: new Date().toISOString(),
    }
    console.log('Onboarding completed:', onboardingData)
    toast.success('Welcome to MMM Music!')
    router.push('/home')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </p>
            <p className="text-sm font-medium">{Math.round(progress)}%</p>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Content Card */}
        <Card className="p-8 md:p-12 shadow-2xl">
          <div className="space-y-8">
            {/* Step 1: Choose Your Role */}
            {currentStep === 1 && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="text-center space-y-2">
                  <h1 className="text-3xl md:text-4xl font-bold">Choose Your Role</h1>
                  <p className="text-muted-foreground text-lg">
                    Help us personalize your experience
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  {/* Listener Card */}
                  <button
                    onClick={() => handleRoleSelect('listener')}
                    className={cn(
                      "group relative p-8 rounded-xl border-2 transition-all duration-300 hover:scale-105 text-left",
                      selectedRole === 'listener'
                        ? "border-primary bg-primary/5 shadow-lg"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className={cn(
                        "w-20 h-20 rounded-full flex items-center justify-center transition-colors",
                        selectedRole === 'listener' 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-primary/10 text-primary group-hover:bg-primary/20"
                      )}>
                        <Headphones className="w-10 h-10" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">I'm a Listener</h3>
                        <p className="text-muted-foreground">
                          Discover new music, create playlists, and connect with your favorite artists
                        </p>
                      </div>
                      {selectedRole === 'listener' && (
                        <Badge className="absolute top-4 right-4" variant="default">
                          <Check className="w-3 h-3 mr-1" /> Selected
                        </Badge>
                      )}
                    </div>
                  </button>

                  {/* Artist Card */}
                  <button
                    onClick={() => handleRoleSelect('artist')}
                    className={cn(
                      "group relative p-8 rounded-xl border-2 transition-all duration-300 hover:scale-105 text-left",
                      selectedRole === 'artist'
                        ? "border-primary bg-primary/5 shadow-lg"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className={cn(
                        "w-20 h-20 rounded-full flex items-center justify-center transition-colors",
                        selectedRole === 'artist' 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-primary/10 text-primary group-hover:bg-primary/20"
                      )}>
                        <Mic2 className="w-10 h-10" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">I'm an Artist</h3>
                        <p className="text-muted-foreground">
                          Share your music, grow your fanbase, and track your performance
                        </p>
                      </div>
                      {selectedRole === 'artist' && (
                        <Badge className="absolute top-4 right-4" variant="default">
                          <Check className="w-3 h-3 mr-1" /> Selected
                        </Badge>
                      )}
                    </div>
                  </button>
                </div>

                <Button 
                  onClick={handleNext}
                  size="lg"
                  className="w-full md:w-auto md:min-w-[200px] mx-auto block"
                >
                  Continue
                </Button>
              </div>
            )}

            {/* Step 2: Pick Favorite Genres */}
            {currentStep === 2 && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="text-center space-y-2">
                  <h1 className="text-3xl md:text-4xl font-bold">Pick Your Favorite Genres</h1>
                  <p className="text-muted-foreground text-lg">
                    Select at least 3 genres you love
                  </p>
                  <Badge variant="outline" className="mt-2">
                    {selectedGenres.length} / 3 minimum
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                  {genres.map((genre) => {
                    const Icon = genre.icon
                    const isSelected = selectedGenres.includes(genre.id)
                    
                    return (
                      <button
                        key={genre.id}
                        onClick={() => handleGenreToggle(genre.id)}
                        className={cn(
                          "group relative p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105",
                          isSelected
                            ? "border-primary bg-primary/5 shadow-lg"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className="flex flex-col items-center text-center space-y-3">
                          <div className={cn(
                            "w-14 h-14 rounded-full flex items-center justify-center transition-colors",
                            isSelected 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-secondary group-hover:bg-primary/10"
                          )}>
                            <Icon className={cn("w-7 h-7", !isSelected && genre.color)} />
                          </div>
                          <span className="font-semibold">{genre.name}</span>
                          {isSelected && (
                            <Badge className="absolute top-2 right-2 h-6 w-6 p-0 flex items-center justify-center" variant="default">
                              <Check className="w-3 h-3" />
                            </Badge>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>

                <div className="flex gap-4">
                  <Button 
                    onClick={() => setCurrentStep(1)}
                    variant="outline"
                    size="lg"
                    className="w-full md:w-auto md:min-w-[150px]"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handleNext}
                    size="lg"
                    className="w-full md:w-auto md:min-w-[200px]"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Follow Artists */}
            {currentStep === 3 && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="text-center space-y-2">
                  <h1 className="text-3xl md:text-4xl font-bold">Follow Some Artists</h1>
                  <p className="text-muted-foreground text-lg">
                    Stay updated with your favorite artists (optional)
                  </p>
                  <Badge variant="outline" className="mt-2">
                    {followedArtists.length} artists followed
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                  {popularArtists.map((artist) => {
                    const isFollowing = followedArtists.includes(artist.id)
                    
                    return (
                      <Card
                        key={artist.id}
                        className={cn(
                          "p-6 transition-all duration-300 hover:shadow-lg",
                          isFollowing && "border-primary bg-primary/5"
                        )}
                      >
                        <div className="flex flex-col items-center text-center space-y-4">
                          <Avatar className="w-20 h-20 border-2">
                            <AvatarImage src={artist.avatar} />
                            <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-bold text-lg">{artist.name}</h3>
                            <p className="text-sm text-muted-foreground">{artist.genre}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {artist.followers} followers
                            </p>
                          </div>
                          <Button
                            onClick={() => handleArtistFollow(artist.id)}
                            variant={isFollowing ? "secondary" : "default"}
                            size="sm"
                            className="w-full"
                          >
                            {isFollowing ? (
                              <>
                                <Check className="w-4 h-4 mr-2" />
                                Following
                              </>
                            ) : (
                              <>
                                <UserPlus className="w-4 h-4 mr-2" />
                                Follow
                              </>
                            )}
                          </Button>
                        </div>
                      </Card>
                    )
                  })}
                </div>

                <div className="flex gap-4">
                  <Button 
                    onClick={() => setCurrentStep(2)}
                    variant="outline"
                    size="lg"
                    className="w-full md:w-auto md:min-w-[150px]"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handleNext}
                    size="lg"
                    className="w-full md:w-auto md:min-w-[200px]"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Complete */}
            {currentStep === 4 && (
              <div className="space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="flex flex-col items-center text-center space-y-6 py-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center animate-in zoom-in duration-700">
                    <Check className="w-12 h-12 text-primary-foreground" strokeWidth={3} />
                  </div>
                  
                  <div className="space-y-3">
                    <h1 className="text-4xl md:text-5xl font-bold">You're All Set!</h1>
                    <p className="text-xl text-muted-foreground max-w-md mx-auto">
                      Welcome to MMM Music, {selectedRole === 'artist' ? 'artist' : 'music lover'}! 
                      Your personalized experience is ready.
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="w-full max-w-md space-y-4 pt-4">
                    <Card className="p-4 text-left">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            {selectedRole === 'artist' ? (
                              <Mic2 className="w-4 h-4 text-primary" />
                            ) : (
                              <Headphones className="w-4 h-4 text-primary" />
                            )}
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Your Role</p>
                            <p className="font-semibold capitalize">{selectedRole}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Music2 className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Favorite Genres</p>
                            <p className="font-semibold">{selectedGenres.length} selected</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <UserPlus className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Artists Following</p>
                            <p className="font-semibold">{followedArtists.length} artists</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <Button 
                    onClick={handleComplete}
                    size="lg"
                    className="w-full md:w-auto md:min-w-[250px] text-lg h-12 mt-4"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Start Exploring
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
