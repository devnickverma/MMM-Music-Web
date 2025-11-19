# Queue Drawer Component

A slide-in drawer that displays the current song and upcoming queue, accessible from the music player.

## ✅ Features

### Now Playing Section
- ✅ Current song with large cover art (56px)
- ✅ Song title and artist name
- ✅ Animated "Playing" indicator (3 bouncing bars)
- ✅ Purple accent background with border
- ✅ Song duration display

### Up Next Section  
- ✅ Scrollable list of queued songs
- ✅ Small cover art (40px) for each song
- ✅ Song title, artist, and duration
- ✅ Drag handle icon (visual only - appears on hover)
- ✅ Remove button (X icon) on hover
- ✅ Song count badge

### Footer Actions
- ✅ "Save as Playlist" button (full width)
- ✅ "Clear Queue" button (red text, disabled when queue is empty)
- ✅ Confirmation dialog for clearing queue

### Empty State
- ✅ Music icon in circular background
- ✅ "Queue is empty" message
- ✅ "Add songs to start playing!" subtitle

### Responsive Design
- ✅ Full screen on mobile (w-full)
- ✅ 400px width on desktop (sm:w-[400px])
- ✅ Slides in from right with smooth animation
- ✅ Overlay with backdrop blur

## 🎯 Usage

The QueueDrawer is already integrated into the `MusicPlayerBar` component!

### Access the Queue:
1. Play any song to see the music player bar at the bottom
2. Click the **List icon** (📋) button on the right side of the player
3. The drawer will slide in from the right

### Queue Button Features:
- Shows a badge with the number of songs in queue
- Located next to volume controls (before volume on mobile)
- Always visible when player is active

## 🎨 Visual Features

### Animated Playing Indicator
Three vertical bars that animate up and down in a wave pattern to indicate the current song is playing.

### Hover Effects
- Queue items highlight with muted background on hover
- Drag handle appears on hover (cursor changes to grab)
- Remove button (X) fades in on hover

### Clean Layout
- Matches Spotify-style design
- Clean white theme with purple accents
- Smooth transitions and animations
- Proper spacing and typography

## 🔧 Technical Details

### Components Used
- `Sheet` - shadcn/ui drawer component (slides from right)
- `ScrollArea` - for scrollable queue list
- `Button` - for actions and controls
- Custom `PlayingIndicator` - animated bars

### State Management
Uses Zustand player store:
- `currentSong` - currently playing song
- `queue` - array of upcoming songs
- `removeFromQueue(index)` - remove song from queue
- `clearQueue()` - clear all queued songs

### Animations
- Wave animation for playing indicator using CSS keyframes
- Smooth slide-in/out transitions (300ms out, 500ms in)
- Fade transitions for hover effects
- Backdrop blur overlay

## 📱 Responsive Behavior

**Mobile:**
- Full screen width
- Queue button always visible
- Volume controls hidden (moved to separate mobile controls)

**Desktop (≥640px):**
- Fixed 400px width
- Both queue and volume controls visible
- Drag handle visible on hover

## 🔮 Future Enhancements

- [ ] Add drag-and-drop reordering functionality
- [ ] Connect "Save as Playlist" to CreatePlaylistModal
- [ ] Add song duration total at bottom
- [ ] Add "Play Next" vs "Add to Queue" options
- [ ] Add keyboard shortcuts (Ctrl/Cmd + Q to toggle)
- [ ] Add ability to jump to specific song in queue
- [ ] Show queue history (previously played songs)

## 📝 Files Created

1. `components/ui/sheet.tsx` - Sheet component from shadcn/ui
2. `components/player/QueueDrawer.tsx` - Main queue drawer component
3. `components/layout/MusicPlayerBar.tsx` - Updated with queue button

---

**The Queue Drawer is now live!** 🎉

Start playing a song, then click the list icon in the player to see it in action!
