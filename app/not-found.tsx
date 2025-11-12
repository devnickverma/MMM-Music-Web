import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Music2 } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Decorative Background */}
        <div className="relative">
          {/* Large 404 Text */}
          <div className="relative">
            <h1 className="text-[150px] font-bold text-primary/10 leading-none select-none">
              404
            </h1>
            {/* Floating Music Icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Music2 className="h-10 w-10 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Page Not Found</h2>
          <p className="text-muted-foreground text-lg">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/home">
            <Button size="lg" className="gap-2 w-full sm:w-auto">
              <Home className="h-5 w-5" />
              Go to Home
            </Button>
          </Link>
          <Link href="/search">
            <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
              <Music2 className="h-5 w-5" />
              Browse Music
            </Button>
          </Link>
        </div>

        {/* Helpful Suggestions */}
        <div className="pt-8 border-t">
          <p className="text-sm text-muted-foreground mb-3">You might be looking for:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/home">
              <Button variant="ghost" size="sm">Home</Button>
            </Link>
            <Link href="/library">
              <Button variant="ghost" size="sm">Library</Button>
            </Link>
            <Link href="/search">
              <Button variant="ghost" size="sm">Search</Button>
            </Link>
            <Link href="/messages">
              <Button variant="ghost" size="sm">Messages</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
