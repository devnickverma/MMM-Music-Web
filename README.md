# 🎵 MMM - Mind Your Own Music

A modern music streaming platform connecting indie artists directly with fans. Features include music streaming, direct messaging with artists, virtual concerts, and artist analytics dashboard.

## 📋 Project Status

**Current Phase:** Frontend Development (Phase 1 Complete)
**Mode:** Demo/Frontend Only (Backend Integration Pending)
**Last Updated:** January 2025

---

## ✨ Features Implemented

### 🎯 Core Features (Completed)

#### Landing & Authentication
- ✅ **Landing Page** - Marketing page with features showcase
- ✅ **Login/Signup** - Authentication pages with demo mode
- ✅ **Clean UI** - Modern white theme using shadcn/ui components

#### Music Streaming
- ✅ **Home Feed** - Featured songs, new releases, trending tracks
- ✅ **Music Player** - Full playback controls with play/pause, skip, shuffle, repeat
- ✅ **Search** - Search songs/artists with genre and mood filters
- ✅ **Song Details** - Lyrics, comments section, related songs
- ✅ **Library** - Playlists, liked songs, recently played (with tabs)

#### Artist Features
- ✅ **Artist Dashboard** - Analytics, stats, revenue tracking
- ✅ **Upload Music** - Song upload with cover image and metadata
- ✅ **Artist Profile** - Bio, discography, albums, followers
- ✅ **Concert Management** - Schedule and manage virtual concerts (UI only)

#### Social Features
- ✅ **Messages** - Direct messaging with artists (UI ready)
- ✅ **Playlist Detail** - View playlist with songs and controls
- ✅ **User Interface** - Sidebar navigation, header with search, notifications bell

---

## 🚧 Features In Progress / Planned

### Priority 1 (Essential)
- 🔲 **Virtual Concerts** - Live concert viewing with real-time chat
- 🔲 **Playlist CRUD** - Create, edit, delete playlists
- 🔲 **Follow System** - Follow/unfollow artists and users
- 🔲 **Notifications** - Real-time notification system

### Priority 2 (Important)
- 🔲 **User Profiles** - Public user profile pages
- 🔲 **Settings Page** - Account, privacy, notification settings
- 🔲 **Enhanced Search** - Advanced filters and sorting
- 🔲 **Queue Management** - Music queue UI in player

### Priority 3 (Nice to Have)
- 🔲 **Onboarding Flow** - Genre selection, role selection
- 🔲 **Admin Dashboard** - Content moderation and analytics
- 🔲 **Activity Feed** - User activity timeline
- 🔲 **Advanced Player** - Equalizer, lyrics sync, playback speed

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **State Management:** Zustand
- **Audio Player:** Howler.js
- **Notifications:** React Hot Toast

### Backend (Prepared, Not Implemented)
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Storage:** Supabase Storage
- **Real-time:** Supabase Realtime

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd mmm-music
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables** (Optional for demo mode)
```bash
cp .env.example .env.local
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**
```
http://localhost:3000
```

---

## 📁 Project Structure

```
mmm-music/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── login/
│   │   └── signup/
│   ├── (main)/              # Main app (with sidebar layout)
│   │   ├── home/            # Home feed
│   │   ├── library/         # User library
│   │   ├── search/          # Search page
│   │   ├── messages/        # Direct messages
│   │   ├── artist-dashboard/ # Artist analytics
│   │   ├── upload-song/     # Upload music
│   │   ├── song/[id]/       # Song details
│   │   ├── playlist/[id]/   # Playlist details
│   │   └── artist/[id]/     # Artist profile
│   ├── page.tsx             # Landing page
│   └── layout.tsx           # Root layout
├── components/
│   ├── layout/              # Header, Sidebar, Player
│   ├── song/                # Song cards and rows
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── mock-data.ts         # Demo data
│   ├── store/               # Zustand stores
│   └── supabase/            # Supabase clients (commented)
└── types/
    └── database.types.ts    # Database types
```

---

## 🎨 Key Pages

### Public Pages
- `/` - Landing page with features
- `/login` - Login page
- `/signup` - Signup page

### Authenticated Pages
- `/home` - Main music feed
- `/library` - Your music library
- `/search` - Search music
- `/messages` - Chat with artists
- `/artist-dashboard` - Artist analytics (for artists)
- `/upload-song` - Upload new music (for artists)
- `/song/[id]` - Song detail page
- `/playlist/[id]` - Playlist page
- `/artist/[id]` - Artist profile

---

## 🎯 Current Limitations (Demo Mode)

- **No Real Authentication** - Login/signup are simulated
- **Mock Data** - All music and user data is hardcoded
- **No Real Uploads** - File uploads are simulated
- **No Backend API** - All features are frontend-only
- **No Real Audio** - Audio URLs point to placeholder paths
- **No Database** - Data doesn't persist between sessions

---

## 🔄 Next Steps

1. **Implement Virtual Concerts**
   - Concert listing page
   - Live concert viewer
   - Real-time chat integration

2. **Backend Integration**
   - Connect Supabase for auth
   - Set up database tables
   - Implement file upload to Supabase Storage
   - Add real-time subscriptions

3. **Social Features**
   - Follow/unfollow system
   - Notifications
   - User profiles

4. **Playlist Management**
   - Create/edit/delete playlists
   - Add/remove songs
   - Share playlists

---

## 🤝 Contributing

This is a student project. Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is for educational purposes.

---

## 🙏 Acknowledgments

- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide](https://lucide.dev/)
- **Images:** [Unsplash](https://unsplash.com/)
- **Audio Player:** [Howler.js](https://howlerjs.com/)

---

## 📞 Contact

For questions or support, please open an issue in the repository.

---

**Built with ❤️ for indie artists and music lovers**
