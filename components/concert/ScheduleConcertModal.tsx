'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Calendar, Clock, Upload as UploadIcon } from 'lucide-react'
import toast from 'react-hot-toast'

interface ScheduleConcertModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSchedule: (concertData: any) => void
}

export function ScheduleConcertModal({ open, onOpenChange, onSchedule }: ScheduleConcertModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [duration, setDuration] = useState('60')
  const [isFree, setIsFree] = useState(true)
  const [ticketPrice, setTicketPrice] = useState('')
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!title || !date || !time) {
      toast.error('Please fill in all required fields')
      return
    }

    if (!isFree && !ticketPrice) {
      toast.error('Please enter a ticket price or mark as free')
      return
    }

    const concertData = {
      id: Date.now().toString(),
      title,
      description,
      date,
      time,
      duration: parseInt(duration),
      isFree,
      ticketPrice: isFree ? 0 : parseFloat(ticketPrice),
      coverImage: coverImagePreview,
      status: 'upcoming' as const,
      attendeeCount: 0,
    }

    onSchedule(concertData)
    toast.success('Concert scheduled successfully!')

    // Reset form
    setTitle('')
    setDescription('')
    setDate('')
    setTime('')
    setDuration('60')
    setIsFree(true)
    setTicketPrice('')
    setCoverImage(null)
    setCoverImagePreview(null)
    onOpenChange(false)
  }

  const handleCancel = () => {
    onOpenChange(false)
    // Reset form on cancel
    setTitle('')
    setDescription('')
    setDate('')
    setTime('')
    setDuration('60')
    setIsFree(true)
    setTicketPrice('')
    setCoverImage(null)
    setCoverImagePreview(null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule Concert</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Concert Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Concert Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="e.g., Acoustic Live Session"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Tell your fans what to expect..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">
                Date <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  className="pl-10"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">
                Time <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="time"
                  type="time"
                  className="pl-10"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger id="duration">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="90">1.5 hours</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
                <SelectItem value="180">3 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Cover Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="cover-image">Cover Image</Label>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Input
                  id="cover-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Label
                  htmlFor="cover-image"
                  className="flex items-center gap-2 px-4 py-2 border border-input rounded-md cursor-pointer hover:bg-secondary transition-colors"
                >
                  <UploadIcon className="h-4 w-4" />
                  {coverImage ? 'Change Image' : 'Upload Image'}
                </Label>
                {coverImage && (
                  <span className="text-sm text-muted-foreground">{coverImage.name}</span>
                )}
              </div>
              {coverImagePreview && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                  <img
                    src={coverImagePreview}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Ticket Price */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="free-toggle">Free Concert</Label>
                <p className="text-sm text-muted-foreground">
                  Make this concert free for everyone
                </p>
              </div>
              <Switch
                id="free-toggle"
                checked={isFree}
                onCheckedChange={setIsFree}
              />
            </div>

            {!isFree && (
              <div className="space-y-2">
                <Label htmlFor="price">Ticket Price (USD)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className="pl-7"
                    value={ticketPrice}
                    onChange={(e) => setTicketPrice(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Schedule Concert</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
