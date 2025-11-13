'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { EmptyState } from '@/components/ui/EmptyState'
import { Bell, Heart, MessageCircle, UserPlus, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

// Mock notifications data
const mockNotifications = [
  {
    id: '1',
    type: 'like',
    user: {
      name: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    content: 'liked your song "Midnight Dreams"',
    time: '2h ago',
    isRead: false,
  },
  {
    id: '2',
    type: 'follow',
    user: {
      name: 'Marcus Johnson',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    content: 'started following you',
    time: '5h ago',
    isRead: false,
  },
  {
    id: '3',
    type: 'comment',
    user: {
      name: 'Emma Wilson',
      avatar: 'https://i.pravatar.cc/150?img=9',
    },
    content: 'commented on your playlist "Chill Vibes"',
    time: '1d ago',
    isRead: true,
  },
  {
    id: '4',
    type: 'like',
    user: {
      name: 'Alex Rivera',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    content: 'liked your playlist "Workout Mix"',
    time: '2d ago',
    isRead: true,
  },
  {
    id: '5',
    type: 'follow',
    user: {
      name: 'Lisa Taylor',
      avatar: 'https://i.pravatar.cc/150?img=20',
    },
    content: 'started following you',
    time: '3d ago',
    isRead: true,
  },
  {
    id: '6',
    type: 'comment',
    user: {
      name: 'John Smith',
      avatar: 'https://i.pravatar.cc/150?img=15',
    },
    content: 'replied to your comment',
    time: '4d ago',
    isRead: true,
  },
  {
    id: '7',
    type: 'like',
    user: {
      name: 'Maria Garcia',
      avatar: 'https://i.pravatar.cc/150?img=25',
    },
    content: 'liked your song "Ocean Waves"',
    time: '5d ago',
    isRead: true,
  },
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'like':
      return <Heart className="h-4 w-4 text-red-500" fill="currentColor" />
    case 'comment':
      return <MessageCircle className="h-4 w-4 text-blue-500" />
    case 'follow':
      return <UserPlus className="h-4 w-4 text-green-500" />
    default:
      return <Bell className="h-4 w-4 text-primary" />
  }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [activeTab, setActiveTab] = useState('all')

  const unreadCount = notifications.filter(n => !n.isRead).length

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })))
    toast.success('All notifications marked as read')
  }

  const handleNotificationClick = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ))
  }

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'all') return true
    if (activeTab === 'likes') return n.type === 'like'
    if (activeTab === 'comments') return n.type === 'comment'
    if (activeTab === 'follows') return n.type === 'follow'
    return true
  })

  const NotificationItem = ({ notification }: { notification: typeof mockNotifications[0] }) => (
    <button
      onClick={() => handleNotificationClick(notification.id)}
      className={cn(
        "w-full p-4 rounded-lg hover:bg-secondary transition-colors text-left",
        !notification.isRead && "bg-primary/5"
      )}
    >
      <div className="flex gap-4">
        {/* Avatar with notification icon */}
        <div className="relative flex-shrink-0">
          <Avatar className="h-12 w-12">
            <AvatarImage src={notification.user.avatar} />
            <AvatarFallback>
              {notification.user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5 border border-background">
            {getNotificationIcon(notification.type)}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm">
            <span className="font-semibold">{notification.user.name}</span>
            {' '}
            <span className="text-muted-foreground">{notification.content}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {notification.time}
          </p>
        </div>

        {/* Unread indicator */}
        {!notification.isRead && (
          <div className="flex-shrink-0 pt-1">
            <div className="w-2 h-2 rounded-full bg-primary" />
          </div>
        )}
      </div>
    </button>
  )

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground mt-1">Stay updated with your music activity</p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={handleMarkAllAsRead}>
            <Check className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
        )}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">
            All
            {unreadCount > 0 && (
              <span className="ml-2 px-1.5 py-0.5 bg-primary text-primary-foreground rounded-full text-xs">
                {unreadCount}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="likes" className="gap-2">
            <Heart className="h-4 w-4" />
            Likes
          </TabsTrigger>
          <TabsTrigger value="comments" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            Comments
          </TabsTrigger>
          <TabsTrigger value="follows" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Follows
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-2 mt-6">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))
          ) : (
            <EmptyState
              icon={Bell}
              title="No notifications"
              description={`You don't have any ${activeTab} notifications yet`}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
