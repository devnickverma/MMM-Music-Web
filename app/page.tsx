'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { LandingHeader } from '@/components/layout/LandingHeader'
import { Music, Users, Radio, MessageCircle, Heart, Sparkles, Play, TrendingUp, Globe } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <LandingHeader />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="container mx-auto px-6 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Discover Independent Music</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Mind Your Own Music
              </h1>
              
              <p className="text-xl text-muted-foreground">
                Connect directly with indie artists, discover unique sounds, and experience music like never before. 
                Message your favorite musicians and attend exclusive virtual concerts.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/signup">
                  <Button size="lg" className="text-lg h-14 px-8">
                    <Play className="h-5 w-5 mr-2" fill="currentColor" />
                    Start Listening Free
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="text-lg h-14 px-8">
                    Log In
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>10K+ Artists</span>
                </div>
                <div className="flex items-center gap-2">
                  <Music className="h-4 w-4" />
                  <span>50K+ Songs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Radio className="h-4 w-4" />
                  <span>Live Concerts</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6 space-y-3 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Music className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">Stream Music</h3>
                  <p className="text-sm text-muted-foreground">
                    Unlimited access to indie tracks
                  </p>
                </Card>
                
                <Card className="p-6 space-y-3 hover:shadow-lg transition-shadow mt-8">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">Direct Messages</h3>
                  <p className="text-sm text-muted-foreground">
                    Chat with your favorite artists
                  </p>
                </Card>
                
                <Card className="p-6 space-y-3 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Radio className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">Virtual Concerts</h3>
                  <p className="text-sm text-muted-foreground">
                    Attend live performances online
                  </p>
                </Card>
                
                <Card className="p-6 space-y-3 hover:shadow-lg transition-shadow mt-8">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">Support Artists</h3>
                  <p className="text-sm text-muted-foreground">
                    Help indie musicians grow
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Why Choose MMM?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're not just another music platform. We're building a community where artists and fans connect directly.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 space-y-4 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Discover Indie Artists</h3>
              <p className="text-muted-foreground">
                Find hidden gems from independent musicians around the world. Support emerging talent before they hit mainstream.
              </p>
            </Card>
            
            <Card className="p-8 space-y-4 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Direct Artist Connection</h3>
              <p className="text-muted-foreground">
                Message artists directly, get personalized recommendations, and build real relationships with the musicians you love.
              </p>
            </Card>
            
            <Card className="p-8 space-y-4 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <Radio className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Virtual Concert Hall</h3>
              <p className="text-muted-foreground">
                Attend exclusive live concerts from anywhere. Interactive experiences that bring artists and fans together.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto border-4 border-primary/20">
                <span className="text-3xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold">Sign Up Free</h3>
              <p className="text-muted-foreground">
                Create your account in seconds. No credit card required.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto border-4 border-primary/20">
                <span className="text-3xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-bold">Explore Music</h3>
              <p className="text-muted-foreground">
                Browse thousands of indie tracks and discover your new favorite artist.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto border-4 border-primary/20">
                <span className="text-3xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-bold">Connect & Enjoy</h3>
              <p className="text-muted-foreground">
                Message artists, attend concerts, and be part of the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/90 to-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Discover New Music?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of music lovers supporting independent artists. Start your journey today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="text-lg h-14 px-8">
                <Play className="h-5 w-5 mr-2" fill="currentColor" />
                Get Started Free
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg h-14 px-8 bg-white/10 border-white hover:bg-white/20 text-white">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/60">
                <span className="text-xl font-bold text-primary-foreground">MMM</span>
              </div>
              <span className="font-semibold">Mind Your Own Music</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 MMM. Supporting independent artists worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
