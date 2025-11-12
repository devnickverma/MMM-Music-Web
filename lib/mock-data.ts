import type { Song } from './store/player-store'

export const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Midnight Dreams',
    artist_name: 'Luna Wave',
    audio_url: '/demo-music/song1.mp3',
    cover_image_url: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400&h=400&fit=crop',
    duration: 234,
  },
  {
    id: '2',
    title: 'Electric Heartbeat',
    artist_name: 'Neon Pulse',
    audio_url: '/demo-music/song2.mp3',
    cover_image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    duration: 198,
  },
  {
    id: '3',
    title: 'Sunset Boulevard',
    artist_name: 'The Wanderers',
    audio_url: '/demo-music/song3.mp3',
    cover_image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    duration: 267,
  },
  {
    id: '4',
    title: 'Ocean Waves',
    artist_name: 'Serene Sounds',
    audio_url: '/demo-music/song4.mp3',
    cover_image_url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop',
    duration: 312,
  },
  {
    id: '5',
    title: 'City Lights',
    artist_name: 'Urban Echo',
    audio_url: '/demo-music/song5.mp3',
    cover_image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop',
    duration: 189,
  },
  {
    id: '6',
    title: 'Mountain High',
    artist_name: 'Peak Performance',
    audio_url: '/demo-music/song6.mp3',
    cover_image_url: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop',
    duration: 245,
  },
  {
    id: '7',
    title: 'Desert Storm',
    artist_name: 'Wild Horizon',
    audio_url: '/demo-music/song7.mp3',
    cover_image_url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=400&fit=crop',
    duration: 221,
  },
  {
    id: '8',
    title: 'Starlight Melody',
    artist_name: 'Cosmic Harmony',
    audio_url: '/demo-music/song8.mp3',
    cover_image_url: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=400&h=400&fit=crop',
    duration: 278,
  },
  {
    id: '9',
    title: 'Thunder Road',
    artist_name: 'Storm Chasers',
    audio_url: '/demo-music/song9.mp3',
    cover_image_url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=400&fit=crop',
    duration: 256,
  },
  {
    id: '10',
    title: 'Golden Hour',
    artist_name: 'Sunset Collective',
    audio_url: '/demo-music/song10.mp3',
    cover_image_url: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=400&h=400&fit=crop',
    duration: 192,
  },
  {
    id: '11',
    title: 'Neon Nights',
    artist_name: 'Retro Fusion',
    audio_url: '/demo-music/song11.mp3',
    cover_image_url: 'https://images.unsplash.com/photo-1484755560615-a4c64e778a6c?w=400&h=400&fit=crop',
    duration: 203,
  },
  {
    id: '12',
    title: 'Forest Whispers',
    artist_name: 'Nature Sounds',
    audio_url: '/demo-music/song12.mp3',
    cover_image_url: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=400&h=400&fit=crop',
    duration: 289,
  },
]

export const featuredSong: Song = mockSongs[0]
export const newReleases: Song[] = mockSongs.slice(0, 6)
export const trendingSongs: Song[] = mockSongs.slice(3, 9)
export const recommendedSongs: Song[] = mockSongs.slice(6, 12)

// Mock Concerts Data
export interface Concert {
  id: string
  title: string
  artist_name: string
  artist_id: string
  artist_avatar: string
  cover_image: string
  date: string // ISO format
  duration: number // in minutes
  attendee_count: number
  description: string
  artist_bio: string
  status: 'upcoming' | 'live' | 'past'
  stream_url?: string
}

export const mockConcerts: Concert[] = [
  {
    id: '1',
    title: 'Midnight Dreams Live Session',
    artist_name: 'Luna Wave',
    artist_id: '1',
    artist_avatar: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=100&h=100&fit=crop',
    cover_image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=400&fit=crop',
    date: '2025-01-15T20:00:00Z',
    duration: 60,
    attendee_count: 234,
    description: 'Join Luna Wave for an intimate acoustic session featuring songs from the new album "Midnight Dreams". Experience stripped-down versions of your favorite tracks and exclusive unreleased material.',
    artist_bio: 'Luna Wave is an indie pop artist known for dreamy melodies and introspective lyrics. With over 1M monthly listeners, Luna has captivated audiences worldwide.',
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Electric Night Tour',
    artist_name: 'Neon Pulse',
    artist_id: '2',
    artist_avatar: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop',
    cover_image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=400&fit=crop',
    date: '2025-01-20T19:00:00Z',
    duration: 90,
    attendee_count: 567,
    description: 'Experience the high-energy virtual tour from Neon Pulse. This 90-minute spectacular features stunning visuals, live band, and interactive elements with the audience.',
    artist_bio: 'Neon Pulse brings electronic dance music to life with electrifying performances. Known for innovative production and energetic stage presence.',
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'Acoustic Sunset Session',
    artist_name: 'The Wanderers',
    artist_id: '3',
    artist_avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
    cover_image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=800&h=400&fit=crop',
    date: '2025-02-01T18:00:00Z',
    duration: 75,
    attendee_count: 423,
    description: 'The Wanderers invite you to a beautiful acoustic performance as the sun sets. Enjoy storytelling, sing-alongs, and a cozy atmosphere.',
    artist_bio: 'The Wanderers are a folk-rock band that has toured globally. Their harmonies and storytelling have won hearts across continents.',
    status: 'upcoming',
  },
  {
    id: '4',
    title: 'Urban Vibes Live',
    artist_name: 'Urban Echo',
    artist_id: '5',
    artist_avatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop',
    cover_image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=400&fit=crop',
    date: '2025-02-10T21:00:00Z',
    duration: 60,
    attendee_count: 891,
    description: 'Urban Echo brings the city to your screen with hip-hop beats and smooth flows. Special guest appearances and freestyle sessions included.',
    artist_bio: 'Urban Echo is a hip-hop collective pushing boundaries with innovative sounds and socially conscious lyrics.',
    status: 'upcoming',
  },
  {
    id: '5',
    title: 'Holiday Special Concert',
    artist_name: 'Cosmic Harmony',
    artist_id: '8',
    artist_avatar: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=100&h=100&fit=crop',
    cover_image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=400&fit=crop',
    date: '2024-12-20T20:00:00Z',
    duration: 120,
    attendee_count: 1245,
    description: 'A magical evening of music celebrating the holidays with Cosmic Harmony. Features orchestral arrangements and special guest performers.',
    artist_bio: 'Cosmic Harmony creates ethereal soundscapes that transport listeners to another dimension.',
    status: 'past',
  },
  {
    id: '6',
    title: 'New Year Countdown Show',
    artist_name: 'Retro Fusion',
    artist_id: '11',
    artist_avatar: 'https://images.unsplash.com/photo-1484755560615-a4c64e778a6c?w=100&h=100&fit=crop',
    cover_image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=400&fit=crop',
    date: '2024-12-31T23:00:00Z',
    duration: 90,
    attendee_count: 2134,
    description: 'Ring in the new year with Retro Fusion! A high-energy performance featuring hits from the 80s and 90s with a modern twist.',
    artist_bio: 'Retro Fusion blends classic sounds with contemporary production, creating nostalgic yet fresh music.',
    status: 'past',
  },
  {
    id: '7',
    title: 'Summer Beach Vibes',
    artist_name: 'Serene Sounds',
    artist_id: '4',
    artist_avatar: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=100&h=100&fit=crop',
    cover_image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=400&fit=crop',
    date: '2024-11-15T17:00:00Z',
    duration: 60,
    attendee_count: 678,
    description: 'Relive summer with Serene Sounds performing chill beach-inspired tracks. Perfect for relaxation and good vibes.',
    artist_bio: 'Serene Sounds creates peaceful, ambient music perfect for meditation and relaxation.',
    status: 'past',
  },
]

export const upcomingConcerts = mockConcerts.filter(c => c.status === 'upcoming')
export const pastConcerts = mockConcerts.filter(c => c.status === 'past')

// Mock User Profiles Data
export interface UserProfile {
  id: string
  username: string
  full_name: string
  bio: string
  avatar_url: string
  cover_image_url: string
  playlist_count: number
  follower_count: number
  following_count: number
  is_verified: boolean
}

export const mockUsers: UserProfile[] = [
  {
    id: '1',
    username: 'musiclover',
    full_name: 'Alex Rivera',
    bio: 'Music enthusiast | Playlist curator | Always discovering new sounds 🎵',
    avatar_url: 'https://i.pravatar.cc/300?img=1',
    cover_image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&h=300&fit=crop',
    playlist_count: 12,
    follower_count: 2345,
    following_count: 156,
    is_verified: false,
  },
  {
    id: '2',
    username: 'vibesonly',
    full_name: 'Sarah Chen',
    bio: 'Creating the perfect mood for every moment | Electronic & Indie lover',
    avatar_url: 'https://i.pravatar.cc/300?img=5',
    cover_image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&h=300&fit=crop',
    playlist_count: 8,
    follower_count: 1567,
    following_count: 89,
    is_verified: true,
  },
  {
    id: '3',
    username: 'beatsandrhythm',
    full_name: 'Marcus Johnson',
    bio: 'Hip-hop head | DJ | Sharing my favorite tracks with the world 🎧',
    avatar_url: 'https://i.pravatar.cc/300?img=12',
    cover_image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=300&fit=crop',
    playlist_count: 25,
    follower_count: 5432,
    following_count: 234,
    is_verified: true,
  },
]

// Mock Following Artists
export const mockFollowingArtists = [
  { id: '1', name: 'Luna Wave', avatar: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=150&h=150&fit=crop', followers: '1.2M' },
  { id: '2', name: 'Neon Pulse', avatar: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150&h=150&fit=crop', followers: '856K' },
  { id: '3', name: 'The Wanderers', avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop', followers: '2.3M' },
  { id: '4', name: 'Urban Echo', avatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&h=150&fit=crop', followers: '645K' },
  { id: '5', name: 'Cosmic Harmony', avatar: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=150&h=150&fit=crop', followers: '1.5M' },
  { id: '6', name: 'Serene Sounds', avatar: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=150&h=150&fit=crop', followers: '432K' },
]
