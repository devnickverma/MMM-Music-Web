import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { User, Search, Compass } from 'lucide-react'

export function ArtistNotFound() {
  return (
    <div className="flex items-center justify-center min-h-[500px] p-6">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Profile Icon Crossed Out */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Background Circle */}
            <div className="w-24 h-24 rounded-full bg-secondary/50 flex items-center justify-center">
              <User className="h-12 w-12 text-muted-foreground" />
            </div>
            {/* Cross Mark */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-28 h-1 bg-red-500 rotate-45 rounded-full" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">Artist Not Found</h2>
          <p className="text-muted-foreground">
            This artist doesn't exist or has deleted their account.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link href="/search">
            <Button className="gap-2 w-full sm:w-auto">
              <Compass className="h-4 w-4" />
              Discover Artists
            </Button>
          </Link>
          <Link href="/home">
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Suggestions */}
        <div className="pt-6 border-t">
          <p className="text-sm text-muted-foreground mb-3">Explore more:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/home">
              <Button variant="ghost" size="sm">Featured Artists</Button>
            </Link>
            <Link href="/search">
              <Button variant="ghost" size="sm">Browse All</Button>
            </Link>
            <Link href="/home">
              <Button variant="ghost" size="sm">New Releases</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
