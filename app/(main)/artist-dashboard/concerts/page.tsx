'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ScheduleConcertModal } from '@/components/concert/ScheduleConcertModal'
import { Calendar, Users, MoreVertical, Edit, Trash2, BarChart3, Play, Clock, DollarSign } from 'lucide-react'
import { mockConcerts } from '@/lib/mock-data'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

interface Concert {
  id: string
  title: string
  description?: string
  date: string
  time?: string
  duration: number
  coverImage: string | null
  status: 'upcoming' | 'live' | 'past'
  attendeeCount: number
  ticketPrice?: number
  isFree?: boolean
}

export default function ArtistConcertsPage() {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)
  const [concerts, setConcerts] = useState<Concert[]>([
    {
      id: '1',
      title: 'Midnight Dreams Live Session',
      description: 'Join Luna Wave for an intimate acoustic session',
      date: '2025-01-15',
      time: '20:00',
      duration: 60,
      coverImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop',
      status: 'upcoming',
      attendeeCount: 234,
      isFree: true,
    },
    {
      id: '2',
      title: 'Electric Night Tour',
      description: 'High-energy virtual tour from Neon Pulse',
      date: '2025-01-20',
      time: '19:00',
      duration: 90,
      coverImage: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop',
      status: 'upcoming',
      attendeeCount: 567,
      ticketPrice: 15.99,
      isFree: false,
    },
    {
      id: '3',
      title: 'Acoustic Sunset Session',
      description: 'Beautiful acoustic performance',
      date: '2025-02-01',
      time: '18:00',
      duration: 75,
      coverImage: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=400&h=300&fit=crop',
      status: 'upcoming',
      attendeeCount: 423,
      isFree: true,
    },
    {
      id: '4',
      title: 'Holiday Special Concert',
      description: 'A magical evening of music',
      date: '2024-12-20',
      time: '20:00',
      duration: 120,
      coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop',
      status: 'past',
      attendeeCount: 1245,
      ticketPrice: 25.00,
      isFree: false,
    },
    {
      id: '5',
      title: 'Summer Vibes Live',
      description: 'Feel good summer concert',
      date: '2024-11-15',
      time: '19:30',
      duration: 90,
      coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop',
      status: 'past',
      attendeeCount: 892,
      isFree: true,
    },
  ])

  const upcomingConcerts = concerts.filter(c => c.status === 'upcoming' || c.status === 'live')
  const pastConcerts = concerts.filter(c => c.status === 'past')

  const handleScheduleConcert = (concertData: any) => {
    const newConcert: Concert = {
      ...concertData,
      coverImage: concertData.coverImage || 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop',
    }
    setConcerts([newConcert, ...concerts])
  }

  const handleEdit = (concertId: string) => {
    toast.success('Edit functionality coming soon!')
    console.log('Edit concert:', concertId)
  }

  const handleCancel = (concertId: string) => {
    const concert = concerts.find(c => c.id === concertId)
    if (concert) {
      toast.success(`"${concert.title}" has been cancelled`)
      setConcerts(concerts.filter(c => c.id !== concertId))
    }
  }

  const handleViewAnalytics = (concertId: string) => {
    toast.success('Analytics view coming soon!')
    console.log('View analytics for:', concertId)
  }

  const getStatusBadge = (status: Concert['status']) => {
    switch (status) {
      case 'live':
        return (
          <Badge className="bg-red-500 hover:bg-red-600 gap-1">
            <Play className="h-3 w-3" fill="currentColor" />
            Live
          </Badge>
        )
      case 'upcoming':
        return (
          <Badge variant="secondary" className="gap-1">
            <Clock className="h-3 w-3" />
            Upcoming
          </Badge>
        )
      case 'past':
        return (
          <Badge variant="outline" className="gap-1">
            Completed
          </Badge>
        )
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const ConcertCard = ({ concert }: { concert: Concert }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row">
        {/* Cover Image */}
        <div className="relative w-full md:w-48 h-48 md:h-auto flex-shrink-0">
          {concert.coverImage ? (
            <Image
              src={concert.coverImage}
              alt={concert.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <Calendar className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
          <div className="absolute top-3 right-3">
            {getStatusBadge(concert.status)}
          </div>
        </div>

        {/* Concert Info */}
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold mb-2 truncate">{concert.title}</h3>
              {concert.description && (
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {concert.description}
                </p>
              )}
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{formatDate(concert.date)}</span>
                  {concert.time && (
                    <span className="text-muted-foreground">at {concert.time}</span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{concert.duration} min</span>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{concert.attendeeCount}</span>
                  <span className="text-muted-foreground">RSVPs</span>
                </div>

                {concert.isFree !== undefined && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {concert.isFree ? 'Free' : `$${concert.ticketPrice?.toFixed(2)}`}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {concert.status === 'upcoming' && (
                  <>
                    <DropdownMenuItem onClick={() => handleEdit(concert.id)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleCancel(concert.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Cancel Concert
                    </DropdownMenuItem>
                  </>
                )}
                {concert.status === 'past' && (
                  <DropdownMenuItem onClick={() => handleViewAnalytics(concert.id)}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </Card>
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Concerts</h1>
          <p className="text-muted-foreground mt-1">
            Manage your virtual concerts and events
          </p>
        </div>
        <Button onClick={() => setScheduleModalOpen(true)} size="lg" className="gap-2">
          <Calendar className="h-5 w-5" />
          Schedule New Concert
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upcoming" className="gap-2">
            Upcoming
            <Badge variant="secondary" className="ml-1">
              {upcomingConcerts.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="past" className="gap-2">
            Past
            <Badge variant="secondary" className="ml-1">
              {pastConcerts.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* Upcoming Concerts */}
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingConcerts.length > 0 ? (
            upcomingConcerts.map((concert) => (
              <ConcertCard key={concert.id} concert={concert} />
            ))
          ) : (
            <Card className="p-12">
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">No upcoming concerts</h3>
                  <p className="text-muted-foreground mb-4">
                    Schedule your first concert to connect with your fans
                  </p>
                  <Button onClick={() => setScheduleModalOpen(true)} className="gap-2">
                    <Calendar className="h-4 w-4" />
                    Schedule Concert
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </TabsContent>

        {/* Past Concerts */}
        <TabsContent value="past" className="space-y-4">
          {pastConcerts.length > 0 ? (
            pastConcerts.map((concert) => (
              <ConcertCard key={concert.id} concert={concert} />
            ))
          ) : (
            <Card className="p-12">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">No past concerts</h3>
                <p className="text-muted-foreground">
                  Your completed concerts will appear here
                </p>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Schedule Concert Modal */}
      <ScheduleConcertModal
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
        onSchedule={handleScheduleConcert}
      />
    </div>
  )
}
