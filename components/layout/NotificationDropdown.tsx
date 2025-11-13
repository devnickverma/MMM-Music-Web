'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Bell, Heart, MessageCircle, UserPlus, Music, Check } from 'lucide-react'
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
      return <Music className="h-4 w-4 text-primary" />
  }
}

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [open, setOpen] = useState(false)

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

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleMarkAllAsRead}
              className="h-8 text-xs"
            >
              <Check className="h-3 w-3 mr-1" />
              Mark all as read
            </Button>
          )}
        </div>

        {/* Notifications List */}
        {notifications.length > 0 ? (
          <>
            <ScrollArea className="h-[400px]">
              <div className="p-2">
                {notifications.map((notification) => (
                  <button
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification.id)}
                    className={cn(
                      "w-full p-3 rounded-lg hover:bg-secondary transition-colors text-left mb-1",
                      !notification.isRead && "bg-primary/5"
                    )}
                  >
                    <div className="flex gap-3">
                      {/* Avatar with notification icon */}
                      <div className="relative flex-shrink-0">
                        <Avatar className="h-10 w-10">
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
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="p-2 border-t">
              <Link href="/notifications" onClick={() => setOpen(false)}>
                <Button variant="ghost" className="w-full">
                  View All Notifications
                </Button>
              </Link>
            </div>
          </>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
              <Bell className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-1">No notifications yet</h3>
            <p className="text-sm text-muted-foreground text-center">
              When you get notifications, they'll show up here
            </p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
