'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, RefreshCw, AlertCircle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Error Icon with Animation */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Pulsing Background Circle */}
            <div className="absolute inset-0 w-32 h-32 bg-red-500/10 rounded-full animate-pulse" />
            {/* Error Icon */}
            <div className="relative w-32 h-32 rounded-full bg-red-500/20 flex items-center justify-center">
              <AlertCircle className="h-16 w-16 text-red-500" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Something went wrong</h2>
          <p className="text-muted-foreground text-lg">
            We're working on fixing this issue. Please try again in a moment.
          </p>
        </div>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="bg-secondary/50 border border-border rounded-lg p-4 text-left">
            <p className="text-xs font-mono text-muted-foreground break-all">
              {error.message}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            size="lg" 
            onClick={reset}
            className="gap-2 w-full sm:w-auto"
          >
            <RefreshCw className="h-5 w-5" />
            Try Again
          </Button>
          <Link href="/home">
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-2 w-full sm:w-auto"
            >
              <Home className="h-5 w-5" />
              Go to Home
            </Button>
          </Link>
        </div>

        {/* Help Text */}
        <div className="pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            If this problem persists, please contact support or try refreshing the page.
          </p>
        </div>
      </div>
    </div>
  )
}
