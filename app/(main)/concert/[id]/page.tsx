import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { mockConcerts } from '@/lib/mock-data'
import { ConcertDetailClient } from './ConcertDetailClient'

export default async function ConcertDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Await params for Next.js 15+
  const { id } = await params
  
  // Find concert (in real app, fetch from API)
  const concert = mockConcerts.find(c => c.id === id) || mockConcerts[0]
  const isPast = concert.status === 'past'

  return (
    <>
      {/* Concert Banner */}
      <div className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
        <Image
          src={concert.cover_image}
          alt={concert.title}
          fill
          className="object-cover"
          priority
        />
        
        {/* Status Badge */}
        {isPast && (
          <div className="absolute top-6 right-6 z-20">
            <Badge variant="secondary" className="bg-black/60 text-white text-sm px-3 py-1">
              Past Concert
            </Badge>
          </div>
        )}
      </div>

      {/* Pass data to client component */}
      <ConcertDetailClient concert={concert} isPast={isPast} />
    </>
  )
}
