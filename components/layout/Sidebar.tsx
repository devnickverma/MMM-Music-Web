'use client'

import { Home, Search, Library, ListMusic, Mic2, Music, Heart, Clock, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const mainLinks = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Library, label: 'Your Library', href: '/library' },
]

const libraryLinks = [
  { icon: ListMusic, label: 'Playlists', href: '/library/playlists' },
  { icon: Mic2, label: 'Artists', href: '/library/artists' },
  { icon: Music, label: 'Albums', href: '/library/albums' },
  { icon: Heart, label: 'Liked Songs', href: '/library/liked' },
  { icon: Clock, label: 'Recently Played', href: '/library/recent' },
]

// Mock playlists
const playlists = [
  { id: '1', name: 'Chill Vibes', songCount: 45 },
  { id: '2', name: 'Workout Mix', songCount: 32 },
  { id: '3', name: 'Road Trip', songCount: 28 },
  { id: '4', name: 'Focus Flow', songCount: 67 },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <ScrollArea className="flex-1 py-4">
        {/* Main Navigation */}
        <nav className="space-y-1 px-3">
          {mainLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-3',
                    isActive && 'bg-secondary font-medium'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {link.label}
                </Button>
              </Link>
            )
          })}
        </nav>

        <Separator className="my-4" />

        {/* Library Links */}
        <div className="px-3">
          <h3 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Library
          </h3>
          <nav className="space-y-1">
            {libraryLinks.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href
              return (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    className={cn(
                      'w-full justify-start gap-3',
                      isActive && 'bg-secondary font-medium'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Button>
                </Link>
              )
            })}
          </nav>
        </div>

        <Separator className="my-4" />

        {/* Playlists */}
        <div className="px-3">
          <div className="flex items-center justify-between mb-2 px-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Playlists
            </h3>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <nav className="space-y-1">
            {playlists.map((playlist) => (
              <Link key={playlist.id} href={`/playlist/${playlist.id}`}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 h-auto py-2 px-3"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded bg-primary/10 flex-shrink-0">
                    <ListMusic className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex flex-col items-start min-w-0 flex-1">
                    <span className="text-sm font-medium truncate w-full">
                      {playlist.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {playlist.songCount} songs
                    </span>
                  </div>
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </ScrollArea>

      {/* Bottom Section */}
      <div className="p-4 border-t border-border/40">
        <Button className="w-full" variant="default">
          <Plus className="h-4 w-4 mr-2" />
          Create Playlist
        </Button>
      </div>
    </aside>
  )
}
