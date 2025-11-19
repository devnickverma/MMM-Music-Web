# 📊 MMM MUSIC - PROJECT CONTEXT & CONVENTIONS

> **Last Updated:** January 17, 2025  
> **Purpose:** Complete reference for AI assistants and developers working on this project

---

## 📋 TABLE OF CONTENTS

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Code Conventions](#code-conventions)
5. [Design System](#design-system)
6. [Features Implemented](#features-implemented)
7. [Data Models](#data-models)
8. [Critical Rules](#critical-rules)
9. [Dependencies](#dependencies)
10. [Gaps & Missing Pieces](#gaps--missing-pieces)
11. [Development Guidelines](#development-guidelines)

---

## 🎯 PROJECT OVERVIEW

- **Name:** MMM - Mind Your Own Music
- **Type:** Web Application (Music Streaming Platform)
- **Primary Language:** TypeScript 5
- **Framework:** Next.js 16.0.1 (App Router)
- **Architecture:** Modern Next.js App Router with Route Groups + Component-Based Architecture
- **Current Phase:** Phase 2 - Feature Complete (Frontend - 85%)
- **Mode:** Demo/Frontend Only (Backend Integration Pending)

### Project Purpose
A modern music streaming platform connecting indie artists directly with fans. Features include:
- Music streaming with full playback controls
- Direct messaging with artists
- Virtual concerts (live and recorded)
- Artist analytics dashboard
- Social features (profiles, following, playlists)

---

## 🛠️ TECH STACK

### **Core**
- **Runtime:** Node.js 18+
- **Framework:** Next.js 16.0.1 (App Router with React Server Components)
- **Language:** TypeScript 5 (strict mode enabled)
- **Build Tool:** Next.js built-in (Turbopack/Webpack)
- **Package Manager:** npm

### **Frontend**
- **UI Framework:** React 19.2.0
- **Styling:** Tailwind CSS v4 (beta) with PostCSS
- **Component Library:** shadcn/ui (New York style)
- **UI Primitives:** Radix UI (15+ components)
- **Icons:** Lucide React 0.552.0
- **State Management:** Zustand 5.0.8
- **Animation:** tw-animate-css + custom CSS animations
- **Utilities:** 
  - class-variance-authority (CVA) - Component variants
  - clsx + tailwind-merge - Class name merging

### **Audio & Media**
- **Audio Player:** Howler.js 2.2.4 (HTML5 audio)
- **Image Optimization:** Next.js Image component
- **Allowed Domains:** images.unsplash.com, i.pravatar.cc
- **Notifications:** React Hot Toast 2.6.0

### **Backend (Prepared, Not Implemented)**
- **Database:** Supabase (PostgreSQL) - configured but unused
- **Authentication:** Supabase Auth - prepared but not connected
- **Storage:** Supabase Storage - ready for file uploads
- **Real-time:** Supabase Realtime - for messaging/notifications
- **API Routes:** Next.js API routes (currently return mock data)

### **Development Tools**
- **Linting:** ESLint 9 with Next.js config
- **Type Checking:** TypeScript strict mode
- **Date Handling:** date-fns 4.1.0
- **Scripts:**
  - `npm run dev` - Start development server
  - `npm run build` - Build for production
  - `npm start` - Start production server
  - `npm run lint` - Run ESLint

---

## 📁 PROJECT STRUCTURE

```
mmm-music/
├── app/                          # Next.js 16 App Router
│   ├── (auth)/                   # Auth route group (no sidebar layout)
│   │   ├── login/page.tsx        ✅ Login page - simulated auth
│   │   └── signup/page.tsx       ✅ Signup page - simulated auth
│   │
│   ├── (main)/                   # Main app route group (with sidebar layout)
│   │   ├── layout.tsx            # Sidebar + Header + Player wrapper
│   │   ├── home/page.tsx         ✅ Home feed (featured, new, trending)
│   │   ├── library/page.tsx      ✅ User library (playlists, liked, recent)
│   │   ├── search/page.tsx       ✅ Search with filters
│   │   ├── messages/page.tsx     ✅ Direct messaging UI
│   │   ├── concerts/page.tsx     ✅ Virtual concerts listing
│   │   ├── concert/[id]/page.tsx ✅ Concert detail pages
│   │   ├── profile/[username]/page.tsx ✅ User profiles
│   │   ├── settings/page.tsx     ✅ Multi-tab settings
│   │   ├── notifications/page.tsx ✅ Notifications page
│   │   ├── activity/page.tsx     ✅ Activity feed
│   │   ├── artist-dashboard/page.tsx ✅ Artist analytics
│   │   ├── upload-song/page.tsx  ✅ Song upload
│   │   ├── song/[id]/page.tsx    ✅ Song details
│   │   ├── playlist/[id]/page.tsx ✅ Playlist details
│   │   └── artist/[id]/page.tsx  ✅ Artist profiles
│   │
│   ├── admin/                    # Admin area (undocumented)
│   ├── api/                      # API routes (mock data)
│   │   ├── search/
│   │   ├── songs/
│   │   └── upload/
│   ├── landing/                  # Landing page folder
│   ├── concert/[id]/             # Duplicate concert route (legacy)
│   │
│   ├── layout.tsx                # Root layout (fonts, Toaster)
│   ├── globals.css               # Tailwind + CSS variables
│   ├── page.tsx                  ✅ Landing page
│   ├── not-found.tsx             ✅ Custom 404 page
│   └── error.tsx                 ✅ Custom 500 error page
│
├── components/                   # 50+ React components (41 .tsx files)
│   ├── admin/                    # Admin components
│   ├── artist/                   # Artist-specific components
│   ├── concert/                  # Concert components
│   │
│   ├── errors/                   # Error state components
│   │   ├── ArtistNotFound.tsx
│   │   └── SongNotFound.tsx
│   │
│   ├── layout/                   # Core layout components
│   │   ├── Header.tsx            # Top header with search
│   │   ├── Sidebar.tsx           # Navigation sidebar
│   │   ├── MusicPlayerBar.tsx    # Bottom player bar
│   │   ├── NotificationDropdown.tsx
│   │   └── LandingHeader.tsx
│   │
│   ├── messaging/                # Chat/messaging components
│   │
│   ├── modals/                   # Modal dialogs
│   │   ├── CreatePlaylistModal.tsx
│   │   ├── EditPlaylistModal.tsx
│   │   ├── AddToPlaylistModal.tsx
│   │   └── index.tsx
│   │
│   ├── player/                   # Music player components
│   │   └── QueueDrawer.tsx
│   │
│   ├── playlist/                 # Playlist components
│   │
│   ├── song/                     # Song display components
│   │   ├── SongCard.tsx          # Grid card view
│   │   └── SongRow.tsx           # List row view
│   │
│   └── ui/                       # shadcn/ui components (40+ files)
│       ├── EmptyState.tsx        # Reusable empty state
│       ├── SongCardSkeleton.tsx  # Loading skeleton
│       ├── PlaylistCardSkeleton.tsx
│       ├── ArtistCardSkeleton.tsx
│       ├── StatCardSkeleton.tsx
│       └── [shadcn components]   # button, card, dialog, etc.
│
├── lib/                          # Utilities & stores
│   ├── store/
│   │   └── player-store.ts       # Zustand global audio player state
│   ├── supabase/                 # Supabase clients (unused)
│   │   ├── client.ts
│   │   └── server.ts
│   ├── mock-data.ts              # Demo songs, concerts, playlists
│   └── utils.ts                  # cn() utility (clsx + twMerge)
│
├── types/                        # TypeScript types
│   └── database.types.ts         # Supabase database schema types
│
├── public/                       # Static assets
├── .next/                        # Build output
├── node_modules/                 # Dependencies
│
├── package.json                  # Dependencies & scripts
├── package-lock.json             # Dependency lock file
├── tsconfig.json                 # TypeScript config (strict mode)
├── next.config.ts                # Next.js config (image domains)
├── eslint.config.mjs             # ESLint config
├── postcss.config.mjs            # PostCSS config
├── components.json               # shadcn/ui config (New York style)
├── README.md                     # Comprehensive documentation
└── PROJECT_CONTEXT.md            # This file
```

---

## 📝 CODE CONVENTIONS

### **Naming Conventions**

#### Files & Folders
- **Route groups:** Parentheses `(auth)`, `(main)`
- **Components:** PascalCase `SongCard.tsx`, `MusicPlayerBar.tsx`
- **Utilities:** kebab-case `mock-data.ts`, `player-store.ts`
- **Pages:** lowercase `page.tsx`, `layout.tsx`, `not-found.tsx`
- **Folders:** lowercase or kebab-case

#### Code
- **Variables:** camelCase `isPlaying`, `currentSong`, `searchQuery`
- **Constants:** camelCase `mockSongs`, `featuredSong`, `newReleases`
- **Functions:** camelCase `playSong`, `handlePlayClick`, `formatDuration`
- **Types/Interfaces:** PascalCase `Song`, `PlayerState`, `EmptyStateProps`
- **React Components:** PascalCase `SongCard`, `Header`, `EmptyState`
- **Event Handlers:** Prefix with `handle` → `handlePlayClick`, `handleSearch`
- **Boolean Variables:** Prefix with `is`, `has`, `should` → `isPlaying`, `hasError`

### **Code Style**

```typescript
// ✅ CORRECT STYLE

'use client' // Client directive at top

import { useState } from 'react' // React/Next imports first
import { Play, Pause } from 'lucide-react' // Third-party
import { Button } from '@/components/ui/button' // UI components
import { SongCard } from '@/components/song/SongCard' // Custom components
import { usePlayerStore } from '@/lib/store/player-store' // Utils/stores
import type { Song } from '@/lib/store/player-store' // Types

interface SongCardProps {
  song: Song
  queue?: Song[]
}

export function SongCard({ song, queue = [] }: SongCardProps) {
  const { currentSong, isPlaying, playSong } = usePlayerStore()
  const [isHovered, setIsHovered] = useState(false)
  
  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    playSong(song, queue)
  }
  
  return (
    <div className="group relative">
      <Button onClick={handlePlayClick}>
        {isPlaying ? <Pause /> : <Play />}
      </Button>
    </div>
  )
}
```

**Key Points:**
- **Indentation:** 2 spaces (no tabs)
- **Line endings:** CRLF `\r\n` (Windows)
- **Quotes:** Single quotes for imports/strings, double quotes in JSX
- **Semicolons:** Optional (mixed usage, not enforced)
- **Trailing commas:** Yes (in objects, arrays, function params)
- **Template literals:** Preferred for string interpolation
- **Arrow functions:** Preferred for components and callbacks
- **Function declarations:** Only for utility functions
- **Async/await:** Preferred over `.then()` chains

### **Import Organization**

```typescript
// 1. React & Next.js
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// 2. Third-party libraries
import { Play, Pause, Heart } from 'lucide-react'
import toast from 'react-hot-toast'

// 3. UI components (@/components/ui)
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog } from '@/components/ui/dialog'

// 4. Custom components (@/components/...)
import { SongCard } from '@/components/song/SongCard'
import { Header } from '@/components/layout/Header'

// 5. Utilities & stores (@/lib/...)
import { cn } from '@/lib/utils'
import { usePlayerStore } from '@/lib/store/player-store'
import { mockSongs } from '@/lib/mock-data'

// 6. Types (@/types/...)
import type { Database } from '@/types/database.types'
```

### **Component Patterns**

#### Client Components (Interactive)
```typescript
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function InteractiveComponent() {
  const [count, setCount] = useState(0)
  
  return (
    <Button onClick={() => setCount(count + 1)}>
      Count: {count}
    </Button>
  )
}
```

#### Server Components (Default)
```typescript
import { mockSongs } from '@/lib/mock-data'

export default function ServerPage() {
  return (
    <div>
      <h1>Songs</h1>
      {mockSongs.map(song => (
        <div key={song.id}>{song.title}</div>
      ))}
    </div>
  )
}
```

#### With TypeScript Props
```typescript
interface ComponentProps {
  title: string
  description?: string
  onAction: () => void
  items: Array<{ id: string; name: string }>
}

export function Component({ 
  title, 
  description, 
  onAction, 
  items 
}: ComponentProps) {
  // Implementation
}
```

### **Path Aliases**

Always use `@/` for imports:

```typescript
// ✅ CORRECT
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { mockSongs } from '@/lib/mock-data'

// ❌ WRONG
import { Button } from '../../../components/ui/button'
import { cn } from '../../lib/utils'
```

Configured in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

## 🎨 DESIGN SYSTEM

### **Theme: Clean White with Purple Accents**

#### Color Palette (OKLCH format)

```css
/* Light Theme (Default) */
--primary: oklch(0.55 0.22 260);           /* Purple #8B5CF6 */
--primary-foreground: oklch(1 0 0);        /* White */

--background: oklch(0.99 0 0);             /* Off-white */
--foreground: oklch(0.1 0 0);              /* Near black */

--card: oklch(1 0 0);                      /* Pure white */
--card-foreground: oklch(0.1 0 0);         /* Near black */

--secondary: oklch(0.96 0 0);              /* Light gray */
--secondary-foreground: oklch(0.1 0 0);    /* Near black */

--muted: oklch(0.95 0 0);                  /* Very light gray */
--muted-foreground: oklch(0.5 0 0);        /* Medium gray */

--accent: oklch(0.96 0.02 260);            /* Light purple tint */
--accent-foreground: oklch(0.55 0.22 260); /* Purple */

--destructive: oklch(0.6 0.25 25);         /* Red */
--destructive-foreground: oklch(1 0 0);    /* White */

--border: oklch(0.9 0 0);                  /* Subtle gray */
--input: oklch(0.9 0 0);                   /* Subtle gray */
--ring: oklch(0.55 0.22 260);              /* Purple (focus) */

--radius: 0.75rem;                         /* 12px border radius */
```

#### Typography

**Font Families:**
- **Primary:** Geist Sans (via next/font/google)
- **Monospace:** Geist Mono (via next/font/google)

**Font Variables:**
```css
--font-geist-sans
--font-geist-mono
```

**Text Sizes (Tailwind):**
- `text-xs` - 0.75rem (12px)
- `text-sm` - 0.875rem (14px)
- `text-base` - 1rem (16px) - default
- `text-lg` - 1.125rem (18px)
- `text-xl` - 1.25rem (20px)
- `text-2xl` - 1.5rem (24px)
- `text-3xl` - 1.875rem (30px)
- `text-4xl` - 2.25rem (36px)
- `text-5xl` - 3rem (48px)

**Font Weights:**
- `font-normal` - 400
- `font-medium` - 500
- `font-semibold` - 600
- `font-bold` - 700

### **Components**

#### shadcn/ui Configuration
```json
{
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "iconLibrary": "lucide"
}
```

#### Available Components (40+)
- **Form:** Button, Input, Textarea, Label, Checkbox, Radio, Switch, Select, Slider
- **Layout:** Card, Separator, Scroll Area, Tabs, Sheet, Dialog
- **Feedback:** Badge, Avatar, Progress, Tooltip, Popover, Dropdown Menu
- **Custom:** EmptyState, Skeletons (Song, Playlist, Artist, Stat)

#### Custom Components

**EmptyState Pattern:**
```typescript
import { Music } from 'lucide-react'
import { EmptyState } from '@/components/ui/EmptyState'

<EmptyState
  icon={Music}
  title="No playlists yet"
  description="Create your first playlist to organize your music"
  action={{
    label: "Create Playlist",
    onClick: () => setModalOpen(true)
  }}
/>
```

**Loading Skeleton Pattern:**
```typescript
import { SongCardSkeleton } from '@/components/ui/SongCardSkeleton'

{isLoading ? (
  <div className="grid grid-cols-6 gap-4">
    {Array.from({ length: 6 }).map((_, i) => (
      <SongCardSkeleton key={i} />
    ))}
  </div>
) : (
  // Actual content
)}
```

### **Layout & Spacing**

#### Responsive Breakpoints
```css
sm:  640px   /* Mobile landscape */
md:  768px   /* Tablet */
lg:  1024px  /* Desktop */
xl:  1280px  /* Large desktop */
2xl: 1536px  /* Extra large */
```

#### Spacing Scale (Tailwind)
```
0   = 0px
0.5 = 2px
1   = 4px
2   = 8px
3   = 12px
4   = 16px
5   = 20px
6   = 24px
8   = 32px
10  = 40px
12  = 48px
16  = 64px
20  = 80px
24  = 96px
```

#### Common Patterns
```tsx
// Page padding
<div className="p-6">

// Section spacing
<div className="space-y-8">

// Card grid
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">

// Flex row with gap
<div className="flex items-center gap-2">

// Max width container
<div className="max-w-7xl mx-auto">
```

### **Interactions & Animations**

#### Hover Effects
```tsx
// Card hover
className="hover:shadow-lg hover:scale-[1.02] transition-all"

// Button hover
className="hover:bg-primary/90 transition-colors"

// Link hover
className="hover:text-primary transition-colors"
```

#### Transitions
```tsx
// Standard transition
className="transition-all"

// Specific properties
className="transition-colors"
className="transition-transform"
className="transition-opacity"

// Duration
className="duration-200"  // 200ms
className="duration-300"  // 300ms
```

#### Animations
```tsx
// Pulse (loading indicator)
className="animate-pulse"

// Shimmer skeleton (from tw-animate-css)
className="animate-shimmer"

// Custom playing indicator
<div className="animate-pulse" style={{ animationDelay: '150ms' }} />
```

---

## ✨ FEATURES IMPLEMENTED

### ✅ Completed (85% Frontend)

#### **Landing & Authentication**
- `/` - Landing page with features showcase
- `/login` - Login page (simulated auth)
- `/signup` - Signup page (simulated auth)
- Clean UI with call-to-action buttons

#### **Music Streaming**
- `/home` - Home feed with:
  - Featured song hero section
  - New releases grid (6 songs)
  - Trending songs list
  - Recommended songs list
- Music Player Bar (bottom):
  - Play/pause, skip forward/back
  - Shuffle and repeat modes
  - Volume control with slider
  - Seek bar with current time/duration
  - Album art and song info display
- `/song/[id]` - Song detail pages with:
  - Full song information
  - Lyrics display
  - Comments section (UI)
  - Related songs
- Audio playback via Howler.js

#### **Search & Discovery**
- `/search` - Search page with:
  - Real-time search input
  - Genre filters (Pop, Rock, Jazz, etc.)
  - Mood filters (Energetic, Calm, Happy, etc.)
  - Results grid with song cards

#### **Library Management**
- `/library` - User library with tabs:
  - **Playlists:** Grid of user playlists
  - **Liked Songs:** List of favorited tracks
  - **Recently Played:** List of recent listens
- Playlist CRUD modals (UI complete):
  - Create playlist (with image upload)
  - Edit playlist
  - Add to playlist

#### **Artist Features**
- `/artist-dashboard` - Analytics dashboard with:
  - Total streams, revenue, listeners
  - Monthly stats charts
  - Top songs list
  - Recent activity
- `/upload-song` - Song upload interface:
  - Audio file upload (drag & drop)
  - Cover image upload
  - Metadata form (title, genre, mood, etc.)
- `/artist/[id]` - Artist profile pages:
  - Bio and stats
  - Discography
  - Albums and singles
  - Follow button (UI)

#### **Social Features**
- `/messages` - Direct messaging:
  - Conversation list
  - Chat interface
  - Message composer
  - Real-time UI (not connected)
- `/profile/[username]` - User profiles with tabs:
  - Overview
  - Playlists
  - Liked songs
  - Following
- `/notifications` - Notifications page:
  - Notification dropdown in header
  - Full page view with categories
  - Mark as read functionality (UI)
- `/activity` - Activity feed:
  - Friends' recent plays
  - New followers
  - Playlist updates

#### **Virtual Concerts**
- `/concerts` - Concert listing with tabs:
  - Upcoming concerts
  - Past concerts
  - Live status indicators
- `/concert/[id]` - Concert detail pages:
  - Full concert information
  - Artist bio
  - Join/attend button
  - Attendee count
  - Chat preview (UI)

#### **Settings**
- `/settings` - Multi-tab settings:
  - **Account:** Profile edit, email, password
  - **Privacy:** Visibility settings, blocked users
  - **Notifications:** Preference toggles
  - **Appearance:** Theme, language (UI only)
  - **Subscription:** Plan details, upgrade options

#### **UI/UX Polish**
- Custom 404 page (`not-found.tsx`)
- Custom 500 error page (`error.tsx`)
- Empty states for all pages
- Loading skeletons with shimmer animations
- Error components (`SongNotFound`, `ArtistNotFound`)
- Responsive layouts (mobile, tablet, desktop)
- Toast notifications (react-hot-toast)

### 🚧 Partial/Incomplete

- Queue management (QueueDrawer exists, needs integration)
- Real audio playback (placeholder URLs)
- Backend integration (all data is mock)
- Follow/unfollow functionality
- Like/unlike songs
- Playlist sharing
- Real-time messaging
- Live concert streaming

### ❌ Planned (Future)

From README.md Priority list:

**Priority 1 - Social Features**
- Playlist CRUD backend integration
- Queue drawer with drag-to-reorder
- Follow system functionality
- Share modal (songs/playlists/artists)

**Priority 2 - Enhanced Features**
- Onboarding flow (genre selection)
- Activity feed real-time updates
- Advanced search filters sidebar
- Artist concert scheduling

**Priority 3 - Mobile Polish**
- Mobile header with hamburger menu
- Mobile sidebar slide-in drawer
- Mobile player full-screen expand
- Mobile-optimized dashboard

**Backend Integration**
- Connect Supabase authentication
- Set up PostgreSQL database
- Implement file uploads to Supabase Storage
- Add real-time subscriptions (chat, notifications)
- Deploy backend and connect frontend

---

## 📊 DATA MODELS

### Song (TypeScript Interface)

**Location:** `lib/store/player-store.ts`

```typescript
interface Song {
  id: string              // Unique identifier
  title: string           // Song title
  artist_name: string     // Artist display name
  audio_url: string       // URL to audio file
  cover_image_url: string // URL to cover art
  duration: number        // Duration in seconds
}
```

**Example:**
```typescript
{
  id: '1',
  title: 'Midnight Dreams',
  artist_name: 'Luna Wave',
  audio_url: '/demo-music/song1.mp3',
  cover_image_url: 'https://images.unsplash.com/photo-...',
  duration: 234
}
```

### Player State (Zustand Store)

**Location:** `lib/store/player-store.ts`

```typescript
interface PlayerState {
  // Current playback state
  currentSong: Song | null
  queue: Song[]
  isPlaying: boolean
  volume: number          // 0-1
  currentTime: number     // Seconds
  duration: number        // Seconds
  howl: Howl | null       // Howler.js instance
  
  // Playback modes
  repeat: 'off' | 'one' | 'all'
  shuffle: boolean
  
  // Actions
  playSong: (song: Song, queue?: Song[]) => void
  play: () => void
  pause: () => void
  togglePlayPause: () => void
  next: () => void
  previous: () => void
  seek: (time: number) => void
  setVolume: (vol: number) => void
  addToQueue: (song: Song) => void
  removeFromQueue: (index: number) => void
  clearQueue: () => void
  toggleRepeat: () => void
  toggleShuffle: () => void
}
```

**Usage:**
```typescript
import { usePlayerStore } from '@/lib/store/player-store'

function Component() {
  const { currentSong, isPlaying, playSong, pause } = usePlayerStore()
  
  return (
    <button onClick={() => isPlaying ? pause() : playSong(song)}>
      {isPlaying ? 'Pause' : 'Play'}
    </button>
  )
}
```

### Concert

**Location:** `lib/mock-data.ts`

```typescript
interface Concert {
  id: string
  title: string
  artist_name: string
  artist_id: string
  artist_avatar: string   // URL
  cover_image: string     // URL
  date: string            // ISO format (e.g., '2025-01-15T20:00:00Z')
  duration: number        // Minutes
  attendee_count: number
  description: string     // Full description
  artist_bio: string      // Artist background
  status: 'upcoming' | 'live' | 'past'
  stream_url?: string     // Optional stream URL
}
```

### Database Schema (Supabase Types)

**Location:** `types/database.types.ts`

```typescript
interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          is_artist: boolean
          created_at: string
        }
      }
      artists: {
        Row: {
          id: string
          profile_id: string
          artist_name: string
          verified: boolean
          total_streams: number
          total_loves: number
          created_at: string
        }
      }
      songs: {
        Row: {
          id: string
          artist_id: string
          title: string
          genre: string | null
          mood: string | null
          duration: number
          audio_url: string
          cover_image_url: string | null
          plays_count: number
          love_count: number
          love_percentage: number
          is_public: boolean
          created_at: string
        }
      }
      playlists: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          cover_image_url: string | null
          is_public: boolean
          created_at: string
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          content: string
          read: boolean
          created_at: string
        }
      }
      concerts: {
        Row: {
          id: string
          artist_id: string
          title: string
          description: string | null
          scheduled_at: string
          duration_minutes: number
          stream_url: string | null
          ticket_price: number
          status: string
          created_at: string
        }
      }
    }
  }
}
```

---

## ⚠️ CRITICAL RULES

When working on this project, **ALWAYS** follow these rules:

### 1. File Organization
- ✅ Use Next.js App Router with route groups: `(auth)`, `(main)`
- ✅ Place pages in `app/` with `page.tsx` and `layout.tsx`
- ✅ Place reusable components in `components/` organized by feature
- ✅ Use `@/` path alias for all imports
- ❌ Never use relative paths like `../../../components`

### 2. Naming Conventions
- ✅ Components: PascalCase (`SongCard.tsx`)
- ✅ Functions/variables: camelCase (`handlePlayClick`, `isPlaying`)
- ✅ Event handlers: prefix with `handle` (`handleSubmit`)
- ✅ Boolean variables: prefix with `is`, `has`, `should`
- ❌ Never use snake_case for React code (only in database schema)

### 3. TypeScript
- ✅ Always use strict mode (already configured)
- ✅ Define interfaces for all component props
- ✅ Use `type` for unions/intersections, `interface` for objects
- ✅ Import types with `import type` when possible
- ❌ Never use `any` type (use `unknown` if necessary)
- ❌ Never disable TypeScript errors with `@ts-ignore`

### 4. React Patterns
- ✅ Use `'use client'` directive for interactive components
- ✅ Prefer arrow functions for components
- ✅ Use React hooks (useState, useEffect, etc.)
- ✅ Use Zustand for global state (player store)
- ❌ Never use class components
- ❌ Never use Context API (use Zustand instead)
- ❌ Never use Redux or other state management libraries

### 5. Styling
- ✅ Use Tailwind CSS utility classes
- ✅ Use `cn()` utility for conditional classes
- ✅ Use shadcn/ui components (New York style)
- ✅ Maintain purple primary color scheme
- ✅ Follow responsive design patterns (mobile-first)
- ❌ Never write custom CSS (use Tailwind)
- ❌ Never use CSS modules or styled-components
- ❌ Never change the primary color without approval

### 6. Components
- ✅ Use shadcn/ui components for all UI elements
- ✅ Use Lucide React for all icons
- ✅ Use EmptyState component for empty states
- ✅ Use skeleton components for loading states
- ❌ Never create custom button/input components (use shadcn)
- ❌ Never use other icon libraries (Font Awesome, Material Icons, etc.)

### 7. Data & API
- ✅ Use mock data from `lib/mock-data.ts`
- ✅ Simulate loading states with setTimeout
- ✅ Keep Supabase clients commented out until backend is ready
- ❌ Never connect to real Supabase without explicit instruction
- ❌ Never make real API calls (use mock data)
- ❌ Never commit environment variables

### 8. Audio Playback
- ✅ Use Howler.js for audio playback
- ✅ Use Zustand player store for playback state
- ✅ Handle play/pause, seek, volume via store actions
- ❌ Never use HTML5 audio directly (use Howler.js)
- ❌ Never create multiple Howler instances (use store)

### 9. Code Quality
- ✅ Write clean, readable code with proper indentation (2 spaces)
- ✅ Add comments only for complex logic
- ✅ Follow existing patterns in the codebase
- ✅ Keep components small and focused (< 200 lines)
- ❌ Never write code with placeholder comments like "TODO: implement"
- ❌ Never leave console.logs in production code

### 10. Git & Deployment
- ✅ Test all changes with `npm run dev` before committing
- ✅ Run `npm run lint` to check for errors
- ✅ Build successfully with `npm run build`
- ❌ Never commit to main without testing
- ❌ Never commit node_modules or .next folders
- ❌ Never commit .env files

---

## 📦 DEPENDENCIES

### Production Dependencies

```json
{
  "@radix-ui/react-avatar": "^1.1.10",
  "@radix-ui/react-checkbox": "^1.3.3",
  "@radix-ui/react-dialog": "^1.1.15",
  "@radix-ui/react-dropdown-menu": "^2.1.16",
  "@radix-ui/react-label": "^2.1.7",
  "@radix-ui/react-popover": "^1.1.15",
  "@radix-ui/react-progress": "^1.1.7",
  "@radix-ui/react-radio-group": "^1.3.8",
  "@radix-ui/react-scroll-area": "^1.2.10",
  "@radix-ui/react-select": "^2.2.6",
  "@radix-ui/react-separator": "^1.1.7",
  "@radix-ui/react-slider": "^1.3.6",
  "@radix-ui/react-slot": "^1.2.3",
  "@radix-ui/react-switch": "^1.2.6",
  "@radix-ui/react-tabs": "^1.1.13",
  "@radix-ui/react-tooltip": "^1.2.8",
  "@supabase/auth-helpers-nextjs": "^0.10.0",
  "@supabase/ssr": "^0.7.0",
  "@supabase/supabase-js": "^2.78.0",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "date-fns": "^4.1.0",
  "howler": "^2.2.4",
  "lucide-react": "^0.552.0",
  "next": "16.0.1",
  "react": "19.2.0",
  "react-dom": "19.2.0",
  "react-hot-toast": "^2.6.0",
  "tailwind-merge": "^3.3.1",
  "zustand": "^5.0.8"
}
```

### Development Dependencies

```json
{
  "@tailwindcss/postcss": "^4",
  "@types/howler": "^2.2.12",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "eslint": "^9",
  "eslint-config-next": "16.0.1",
  "tailwindcss": "^4",
  "tw-animate-css": "^1.4.0",
  "typescript": "^5"
}
```

### Key Dependencies Explained

**UI & Styling:**
- `@radix-ui/*` - Headless UI primitives (accessible, unstyled)
- `tailwindcss` - Utility-first CSS framework (v4 beta)
- `class-variance-authority` - CVA for component variant styling
- `clsx` + `tailwind-merge` - Conditional class merging

**State & Data:**
- `zustand` - Lightweight state management (95% smaller than Redux)
- `@supabase/*` - Backend as a service (PostgreSQL, Auth, Storage)
- `date-fns` - Date utility library (smaller than Moment.js)

**Audio:**
- `howler` - Audio library with HTML5 audio + Web Audio API fallback
- `@types/howler` - TypeScript definitions

**Icons & Feedback:**
- `lucide-react` - Beautiful open-source icon library
- `react-hot-toast` - Toast notifications (lightweight)

**Framework:**
- `next` - React framework with App Router
- `react` + `react-dom` - UI library

### Version Notes

⚠️ **Warnings:**
- **Tailwind CSS v4** - Beta version, breaking changes possible
- **React 19.2.0** - Very new, ecosystem catching up
- **Next.js 16.0.1** - Latest stable

ℹ️ **Info:**
- **Supabase** - Configured but not connected (demo mode)
- No test framework configured (no Jest, Vitest, etc.)

---

## 🚧 GAPS & MISSING PIECES

### Backend Integration
- ❌ Supabase clients configured but unused
- ❌ All API routes return mock data
- ❌ No real authentication (simulated)
- ❌ No database persistence
- ❌ No file uploads to storage
- ❌ No real-time subscriptions

### Testing
- ❌ No test files for application code
- ❌ No test framework (Jest, Vitest, etc.)
- ❌ No E2E testing (Playwright, Cypress, etc.)
- ❌ No unit tests for components
- ❌ No integration tests for stores

### Mobile Optimization
- ⚠️ Responsive layouts exist but lack mobile-specific UX
- ❌ No hamburger menu for mobile navigation
- ❌ No mobile-optimized player (expandable)
- ❌ No mobile sidebar drawer
- ❌ No mobile dashboard layouts

### Features
- ❌ Playlist CRUD backend integration
- ❌ Drag-to-reorder queue
- ❌ Follow/unfollow functionality
- ❌ Like/unlike songs (UI only)
- ❌ Share functionality
- ❌ Real-time messaging
- ❌ Live concert streaming
- ❌ Payment integration (subscriptions)

### Audio
- ❌ No actual audio files in `/public/demo-music/`
- ❌ Placeholder audio URLs
- ❌ No audio file validation
- ❌ No audio format conversion

### Admin
- ⚠️ `app/admin/` folder exists but undocumented
- ❌ Purpose unclear
- ❌ No admin features listed

### Environment
- ❌ No `.env.example` file
- ❌ No environment variable documentation
- ❌ Supabase credentials not configured

### Documentation
- ✅ Excellent README.md
- ⚠️ No API documentation
- ⚠️ No component documentation (Storybook, etc.)
- ⚠️ No inline JSDoc comments

---

## 🔧 DEVELOPMENT GUIDELINES

### Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open browser
http://localhost:3000

# 4. Build for production (test)
npm run build

# 5. Run linter
npm run lint
```

### Adding New Features

#### 1. Create a New Page

```bash
# Route: /example
# File: app/(main)/example/page.tsx

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function ExamplePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Example Page</h1>
    </div>
  )
}
```

#### 2. Create a New Component

```bash
# File: components/example/ExampleCard.tsx

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ExampleCardProps {
  title: string
  className?: string
}

export function ExampleCard({ title, className }: ExampleCardProps) {
  return (
    <Card className={cn("p-4", className)}>
      <h3 className="font-semibold">{title}</h3>
    </Card>
  )
}
```

#### 3. Add Mock Data

```typescript
// File: lib/mock-data.ts

export interface Example {
  id: string
  name: string
}

export const mockExamples: Example[] = [
  { id: '1', name: 'Example 1' },
  { id: '2', name: 'Example 2' },
]
```

#### 4. Create Zustand Store (if needed)

```typescript
// File: lib/store/example-store.ts

import { create } from 'zustand'

interface ExampleState {
  items: string[]
  addItem: (item: string) => void
}

export const useExampleStore = create<ExampleState>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ 
    items: [...state.items, item] 
  })),
}))
```

### Using shadcn/ui Components

```bash
# Install a new shadcn component
# (Note: Most are already installed)

npx shadcn@latest add badge
npx shadcn@latest add toast
npx shadcn@latest add accordion
```

### Common Patterns

#### Loading State
```typescript
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
  const timer = setTimeout(() => setIsLoading(false), 1000)
  return () => clearTimeout(timer)
}, [])

return isLoading ? <SongCardSkeleton /> : <SongCard song={song} />
```

#### Empty State
```typescript
{items.length === 0 ? (
  <EmptyState
    icon={Music}
    title="No items found"
    description="Add your first item to get started"
    action={{
      label: "Add Item",
      onClick: () => setModalOpen(true)
    }}
  />
) : (
  // Render items
)}
```

#### Modal/Dialog
```typescript
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const [open, setOpen] = useState(false)

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Modal Title</DialogTitle>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

#### Toast Notification
```typescript
import toast from 'react-hot-toast'

const handleSuccess = () => {
  toast.success('Operation successful!')
}

const handleError = () => {
  toast.error('Something went wrong')
}
```

### Debugging

```bash
# Check TypeScript errors
npx tsc --noEmit

# Check ESLint errors
npm run lint

# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Before Committing

```bash
# 1. Test locally
npm run dev

# 2. Check for errors
npm run lint

# 3. Build successfully
npm run build

# 4. Check TypeScript
npx tsc --noEmit

# 5. Commit changes
git add .
git commit -m "feat: add new feature"
```

---

## 📚 USEFUL RESOURCES

- **Next.js Docs:** https://nextjs.org/docs
- **React Docs:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com/docs
- **shadcn/ui:** https://ui.shadcn.com
- **Radix UI:** https://www.radix-ui.com
- **Lucide Icons:** https://lucide.dev
- **Zustand:** https://zustand-demo.pmnd.rs
- **Howler.js:** https://howlerjs.com
- **Supabase:** https://supabase.com/docs

---

## 📝 NOTES

- This is a **student project** for learning purposes
- Currently in **demo mode** with mock data
- **Backend integration** is prepared but not connected
- Focus is on **frontend excellence** and **UI/UX polish**
- Code quality and consistency are prioritized
- Follow existing patterns for new features
- Ask before making architectural changes

---

**Last updated:** January 17, 2025  
**Maintained by:** MMM Team  
**Project Status:** Frontend 85% Complete

---

*For any questions or clarifications, refer to the comprehensive README.md or this document.*
