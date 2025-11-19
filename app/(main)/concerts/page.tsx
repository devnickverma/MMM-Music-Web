'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Users, Bell, Play, Plus } from 'lucide-react'
import { upcomingConcerts, pastConcerts, type Concert } from '@/lib/mock-data'
import { ScheduleConcertModal } from '@/components/modals/ScheduleConcertModal'
import toast from 'react-hot-toast'

export default function ConcertsPage() {
  const [scheduleOpen, setScheduleOpen] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }) + ' at ' + date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const handleNotification = (concertTitle: string) => {
    toast.success(`You'll be notified about "${concertTitle}"`)
  }

  const ConcertCard = ({ concert, isPast = false }: { concert: Concert; isPast?: boolean }) => (
    <Link href={`/concert/${concert.id}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all cursor-pointer">
        {/* Cover Image */}
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <Image
            src={concert.cover_image}
            alt={concert.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />
          {isPast && (
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="bg-black/60 text-white">
                Past
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Artist Info */}
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={concert.artist_avatar} alt={concert.artist_name} />
              <AvatarFallback>{concert.artist_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{concert.artist_name}</span>
          </div>

          {/* Concert Title */}
          <h3 className="font-semibold text-base line-clamp-2 group-hover:text-primary transition-colors">
            {concert.title}
          </h3>

          {/* Date & Time */}
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2">{formatDate(concert.date)}</span>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{concert.duration} {concert.duration === 1 ? 'minute' : 'minutes'}</span>
          </div>

          {/* Attendees */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{concert.attendee_count} {isPast ? 'attended' : 'attending'}</span>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            {isPast ? (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={(e) => {
                  e.preventDefault()
                  toast.success('Concert replay coming soon!')
                }}
              >
                <Play className="h-4 w-4 mr-2" />
                Watch Replay
              </Button>
            ) : (
              <Button 
                className="w-full"
                onClick={(e) => {
                  e.preventDefault()
                  handleNotification(concert.title)
                }}
              >
                <Bell className="h-4 w-4 mr-2" />
                Get Notified
              </Button>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Virtual Concerts</h1>
          <p className="text-muted-foreground mt-1">
            Experience live music from anywhere in the world
          </p>
        </div>
        <Button onClick={() => setScheduleOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Schedule Concert
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

        {/* Upcoming Concerts Tab */}
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingConcerts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {upcomingConcerts.map((concert) => (
                <ConcertCard key={concert.id} concert={concert} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No upcoming concerts</h3>
              <p className="text-muted-foreground">Check back soon for new events!</p>
            </div>
          )}
        </TabsContent>

        {/* Past Concerts Tab */}
        <TabsContent value="past" className="space-y-4">
          {pastConcerts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pastConcerts.map((concert) => (
                <ConcertCard key={concert.id} concert={concert} isPast />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No past concerts</h3>
              <p className="text-muted-foreground">Past concerts will appear here</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <ScheduleConcertModal 
        open={scheduleOpen} 
        onOpenChange={setScheduleOpen} 
      />
    </div>
  )
}
