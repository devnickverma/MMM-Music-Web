'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SongRow } from '@/components/song/SongRow'
import { Upload, TrendingUp, Users, Music, DollarSign, Calendar, Eye, Heart } from 'lucide-react'
import { mockSongs } from '@/lib/mock-data'
import Link from 'next/link'

export default function ArtistDashboard() {
  // Mock data for artist
  const stats = [
    { label: 'Total Streams', value: '1.2M', icon: TrendingUp, change: '+12.5%', color: 'text-green-500' },
    { label: 'Followers', value: '45.3K', icon: Users, change: '+8.2%', color: 'text-blue-500' },
    { label: 'Total Songs', value: '24', icon: Music, change: '+3', color: 'text-purple-500' },
    { label: 'Revenue', value: '$3,420', icon: DollarSign, change: '+15.3%', color: 'text-emerald-500' },
  ]

  const recentSongs = mockSongs.slice(0, 5)

  const upcomingConcerts = [
    { id: '1', title: 'Acoustic Session', date: '2025-01-15', time: '20:00', attendees: 234 },
    { id: '2', title: 'Live Q&A', date: '2025-01-20', time: '19:00', attendees: 156 },
    { id: '3', title: 'Album Launch', date: '2025-02-01', time: '21:00', attendees: 489 },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Artist Dashboard</h1>
          <p className="text-muted-foreground">Manage your music and track performance</p>
        </div>
        <Link href="/artist/upload">
          <Button size="lg" className="gap-2">
            <Upload className="h-5 w-5" />
            Upload New Song
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
                <p className={`text-sm font-medium mt-1 ${stat.color}`}>
                  {stat.change}
                </p>
              </div>
              <div className={`p-3 rounded-lg bg-primary/10`}>
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="songs" className="space-y-6">
        <TabsList>
          <TabsTrigger value="songs">My Songs</TabsTrigger>
          <TabsTrigger value="concerts">Concerts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Songs Tab */}
        <TabsContent value="songs" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Your Music</h2>
              <Link href="/artist/upload">
                <Button variant="outline" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Song
                </Button>
              </Link>
            </div>
            <div className="space-y-1">
              {recentSongs.map((song, index) => (
                <SongRow key={song.id} song={song} queue={recentSongs} index={index} />
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Concerts Tab */}
        <TabsContent value="concerts" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Upcoming Concerts</h2>
              <Button className="gap-2">
                <Calendar className="h-4 w-4" />
                Schedule Concert
              </Button>
            </div>
            <div className="space-y-3">
              {upcomingConcerts.map((concert) => (
                <div
                  key={concert.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{concert.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {concert.date} at {concert.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{concert.attendees} registered</span>
                    </div>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Top Performing Songs</h3>
              <div className="space-y-3">
                {recentSongs.slice(0, 3).map((song, index) => (
                  <div key={song.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-muted-foreground">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium">{song.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {Math.floor(Math.random() * 100000).toLocaleString()} streams
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {Math.floor(Math.random() * 5000).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <Heart className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-sm font-medium">+234 new followers</p>
                    <p className="text-xs text-muted-foreground">Last 7 days</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">45K streams this week</p>
                    <p className="text-xs text-muted-foreground">+15% from last week</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <Music className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">3 new songs uploaded</p>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
