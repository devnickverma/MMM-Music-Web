# Playlist Modals

This directory contains three modal components for playlist management functionality.

## Components

### 1. CreatePlaylistModal

Modal for creating a new playlist.

**Features:**
- Playlist name input (required)
- Description textarea (optional)
- Drag & drop cover image upload
- Public/private toggle switch

**Usage:**
```tsx
import { CreatePlaylistModal } from '@/components/modals'

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Create Playlist</button>
      <CreatePlaylistModal
        open={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  )
}
```

---

### 2. EditPlaylistModal

Modal for editing an existing playlist with delete option.

**Features:**
- Pre-filled form fields with existing playlist data
- All create modal features
- Delete playlist button (red, destructive)
- Confirmation dialog for deletion

**Usage:**
```tsx
import { EditPlaylistModal } from '@/components/modals'

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false)
  const playlist = {
    id: '1',
    name: 'My Playlist',
    description: 'Description here',
    cover_image_url: 'https://...',
    is_public: true,
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Edit Playlist</button>
      <EditPlaylistModal
        open={isOpen}
        onOpenChange={setIsOpen}
        playlist={playlist}
      />
    </>
  )
}
```

---

### 3. AddToPlaylistModal

Modal for adding a song to one or more playlists.

**Features:**
- Search/filter playlists
- Checkbox selection for multiple playlists
- Visual indication of playlists that already contain the song
- "Create New Playlist" quick action button
- Playlist covers with song counts

**Usage:**
```tsx
import { AddToPlaylistModal } from '@/components/modals'
import { CreatePlaylistModal } from '@/components/modals'

function MyComponent() {
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [createModalOpen, setCreateModalOpen] = useState(false)

  return (
    <>
      <button onClick={() => setAddModalOpen(true)}>Add to Playlist</button>
      
      <AddToPlaylistModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        songId="123"
        songTitle="My Awesome Song"
        onCreateNew={() => setCreateModalOpen(true)}
      />

      <CreatePlaylistModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
    </>
  )
}
```

---

## Where to Integrate

### Suggested Integration Points:

1. **Library Page** (`app/(main)/library/page.tsx`)
   - Add "Create Playlist" button → `CreatePlaylistModal`
   - Add playlist cards with edit icon → `EditPlaylistModal`

2. **Song Cards** (`components/song/SongCard.tsx`)
   - Add "Add to Playlist" option to song menu → `AddToPlaylistModal`

3. **Song Row** (`components/song/SongRow.tsx`)
   - Add "Add to Playlist" option to row menu → `AddToPlaylistModal`

4. **Song Detail Page** (`app/(main)/song/[id]/page.tsx`)
   - Add "Add to Playlist" button → `AddToPlaylistModal`

5. **Playlist Detail Page** (`app/(main)/playlist/[id]/page.tsx`)
   - Add "Edit Playlist" button in header → `EditPlaylistModal`

6. **Music Player** (`components/layout/MusicPlayerBar.tsx`)
   - Add "Add to Playlist" option for current song → `AddToPlaylistModal`

---

## Dependencies

All modals use the following components:
- `@/components/ui/dialog` (shadcn/ui Dialog)
- `@/components/ui/button`
- `@/components/ui/input`
- `@/components/ui/textarea`
- `@/components/ui/switch`
- `@/components/ui/checkbox` (AddToPlaylistModal only)
- `@/components/ui/scroll-area` (AddToPlaylistModal only)

**Required Radix UI packages:**
- `@radix-ui/react-dialog` ✅ (already installed)
- `@radix-ui/react-switch` ✅ (already installed)
- `@radix-ui/react-checkbox` ✅ (just installed)

---

## Styling

All modals:
- Use clean white theme matching the app
- Responsive with `sm:max-w-[500px]` or `sm:max-w-[425px]`
- Centered on screen
- Smooth animations with shadcn/ui defaults
- Purple primary color accents

---

## Future Enhancements

- [ ] Add toast notifications on success/error
- [ ] Add loading states for async operations
- [ ] Connect to backend API for real playlist CRUD
- [ ] Add image preview in upload area
- [ ] Add playlist sorting options in AddToPlaylistModal
- [ ] Add keyboard shortcuts (Esc to close, Enter to submit)
