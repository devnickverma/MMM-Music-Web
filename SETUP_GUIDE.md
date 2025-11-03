# 🚀 MMM (Mind Your Own Music) - Complete Setup Guide

## Project Overview
A music streaming platform with:
- Music discovery and streaming
- Direct messaging with artists
- Virtual concerts
- Playlist management
- Artist upload portal
- Admin dashboard

**Timeline:** 15-20 days
**Tech Stack:** Next.js 14 + Supabase + Howler.js

---

## 📦 Step 1: Initialize Next.js Project

```bash
# Create Next.js 14 project with App Router
npx create-next-app@latest mmm-music

# When prompted, select:
# TypeScript? → Yes
# ESLint? → Yes  
# Tailwind CSS? → Yes ✅
# `src/` directory? → No
# App Router? → Yes ✅
# Import alias? → Yes (keep default @/*)

# Navigate into project
cd mmm-music
```

---

## 📦 Step 2: Install All Dependencies

### Core Dependencies
```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install howler zustand
npm install lucide-react react-hot-toast date-fns
```

### TypeScript Type Definitions
```bash
npm install -D @types/howler
```

### Optional (Add Later for UI Polish)
```bash
# shadcn/ui components (optional - after MVP)
npx shadcn-ui@latest init
```

---

## 📦 Step 3: Project Structure

Create this folder structure:

```
mmm-music/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
│   ├── (main)/
│   │   ├── home/
│   │   │   └── page.tsx
│   │   ├── search/
│   │   │   └── page.tsx
│   │   ├── library/
│   │   │   └── page.tsx
│   │   └── messages/
│   │       └── page.tsx
│   ├── artist/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── upload/
│   │   │   └── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   ├── song/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── playlist/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── concert/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── live/
│   │           └── page.tsx
│   ├── admin/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── api/
│   │   ├── songs/
│   │   │   └── route.ts
│   │   ├── search/
│   │   │   └── route.ts
│   │   └── upload/
│   │       └── route.ts
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── MusicPlayerBar.tsx
│   ├── player/
│   │   ├── MusicPlayer.tsx
│   │   ├── PlayerControls.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── VolumeControl.tsx
│   │   └── Queue.tsx
│   ├── song/
│   │   ├── SongCard.tsx
│   │   ├── SongDetail.tsx
│   │   ├── LoveButton.tsx
│   │   ├── LovePercentageBar.tsx
│   │   └── CommentsSection.tsx
│   ├── artist/
│   │   ├── ArtistCard.tsx
│   │   ├── ArtistProfile.tsx
│   │   └── ArtistStats.tsx
│   ├── playlist/
│   │   ├── PlaylistCard.tsx
│   │   ├── PlaylistDetail.tsx
│   │   ├── CreatePlaylistModal.tsx
│   │   └── AddToPlaylistModal.tsx
│   ├── messaging/
│   │   ├── Inbox.tsx
│   │   ├── ChatWindow.tsx
│   │   ├── MessageBubble.tsx
│   │   └── MessageInput.tsx
│   ├── concert/
│   │   ├── ConcertCard.tsx
│   │   ├── ConcertRoom.tsx
│   │   ├── LiveChat.tsx
│   │   └── ScheduleConcertForm.tsx
│   ├── admin/
│   │   ├── AdminLayout.tsx
│   │   ├── UserTable.tsx
│   │   ├── ModerationQueue.tsx
│   │   └── AnalyticsDashboard.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Modal.tsx
│       └── LoadingSpinner.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── store/
│   │   └── player-store.ts
│   └── utils/
│       ├── format-time.ts
│       └── format-date.ts
│
├── styles/
│   └── globals.css
│
├── types/
│   └── database.types.ts
│
├── public/
│   └── demo-music/
│
└── .env.local
```

### Create folders:
```bash
# Run this in PowerShell
mkdir -p app/(auth)/login, app/(auth)/signup
mkdir -p app/(main)/home, app/(main)/search, app/(main)/library, app/(main)/messages
mkdir -p app/artist/dashboard, app/artist/upload, app/artist/[id]
mkdir -p app/song/[id], app/playlist/[id]
mkdir -p app/concert/[id]/live
mkdir -p app/admin, app/api/songs, app/api/search, app/api/upload
mkdir -p components/layout, components/player, components/song, components/artist
mkdir -p components/playlist, components/messaging, components/concert, components/admin, components/ui
mkdir -p lib/supabase, lib/store, lib/utils
mkdir -p styles, types, public/demo-music
```

---

## 🔧 Step 4: Environment Setup

Create `.env.local` in root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 🗄️ Step 5: Supabase Setup

1. **Create Supabase Project:**
   - Go to https://supabase.com
   - Click "New Project"
   - Note your Project URL and anon key

2. **Database Schema:**
   - Go to SQL Editor in Supabase Dashboard
   - Copy and run the SQL from `Project idea/MMM Json.md` (lines 63-173)
   - Creates tables: profiles, artists, songs, playlists, likes, comments, messages, concerts, etc.

3. **Storage Buckets:**
   - Create bucket: `songs` (for audio files)
   - Create bucket: `images` (for covers/avatars)
   - Set both to public access

---

## 🎨 Step 6: Tailwind Configuration

Update `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B5CF6',
          50: '#F5F3FF',
          100: '#EDE9FE',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
        },
        dark: {
          DEFAULT: '#0F172A',
          50: '#1E293B',
          100: '#334155',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};

export default config;
```

---

## 📝 Step 7: Initial Files

### `lib/supabase/client.ts`
```typescript
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const createClient = () => createClientComponentClient()
```

### `lib/store/player-store.ts`
```typescript
import { create } from 'zustand'
import { Howl } from 'howler'

interface Song {
  id: string
  title: string
  artist_name: string
  audio_url: string
  cover_image_url: string
  duration: number
}

interface PlayerState {
  currentSong: Song | null
  queue: Song[]
  isPlaying: boolean
  volume: number
  currentTime: number
  duration: number
  howl: Howl | null
  
  playSong: (song: Song) => void
  play: () => void
  pause: () => void
  togglePlayPause: () => void
  next: () => void
  previous: () => void
  seek: (time: number) => void
  setVolume: (vol: number) => void
  addToQueue: (song: Song) => void
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSong: null,
  queue: [],
  isPlaying: false,
  volume: 0.7,
  currentTime: 0,
  duration: 0,
  howl: null,
  
  playSong: (song) => {
    const { howl } = get()
    if (howl) howl.unload()
    
    const newHowl = new Howl({
      src: [song.audio_url],
      html5: true,
      volume: get().volume,
      onplay: () => set({ isPlaying: true }),
      onpause: () => set({ isPlaying: false }),
      onend: () => get().next(),
      onload: function() {
        set({ duration: this.duration() })
      }
    })
    
    newHowl.play()
    set({ currentSong: song, howl: newHowl })
  },
  
  play: () => {
    const { howl } = get()
    if (howl) {
      howl.play()
      set({ isPlaying: true })
    }
  },
  
  pause: () => {
    const { howl } = get()
    if (howl) {
      howl.pause()
      set({ isPlaying: false })
    }
  },
  
  togglePlayPause: () => {
    const { isPlaying } = get()
    isPlaying ? get().pause() : get().play()
  },
  
  next: () => {
    const { queue } = get()
    if (queue.length > 0) {
      const nextSong = queue[0]
      get().playSong(nextSong)
      set({ queue: queue.slice(1) })
    }
  },
  
  previous: () => {
    // Implement previous logic
  },
  
  seek: (time) => {
    const { howl } = get()
    if (howl) {
      howl.seek(time)
      set({ currentTime: time })
    }
  },
  
  setVolume: (vol) => {
    const { howl } = get()
    if (howl) howl.volume(vol)
    set({ volume: vol })
  },
  
  addToQueue: (song) => {
    set((state) => ({ queue: [...state.queue, song] }))
  }
}))
```

---

## ✅ Step 8: Verify Installation

Run development server:
```bash
npm run dev
```

Visit: http://localhost:3000

---

## 📋 Complete Dependencies List

### package.json (Expected)
```json
{
  "name": "mmm-music",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "@supabase/supabase-js": "^2.45.0",
    "@supabase/auth-helpers-nextjs": "^0.10.0",
    "howler": "^2.2.4",
    "zustand": "^4.5.0",
    "lucide-react": "^0.400.0",
    "react-hot-toast": "^2.4.1",
    "date-fns": "^3.6.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/node": "^20.14.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@types/howler": "^2.2.11",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0"
  }
}
```

---

## 🎯 What's Included vs What to Add Later

### ✅ Included in Setup:
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS (for styling)
- Supabase (database + auth + storage)
- Howler.js (audio player)
- Zustand (state management)
- Lucide React (icons)
- React Hot Toast (notifications)

### 🔮 Add Later (Post-MVP):
- **shadcn/ui** - Polished UI components
- **Framer Motion** - Advanced animations
- **Recharts** - Analytics charts for artist dashboard
- **React Hook Form** - Better form handling
- **Zod** - Schema validation

---

## 🚦 Next Steps

1. ✅ Run setup commands above
2. ✅ Create Supabase project and add env variables
3. ✅ Run database schema SQL
4. 🔄 Start building features (Day 1-15 workflow)

**Ready to start building!** 🚀
