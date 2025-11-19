# 🎵 MMM - Mind Your Own Music

A modern music streaming platform connecting indie artists directly with fans. Features include music streaming, direct messaging, virtual concerts, social features, and an artist analytics dashboard.

📊 **Progress:** 15+ Pages | 50+ Components | ~8,000 LOC | ~85–90% Frontend Complete (Demo Mode)

---

## 📋 Table of Contents

1. [Project Overview](#-project-overview)
2. [Tech Stack](#-tech-stack)
3. [Features Implemented](#-features-implemented)
4. [Project Structure](#-project-structure)
5. [Design System](#-design-system)
6. [Code Conventions & Critical Rules](#-code-conventions--critical-rules)
7. [Core Domain Models](#-core-domain-models)
8. [Error & Empty States](#-error--empty-states)
9. [Playlist Modals](#-playlist-modals)
10. [Queue Drawer](#-queue-drawer)
11. [Getting Started](#-getting-started)
12. [Scripts](#-scripts)
13. [Roadmap & Gaps](#-roadmap--gaps)
14. [Contributing](#-contributing)
15. [License](#-license)
16. [Contact & Resources](#-contact--resources)

---

## 🎯 Project Overview

- **Name:** MMM - Mind Your Own Music  
- **Type:** Web Application (Music Streaming Platform)  
- **Primary Language:** TypeScript 5 (strict)  
- **Framework:** Next.js 16 (App Router + React Server Components)  
- **Architecture:** Route groups `app/(auth)` and `app/(main)` with shared layout (Header + Sidebar + Player)  
- **Current Phase:** Phase 2 – Frontend feature-complete (demo mode)  
- **Mode:** Demo/Frontend Only (mock data, no real backend)  
- **Last Updated:** January 2025

**Purpose:**
A modern music streaming platform focused on indie artists and fans, with:
- Music streaming with full playback controls
- Direct messaging with artists
- Virtual concerts (upcoming, live, past)
- Artist analytics dashboard
- Social features (profiles, following, playlists, activity feed)

---

## 🛠️ Tech Stack

### Core
- **Runtime:** Node.js 18+
- **Framework:** Next.js 16.0.1 (App Router)
- **Language:** TypeScript 5 (strict mode)
- **Build Tool:** Next.js built-in (Turbopack/Webpack)
- **Package Manager:** npm

### Frontend
- **UI Framework:** React 19.2.0
- **Styling:** Tailwind CSS v4 (beta)
- **Component Library:** shadcn/ui (New York style, 40+ components)
- **UI Primitives:** Radix UI (dialogs, sheets, tabs, etc.)
- **Icons:** Lucide React
- **State Management:** Zustand (global music player + misc state)
- **Audio:** Howler.js (HTML5 + Web Audio)
- **Notifications:** React Hot Toast

### Backend (Prepared, Not Yet Connected)
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (planned migration to Better-Auth possible later)
- **Storage:** Supabase Storage
- **Real-time:** Supabase Realtime
- **API Routes:** Next.js API routes returning mock data only

---

## ✨ Features Implemented

### Landing & Authentication
- `/` – Marketing landing page with feature highlights and CTAs
- `/login`, `/signup` – Auth pages in demo mode (no real auth)

### Music Streaming
- `/home` – Home feed with:
  - Featured song hero section
  - New releases grid
  - Trending songs list
  - Recommended songs
- **Music Player Bar** (bottom):
  - Play/pause, previous/next
  - Shuffle & repeat
  - Seek bar with current time/duration
  - Volume slider
  - Queue drawer trigger
- `/song/[id]` – Song details with lyrics, comments UI, related songs

### Library & Playlists
- `/library` – User library with tabs:
  - Playlists
  - Liked Songs
  - Recently Played
- Playlist CRUD **UI** via modals (see [Playlist Modals](#-playlist-modals))
- `/playlist/[id]` – Playlist view & controls

### Search & Discovery
- `/search` – Search across songs/artists with:
  - Real-time search input
  - Genre filters
  - Mood filters
  - Results grid + list views

### Artist & Creator Features
- `/artist-dashboard` – Artist analytics dashboard with:
  - Streams, revenue, listeners
  - Charts and stats cards
  - Top songs and recent activity
- `/upload-song` – Upload UI (drag & drop audio + cover image + metadata)
- `/artist/[id]` – Artist profile pages (bio, stats, discography, follow button UI)

### Social & Community
- `/messages` – Direct messaging UI:
  - Conversation list
  - Chat window
  - Message composer
- `/profile/[username]` – User profile pages with tabs:
  - Overview, Playlists, Liked Songs, Following
- `/notifications` – Full notifications page + header dropdown
- `/activity` – Activity feed: friends’ plays, followers, playlist updates

### Virtual Concerts
- `/concerts` – Concert listing with tabs:
  - Upcoming, Live, Past
- `/concert/[id]` – Concert details:
  - Artist, description, schedule, status
  - Join/attend button, attendee count
  - Chat preview UI

### Settings & Preferences
- `/settings` – Multi-tab settings:
  - Account, Privacy, Notifications, Appearance, Subscription

### UI/UX Polish
- Custom 404 and 500 pages  
- Error components: `SongNotFound`, `ArtistNotFound`  
- Empty states for all major pages  
- Loading skeletons with shimmer animations  
- Responsive layouts for mobile/tablet/desktop

---

## 📁 Project Structure

```text
mmm-music/
├── app/
│   ├── (auth)/                  # Auth route group (no sidebar/player)
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (main)/                  # Main app (Header + Sidebar + Player)
│   │   ├── layout.tsx           # Shell layout
│   │   ├── home/page.tsx
│   │   ├── library/page.tsx
│   │   ├── search/page.tsx
│   │   ├── messages/page.tsx
│   │   ├── concerts/page.tsx
│   │   ├── concert/[id]/page.tsx
│   │   ├── profile/[username]/page.tsx
│   │   ├── settings/page.tsx
│   │   ├── notifications/page.tsx
│   │   ├── activity/page.tsx
│   │   ├── artist-dashboard/page.tsx
│   │   ├── upload-song/page.tsx
│   │   ├── song/[id]/page.tsx
│   │   ├── playlist/[id]/page.tsx
│   │   └── artist/[id]/page.tsx
│   ├── admin/                   # Admin area (experimental)
│   ├── api/                     # API routes (mock data only)
│   ├── not-found.tsx            # Global 404
│   ├── error.tsx                # Global error boundary
│   ├── globals.css              # Tailwind base + CSS variables
│   ├── page.tsx                 # Landing page
│   └── layout.tsx               # Root layout (fonts, Toaster)
├── components/
│   ├── layout/                  # Header, Sidebar, Player, LandingHeader
│   ├── messaging/               # Chat UI pieces
│   ├── modals/                  # Playlist modals (see below)
│   ├── player/                  # QueueDrawer, player utilities
│   ├── playlist/                # Playlist-specific components
│   ├── concert/                 # Concert cards and layouts
│   ├── artist/                  # Artist cards and widgets
│   ├── errors/                  # SongNotFound, ArtistNotFound
│   └── ui/                      # shadcn/ui components + EmptyState + Skeletons
├── lib/
│   ├── mock-data.ts             # All demo data (songs, artists, playlists, etc.)
│   ├── store/
│   │   └── player-store.ts      # Global music player state (Zustand + Howler)
│   ├── supabase/                # Supabase client helpers (unused in demo)
│   └── utils.ts                 # `cn()` and misc utilities
├── types/
│   └── database.types.ts        # Supabase database schema types
├── public/                      # Static assets (images, demo music placeholders)
├── next.config.ts               # Next.js config (image domains, etc.)
├── tsconfig.json                # TypeScript config (paths, strict)
├── eslint.config.mjs            # ESLint config
└── components.json              # shadcn/ui config (New York style)
```

---

## 🎨 Design System

**Theme:** Clean **light** theme with purple accents (no dark mode by default).

- **Primary:** Purple `#8B5CF6` (OKLCH primary)
- **Background:** Off‑white
- **Foreground:** Near-black text
- **Cards:** White, soft shadows, 12px radius
- **Secondary/Muted:** Light grays
- **Accent:** Light purple tint

**Typography:**
- **Primary font:** Geist Sans
- **Monospace:** Geist Mono
- Tailwind text scale: `text-xs` → `text-5xl`
- Weights: `font-normal`, `font-medium`, `font-semibold`, `font-bold`

**Components:**
- Built with **shadcn/ui** (`style: "new-york"`) + **Radix UI** primitives
- Consistent use of `Button`, `Card`, `Dialog`, `Sheet`, `Tabs`, `ScrollArea`, etc.
- Skeleton components for song, playlist, artist, and stat cards
- `EmptyState` component for all “no data” screens

**Layout & Spacing:**
- Page padding: `p-6`
- Section spacing: `space-y-8`
- Card grids: `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4`
- Responsive breakpoints: `sm`, `md`, `lg`, `xl`, `2xl` (Tailwind defaults)

**Interactions:**
- Hover: `hover:shadow-lg hover:scale-[1.02] transition-all` on cards
- Buttons: `hover:bg-primary/90 transition-colors`
- Links: `hover:text-primary transition-colors`
- Loading: `animate-pulse` / shimmer skeletons

---

## 💻 Code Conventions & Critical Rules

**Imports order:** React/Next → third‑party → `@/components/ui` → `@/components/...` → `@/lib/...` → `@/types/...`.

**Naming:**
- Components & types: `PascalCase` (`SongCard`, `PlayerState`)
- Variables & functions: `camelCase` (`currentSong`, `handlePlayClick`)
- Booleans: `isX`, `hasX`, `shouldX`
- Paths: always use `@/` alias (no `../../../` imports)

**React/TS patterns:**
- Use `'use client'` for interactive components
- Functional components only (no class components)
- Hooks + Zustand for state (no Redux, no Context API)
- TypeScript strict: no `any`, no `@ts-ignore`
- `interface` for object shapes, `type` for unions/intersections

**Styling:**
- Tailwind utilities only (no CSS modules, styled‑components, or custom CSS files beyond `globals.css`)
- Use `cn()` helper for conditional classes
- Do not change primary color or theme without approval

**Audio:**
- All playback via Howler.js through the `player-store` Zustand store
- Do **not** use `<audio>` directly or create extra Howler instances

**Data & APIs:**
- Use `lib/mock-data.ts` for all data in demo mode
- No real Supabase or external API calls unless explicitly enabled later
- Do not commit `.env` or sensitive credentials

**Quality:**
- 2‑space indentation, clean and readable components (< ~200 lines where possible)
- No stray `console.log` in production code
- Prefer clear UI states over placeholder comments (`// TODO`)

---

## 📦 Core Domain Models

### Song
Defined in `lib/store/player-store.ts` and `lib/mock-data.ts`.

```ts
interface Song {
  id: string
  title: string
  artist_name: string
  audio_url: string
  cover_image_url: string
  duration: number // seconds
}
```

### Player State (Zustand)

```ts
interface PlayerState {
  currentSong: Song | null
  queue: Song[]
  isPlaying: boolean
  volume: number
  currentTime: number
  duration: number
  howl: Howl | null
  repeat: 'off' | 'one' | 'all'
  shuffle: boolean
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

### Concert (Mock Data)

```ts
interface Concert {
  id: string
  title: string
  artist_name: string
  artist_id: string
  artist_avatar: string
  cover_image: string
  date: string           // ISO timestamp
  duration: number       // minutes
  attendee_count: number
  description: string
  artist_bio: string
  status: 'upcoming' | 'live' | 'past'
  stream_url?: string
}
```

### Supabase Database Types

See `types/database.types.ts` for tables like `profiles`, `artists`, `songs`, `playlists`, `messages`, `concerts`.  
These are **not yet wired up** in the frontend; they define the planned production schema.

---

## ❗ Error & Empty States

### Global Error Pages

- **404 Not Found** – `app/not-found.tsx`
  - Shown automatically when a route or resource doesn’t exist
  - Friendly copy, large "404", music-themed illustration
  - Primary actions: “Go to Home”, “Browse Music” + quick links

- **500 Error Page** – `app/error.tsx`
  - Shown when an unhandled error occurs in a route segment
  - Red error icon, “Something went wrong” message
  - Actions: “Try Again” (calls `reset`) and “Go to Home`
  - Shows raw error message only in development, and logs to console

### Reusable Error Components

- **`SongNotFound`** – `components/errors/SongNotFound.tsx`
  - Use when a song ID is invalid or missing from `mockSongs`
  - Props: none; renders messaging + “Browse Music” / “Back to Home” CTA

- **`ArtistNotFound`** – `components/errors/ArtistNotFound.tsx`
  - Use when an artist ID is invalid or missing from `mockArtists`
  - Suggests discovering other artists with clear navigation

### Empty State Pattern

Use `EmptyState` from `@/components/ui/EmptyState`:

```tsx
<EmptyState
  icon={Music}
  title="No playlists yet"
  description="Create your first playlist to organize your music"
  action={{ label: "Create Playlist", onClick: () => setModalOpen(true) }}
/>
```

---

## 🎚 Playlist Modals

All playlist modals live in `components/modals/` and are re‑exported from `@/components/modals`.

### 1. `CreatePlaylistModal`

- Create a new playlist with:
  - Name (required)
  - Description (optional)
  - Cover image (drag & drop upload UI)
  - Public/private toggle
- Suggested integration:
  - “Create Playlist” button on `/library`
  - "Create new" quick actions from Add‑to‑Playlist flows

### 2. `EditPlaylistModal`

- Edit an existing playlist:
  - Pre‑filled with current name, description, cover, visibility
  - Supports deleting playlist via destructive button + confirm dialog
- Suggested integration:
  - Playlist header on `/playlist/[id]`
  - Edit icon on playlist cards in `/library`

### 3. `AddToPlaylistModal`

- Add a song to one or more playlists:
  - Search/filter playlists
  - Checkbox list; supports multiple selection
  - Indicates which playlists already contain the song
  - "Create New Playlist" quick action (opens `CreatePlaylistModal`)
- Suggested integration:
  - `SongCard` and `SongRow` overflow menus
  - Song detail page (`/song/[id]`)
  - MusicPlayerBar actions for current song

All modals use shadcn/ui `Dialog`, `Button`, `Input`, `Textarea`, `Switch`, `Checkbox`, and `ScrollArea`.  
They follow the same clean white, purple‑accent look and are responsive (`sm:max-w-[425–500px]`).

---

## 📜 Queue Drawer

**File:** `components/player/QueueDrawer.tsx` (integrated into `MusicPlayerBar`).

**Purpose:** Slide‑in drawer showing the **Now Playing** track and upcoming **queue**.

### Features

- **Now Playing** section:
  - Large cover art
  - Title, artist, duration
  - Animated “Playing” indicator (3 bouncing bars)
- **Up Next** section:
  - Scrollable list of queued songs
  - Small cover art, title, artist, duration
  - Drag handle icon (visual only for now)
  - Remove (`X`) button per song
  - Badge showing number of songs in queue
- **Footer actions:**
  - "Save as Playlist" (future integration with `CreatePlaylistModal`)
  - "Clear Queue" with confirmation dialog
- **Empty state:** Friendly message + music icon when queue is empty

### Usage

1. Start playback so the `MusicPlayerBar` is visible.
2. Click the **queue/list icon** in the player.
3. The drawer (shadcn `Sheet`) slides in from the right on desktop and covers full width on mobile.

State is driven entirely by the `player-store` Zustand store: `currentSong`, `queue`, `removeFromQueue`, `clearQueue`, etc.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm (or another compatible package manager)

### Installation & Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open the app
http://localhost:3000
```

The app runs fully in **demo mode** using mock data; no Supabase credentials are required to explore the UI.

---

## 📜 Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm start        # Run production build
npm run lint     # ESLint
```

You can also run `npx tsc --noEmit` to check TypeScript types explicitly.

---

## 🧭 Roadmap & Gaps

### Frontend (High Priority)
- Playlist CRUD **backend** integration
- Queue drawer drag‑to‑reorder
- Follow/unfollow and likes wired to real data
- Share modal for songs/playlists/artists

### Enhanced Features
- Onboarding flow (role + genres + artists after signup)
- Activity feed real‑time updates
- Advanced search filter sidebar
- Artist concert scheduling tools

### Mobile Polish
- Mobile header with hamburger menu
- Slide‑in mobile sidebar
- Expandable full‑screen mobile player
- Mobile‑optimized dashboards

### Backend Integration
- Connect Supabase auth & database
- Real file uploads to Supabase Storage
- Realtime subscriptions for chat & notifications
- Environment variables & production deployment

### Testing & Tooling
- Add unit/integration tests (Jest/Vitest) and/or E2E (Playwright/Cypress)
- Add API and component documentation (Storybook or similar)

---

## 🤝 Contributing

This is a **student project** focused on frontend and UX polish, but contributions are welcome.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make and test your changes (`npm run dev`, `npm run lint`, `npm run build`)
4. Commit: `git commit -m "feat: add amazing feature"`
5. Push and open a Pull Request

Please follow the code conventions and critical rules above when contributing.

---

## 📝 License

This project is for **educational purposes**.

---

## 📞 Contact & Resources

For questions or support, please open an issue in the repository.

**Useful Docs:**
- Next.js – https://nextjs.org/docs
- React – https://react.dev
- Tailwind CSS – https://tailwindcss.com/docs
- shadcn/ui – https://ui.shadcn.com
- Radix UI – https://www.radix-ui.com
- Lucide Icons – https://lucide.dev
- Zustand – https://zustand-demo.pmnd.rs
- Howler.js – https://howlerjs.com
- Supabase – https://supabase.com/docs

---

**Built with ❤️ for indie artists and music lovers.**
