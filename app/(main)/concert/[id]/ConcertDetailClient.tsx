'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { 
  Calendar, 
  Clock, 
  Users, 
  Share2, 
  Bell, 
  Video, 
  Music,
  Send
} from 'lucide-react'
import type { Concert } from '@/lib/mock-data'
import toast from 'react-hot-toast'

interface ConcertDetailClientProps {
  concert: Concert
  isPast: boolean
}

export function ConcertDetailClient({ concert, isPast }: ConcertDetailClientProps) {
  const [chatMessage, setChatMessage] = useState('')

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

  const handleJoinConcert = () => {
    toast.success('Joining concert...')
  }

  const handleGetNotified = () => {
    toast.success(`You'll be notified about this concert!`)
  }

  const handleShare = () => {
    toast.success('Concert link copied to clipboard!')
  }

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      toast.success('Message sent!')
      setChatMessage('')
    }
  }

  // Mock attendees
  const mockAttendees = [
    { id: '1', name: 'Alex M.', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: '2', name: 'Sarah K.', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: '3', name: 'John D.', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: '4', name: 'Emma L.', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: '5', name: 'Mike R.', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: '6', name: 'Lisa T.', avatar: 'https://i.pravatar.cc/150?img=6' },
    { id: '7', name: 'Tom B.', avatar: 'https://i.pravatar.cc/150?img=7' },
    { id: '8', name: 'Anna S.', avatar: 'https://i.pravatar.cc/150?img=8' },
    { id: '9', name: 'David W.', avatar: 'https://i.pravatar.cc/150?img=9' },
    { id: '10', name: 'Kate P.', avatar: 'https://i.pravatar.cc/150?img=10' },
  ]

  // Mock chat messages
  const mockChatMessages = [
    { id: '1', user: 'Music Fan', message: 'So excited for this! 🎵', time: '2m ago' },
    { id: '2', user: 'Sarah M.', message: 'Can\'t wait to hear the new songs!', time: '5m ago' },
    { id: '3', user: 'Alex K.', message: 'This is going to be amazing!', time: '8m ago' },
    { id: '4', user: 'Emma L.', message: 'Love this artist! ❤️', time: '12m ago' },
  ]

  const remainingAttendees = concert.attendee_count - mockAttendees.length

  return (
    <div className="px-6 space-y-8 max-w-7xl mx-auto pb-8">
      {/* Concert Info Section */}
      <div className="space-y-6">
        {/* Artist Profile */}
        <Link href={`/artist/${concert.artist_id}`}>
          <div className="flex items-center gap-4 group cursor-pointer w-fit">
            <Avatar className="h-16 w-16">
              <AvatarImage src={concert.artist_avatar} alt={concert.artist_name} />
              <AvatarFallback>{concert.artist_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-muted-foreground">Artist</p>
              <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                {concert.artist_name}
              </h2>
            </div>
          </div>
        </Link>

        {/* Concert Title */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{concert.title}</h1>
        </div>

        {/* Concert Metadata */}
        <div className="flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <p className="text-muted-foreground">Date & Time</p>
              <p className="font-medium">{formatDate(concert.date)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <p className="text-muted-foreground">Duration</p>
              <p className="font-medium">{concert.duration} minutes</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <div>
              <p className="text-muted-foreground">{isPast ? 'Attended' : 'Attending'}</p>
              <p className="font-medium">{concert.attendee_count.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          {isPast ? (
            <Button size="lg" className="h-14 px-8" onClick={handleJoinConcert}>
              <Video className="h-5 w-5 mr-2" />
              Watch Replay
            </Button>
          ) : (
            <>
              <Button size="lg" className="h-14 px-8" onClick={handleJoinConcert}>
                <Video className="h-5 w-5 mr-2" />
                Join Concert
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8" onClick={handleGetNotified}>
                <Bell className="h-5 w-5 mr-2" />
                Get Notified
              </Button>
            </>
          )}
          <Button size="lg" variant="outline" className="h-14 w-14" onClick={handleShare}>
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        {/* Attendees */}
        <div className="pt-4">
          <p className="text-sm text-muted-foreground mb-3">
            {isPast ? 'Who attended' : 'Who\'s attending'}
          </p>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {mockAttendees.map((attendee) => (
                <Avatar key={attendee.id} className="h-10 w-10 border-2 border-background">
                  <AvatarImage src={attendee.avatar} alt={attendee.name} />
                  <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            {remainingAttendees > 0 && (
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-secondary text-sm font-medium">
                +{remainingAttendees}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About This Concert */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">About this concert</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {concert.description}
            </p>
          </Card>

          {/* About the Artist */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">About the Artist</h2>
            <div className="flex gap-4 mb-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={concert.artist_avatar} alt={concert.artist_name} />
                <AvatarFallback>{concert.artist_name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{concert.artist_name}</h3>
                <p className="text-sm text-muted-foreground">Musical Artist</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {concert.artist_bio}
            </p>
            <Link href={`/artist/${concert.artist_id}`}>
              <Button variant="outline">
                <Music className="h-4 w-4 mr-2" />
                View Profile
              </Button>
            </Link>
          </Card>
        </div>

        {/* Right Column - Chat Preview */}
        <div className="lg:col-span-1">
          <Card className="p-0 overflow-hidden h-[600px] flex flex-col">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Live Chat</h3>
              <p className="text-xs text-muted-foreground">
                {isPast ? 'Chat is closed for past concerts' : 'Chat opens when concert starts'}
              </p>
            </div>

            {/* Chat Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {mockChatMessages.map((msg) => (
                  <div key={msg.id} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {msg.user.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{msg.user}</span>
                      <span className="text-xs text-muted-foreground">{msg.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground pl-8">{msg.message}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Chat Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder={isPast ? "Chat is closed" : "Type a message..."}
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isPast}
                />
                <Button 
                  size="icon" 
                  onClick={handleSendMessage}
                  disabled={!chatMessage.trim() || isPast}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
