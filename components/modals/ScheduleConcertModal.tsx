"use client"

import * as React from "react"
import { Calendar, Clock, DollarSign, Upload, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { mockConcerts } from "@/lib/mock-data"
import type { Concert } from "@/lib/mock-data"
import toast from "react-hot-toast"

interface ScheduleConcertModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ScheduleConcertModal({ open, onOpenChange }: ScheduleConcertModalProps) {
  const [title, setTitle] = React.useState("")
  const [date, setDate] = React.useState("")
  const [time, setTime] = React.useState("")
  const [duration, setDuration] = React.useState("60")
  const [price, setPrice] = React.useState("0")
  const [description, setDescription] = React.useState("")
  const [coverImage, setCoverImage] = React.useState<File | null>(null)
  const [dragActive, setDragActive] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setCoverImage(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0])
    }
  }

  const handleSchedule = () => {
    if (!title || !date || !time) {
      toast.error("Please fill in all required fields")
      return
    }

    const scheduledDate = new Date(`${date}T${time}:00`)
    
    const newConcert: Concert = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      artist_name: "Current Artist", // Mock current artist
      artist_id: "1", // Mock ID
      artist_avatar: "https://i.pravatar.cc/300?img=1",
      cover_image: coverImage 
        ? URL.createObjectURL(coverImage) 
        : "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=400&fit=crop",
      date: scheduledDate.toISOString(),
      duration: parseInt(duration) || 60,
      attendee_count: 0,
      description,
      artist_bio: "This is a bio for the current artist.",
      status: 'upcoming'
    }

    mockConcerts.push(newConcert)
    
    toast.success("Concert scheduled successfully!")
    console.log("Scheduled concert:", newConcert)
    
    onOpenChange(false)
    
    // Reset form
    setTitle("")
    setDate("")
    setTime("")
    setDuration("60")
    setPrice("0")
    setDescription("")
    setCoverImage(null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule Virtual Concert</DialogTitle>
          <DialogDescription>
            Set up your next live performance.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Concert Title <span className="text-red-500">*</span></Label>
            <Input
              id="title"
              placeholder="e.g. Acoustic Night Live"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date <span className="text-red-500">*</span></Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  className="pl-9"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time <span className="text-red-500">*</span></Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="time"
                  type="time"
                  className="pl-9"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Duration & Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                min="15"
                step="15"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Ticket Price ($)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  className="pl-9"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
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

          {/* Cover Image Upload */}
          <div className="space-y-2">
            <Label>Cover Image</Label>
            <div
              className={cn(
                "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors cursor-pointer hover:bg-muted/50",
                dragActive ? "border-primary bg-muted/50" : "border-muted-foreground/25",
                coverImage && "border-primary"
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              {coverImage ? (
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{coverImage.name}</span>
                </div>
              ) : (
                <>
                  <Upload className="h-10 w-10 mb-2 text-muted-foreground" />
                  <p className="text-sm text-center text-muted-foreground">
                    <span className="font-medium text-primary">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSchedule}>
            Schedule Concert
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
