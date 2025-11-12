'use client'

import { EmptyState } from '@/components/ui/EmptyState'
import { Activity } from 'lucide-react'

export default function ActivityPage() {
  // Mock activity feed - set to empty array to demonstrate empty state
  const activities: any[] = []

  // Toggle to show empty state: const activities = []

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Activity Feed</h1>
        <p className="text-muted-foreground mt-1">See what artists you follow are up to</p>
      </div>

      {activities.length === 0 ? (
        <EmptyState
          icon={Activity}
          title="No recent activity"
          description="Follow artists to see their updates here"
          action={{
            label: "Discover Artists",
            onClick: () => console.log('Discover artists clicked')
          }}
        />
      ) : (
        <div className="space-y-4">
          {/* Future: Render activity feed here */}
          {activities.map((activity) => (
            <div key={activity.id}>
              {/* Activity card */}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
