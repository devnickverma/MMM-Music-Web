import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ArtistCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="p-6 flex flex-col items-center text-center space-y-4">
        {/* Circular Profile Picture Skeleton */}
        <Skeleton className="h-24 w-24 rounded-full" />
        
        {/* Name Skeleton */}
        <div className="space-y-2 w-full">
          <Skeleton className="h-5 w-3/4 mx-auto" />
          {/* Follower Count Skeleton */}
          <Skeleton className="h-4 w-1/2 mx-auto" />
        </div>
      </div>
    </Card>
  )
}
