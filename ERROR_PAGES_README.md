# Error Pages Documentation

This document describes the custom error pages and error components created for the MMM Music app.

## Overview

All error pages follow a consistent design pattern:
- ✅ Clean white theme matching the app
- ✅ Friendly, non-scary messaging
- ✅ Centered content (vertically and horizontally)
- ✅ Clear action buttons
- ✅ Helpful suggestions for users

---

## Global Error Pages

### 1. 404 Not Found Page (`app/not-found.tsx`)

**When it's used:**
- Automatically shown when a route doesn't exist
- User navigates to an invalid URL

**Features:**
- Large "404" text with floating music icon
- Friendly "Page Not Found" message
- Two primary action buttons:
  - "Go to Home" (primary)
  - "Browse Music" (outline)
- Quick navigation links to common pages

**Example URL that triggers it:**
```
https://yourapp.com/invalid-page
https://yourapp.com/song/nonexistent-id
```

---

### 2. 500 Error Page (`app/error.tsx`)

**When it's used:**
- Automatically shown when an unhandled error occurs
- Server errors, API failures, or React component errors

**Features:**
- Red error icon with pulsing animation
- "Something went wrong" message
- Two action buttons:
  - "Try Again" (calls reset function)
  - "Go to Home" (navigation fallback)
- Shows error message in development mode only
- Logs error to console for debugging

**How Next.js uses it:**
```tsx
// Automatically catches errors in this route segment
export default function Error({ error, reset }) {
  // Handles the error gracefully
}
```

---

## Reusable Error Components

These components can be used within pages when specific content is not found.

### 3. SongNotFound Component (`components/errors/SongNotFound.tsx`)

**When to use:**
- Song ID doesn't exist in database
- Song has been deleted or is unavailable
- API returns 404 for a song

**Usage Example:**

```tsx
'use client'

import { SongNotFound } from '@/components/errors/SongNotFound'
import { mockSongs } from '@/lib/mock-data'

export default function SongDetailPage({ params }: { params: { id: string } }) {
  const song = mockSongs.find(s => s.id === params.id)
  
  // Show error component if song not found
  if (!song) {
    return <SongNotFound />
  }
  
  // Regular song page content
  return (
    <div>
      {/* Song details */}
    </div>
  )
}
```

**Features:**
- Music icon with red cross
- "Song Not Found" message
- "Browse Music" button (primary)
- "Back to Home" button (outline)
- Suggestions: New Releases, Trending, Your Library

---

### 4. ArtistNotFound Component (`components/errors/ArtistNotFound.tsx`)

**When to use:**
- Artist ID doesn't exist in database
- Artist account has been deleted
- API returns 404 for an artist

**Usage Example:**

```tsx
'use client'

import { ArtistNotFound } from '@/components/errors/ArtistNotFound'
import { mockArtists } from '@/lib/mock-data'

export default function ArtistProfilePage({ params }: { params: { id: string } }) {
  const artist = mockArtists.find(a => a.id === params.id)
  
  // Show error component if artist not found
  if (!artist) {
    return <ArtistNotFound />
  }
  
  // Regular artist page content
  return (
    <div>
      {/* Artist details */}
    </div>
  )
}
```

**Features:**
- User/profile icon with red cross
- "Artist Not Found" message
- "Discover Artists" button (primary)
- "Back to Home" button (outline)
- Suggestions: Featured Artists, Browse All, New Releases

---

## Design Specifications

### Colors
- Primary action buttons: Purple (`#8B5CF6`)
- Error indicator: Red (`#EF4444`)
- Background: White
- Text: Gray shades (muted)

### Layout
- All centered vertically and horizontally
- Maximum width: 28rem (448px)
- Responsive padding: 1.5rem (24px)
- Icon sizes: 3-4rem (48-64px)

### Typography
- Main heading: 2xl-3xl font size, bold
- Description: base font size, muted color
- Buttons: base font size, medium weight

---

## Testing Error Pages

### Test 404 Page
```bash
# Navigate to any invalid URL in your browser
http://localhost:3000/this-page-does-not-exist
```

### Test Error Page
```tsx
// Add this to any page temporarily to trigger error
export default function TestErrorPage() {
  throw new Error('Testing error page')
  return <div>Test</div>
}
```

### Test SongNotFound Component
```tsx
// In app/(main)/song/[id]/page.tsx
const song = mockSongs.find(s => s.id === params.id)

if (!song) {
  return <SongNotFound />
}
```

### Test ArtistNotFound Component
```tsx
// In app/(main)/artist/[id]/page.tsx
const artist = mockArtists.find(a => a.id === params.id)

if (!artist) {
  return <ArtistNotFound />
}
```

---

## Best Practices

### 1. User Experience
- ✅ Always provide a way back (Home button)
- ✅ Offer alternative actions (Search, Browse)
- ✅ Use friendly, non-technical language
- ✅ Show helpful suggestions

### 2. Error Handling
```tsx
// Good: Specific error component
if (!song) return <SongNotFound />

// Bad: Generic error message
if (!song) return <div>Error: Song not found</div>
```

### 3. Development vs Production
```tsx
// Error page shows details in development only
{process.env.NODE_ENV === 'development' && (
  <div>{error.message}</div>
)}
```

### 4. Error Logging
```tsx
// Always log errors for debugging
useEffect(() => {
  console.error(error)
  // In production, send to error tracking service
  // e.g., Sentry, LogRocket, etc.
}, [error])
```

---

## Future Enhancements

Potential improvements for error pages:

1. **Animated Illustrations**
   - Add Lottie animations for more engaging visuals
   - Animate the crossed-out icons

2. **Error Tracking**
   - Integrate with Sentry or similar service
   - Track error frequency and patterns

3. **Smart Suggestions**
   - Recommend similar songs/artists based on the attempted URL
   - Show recently viewed or popular items

4. **Search from Error Page**
   - Add inline search bar on error pages
   - Allow users to search without leaving

5. **Custom 503 Page**
   - Maintenance mode page
   - Server overload/downtime messaging

---

## Summary

All error pages are now created and ready to use:

| Page/Component | File Path | Auto-triggered | Manual Use |
|---|---|---|---|
| 404 Not Found | `app/not-found.tsx` | ✅ Yes | ❌ No |
| 500 Error | `app/error.tsx` | ✅ Yes | ❌ No |
| Song Not Found | `components/errors/SongNotFound.tsx` | ❌ No | ✅ Yes |
| Artist Not Found | `components/errors/ArtistNotFound.tsx` | ❌ No | ✅ Yes |

**Questions or need more error components?** Just ask!
