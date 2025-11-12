import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function PlaylistCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Square Cover Art Skeleton */}
      <Skeleton className="aspect-square w-full" />
      
      {/* Text Content Skeleton */}
      <div className="p-3 space-y-2">
        {/* Playlist Name */}
        <Skeleton className="h-4 w-2/3" />
        {/* Song Count / Metadata */}
        <Skeleton className="h-3 w-1/3" />
      </div>
    </Card>
  )
}
