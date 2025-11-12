import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function StatCardSkeleton() {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-3 flex-1">
          {/* Label Skeleton */}
          <Skeleton className="h-4 w-24" />
          {/* Value Skeleton */}
          <Skeleton className="h-8 w-20" />
          {/* Change Skeleton */}
          <Skeleton className="h-4 w-16" />
        </div>
        {/* Icon Skeleton */}
        <Skeleton className="h-12 w-12 rounded-lg" />
      </div>
    </Card>
  )
}
