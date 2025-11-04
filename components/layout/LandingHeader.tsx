'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/60">
            <span className="text-xl font-bold text-primary-foreground">MMM</span>
          </div>
          <span className="hidden md:block text-xl font-semibold">
            Mind Your Own Music
          </span>
        </Link>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost">Log In</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
