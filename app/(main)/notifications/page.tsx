'use client'

import { EmptyState } from '@/components/ui/EmptyState'
import { Bell } from 'lucide-react'

export default function NotificationsPage() {
  // Mock notifications - set to empty array to demonstrate empty state
  const notifications: any[] = []

  // Toggle to show empty state: const notifications = []

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Notifications</h1>
        <p className="text-muted-foreground mt-1">Stay updated with your music activity</p>
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="You're all caught up!"
          description="No new notifications"
        />
      ) : (
        <div className="space-y-2">
          {/* Future: Render notifications here */}
          {notifications.map((notification) => (
            <div key={notification.id}>
              {/* Notification card */}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
