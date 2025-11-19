'use client'

import { useState } from 'react'
import { Search, Settings, User, BarChart3, LogOut, ChevronDown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { NotificationDropdown } from './NotificationDropdown'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function Header() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  // TODO: Replace with actual user data from auth context/session
  const mockUser = {
    username: 'musiclover',
    fullName: 'Music Lover',
    email: 'music@example.com',
    avatar: 'https://i.pravatar.cc/150?u=musiclover',
    isArtist: false, // TODO: Get from user.role === 'artist'
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    } else {
      router.push('/search')
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mr-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/60">
            <span className="text-xl font-bold text-primary-foreground">MMM</span>
          </div>
          <span className="hidden md:block text-xl font-semibold">
            Mind Your Own Music
          </span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search songs, artists, playlists..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => router.push('/search')}
            />
          </div>
        </form>

        {/* Right Section */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Notifications */}
          <NotificationDropdown />

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="gap-2 px-2"
                aria-label="User menu"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={mockUser.avatar} alt={mockUser.username} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {mockUser.fullName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:block text-sm font-medium">
                  {mockUser.fullName}
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{mockUser.fullName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    @{mockUser.username}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/profile/${mockUser.username}`} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>View Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              {/* Conditional Artist Dashboard Link */}
              {mockUser.isArtist && (
                <DropdownMenuItem asChild>
                  <Link href="/artist-dashboard" className="cursor-pointer">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    <span>Artist Dashboard</span>
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                onClick={() => {
                  // TODO: Implement actual logout with Better-Auth
                  // Example: await signOut({ callbackUrl: '/login' })
                  router.push('/login')
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
