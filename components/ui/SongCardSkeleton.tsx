import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function SongCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Cover Image Skeleton */}
      <Skeleton className="aspect-square w-full" />
      
      {/* Text Content Skeleton */}
      <div className="p-3 space-y-2">
        {/* Title */}
        <Skeleton className="h-4 w-3/4" />
        {/* Artist */}
        <Skeleton className="h-3 w-1/2" />
      </div>
    </Card>
  )
}
