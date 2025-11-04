'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Upload, Music, Image as ImageIcon, X, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function UploadSongPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    mood: '',
    lyrics: '',
  })
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // DEMO: Frontend only upload simulation
    setTimeout(() => {
      toast.success('Song uploaded successfully! (Demo mode)')
      setIsLoading(false)
      router.push('/artist-dashboard')
    }, 2000)
  }

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file)
    } else {
      toast.error('Please select a valid audio file')
    }
  }

  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setCoverFile(file)
    } else {
      toast.error('Please select a valid image file')
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Upload New Song</h1>
        <p className="text-muted-foreground">Share your music with the world</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Audio File Upload */}
        <Card className="p-6">
          <Label className="text-lg font-semibold mb-4 block">Audio File *</Label>
          {!audioFile ? (
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Music className="h-12 w-12 text-muted-foreground mb-3" />
                <p className="mb-2 text-sm font-medium">
                  Click to upload audio file
                </p>
                <p className="text-xs text-muted-foreground">
                  MP3, WAV, FLAC (MAX. 50MB)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="audio/*"
                onChange={handleAudioFileChange}
                required
                disabled={isLoading}
              />
            </label>
          ) : (
            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-primary/10">
                  <Music className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{audioFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(audioFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setAudioFile(null)}
                disabled={isLoading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </Card>

        {/* Cover Image Upload */}
        <Card className="p-6">
          <Label className="text-lg font-semibold mb-4 block">Cover Image *</Label>
          {!coverFile ? (
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <ImageIcon className="h-12 w-12 text-muted-foreground mb-3" />
                <p className="mb-2 text-sm font-medium">
                  Click to upload cover image
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG (Recommended: 1000x1000px)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleCoverFileChange}
                required
                disabled={isLoading}
              />
            </label>
          ) : (
            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded overflow-hidden">
                  <img
                    src={URL.createObjectURL(coverFile)}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{coverFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(coverFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setCoverFile(null)}
                disabled={isLoading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </Card>

        {/* Song Details */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Song Details</h3>
          
          <div className="space-y-2">
            <Label htmlFor="title">Song Title *</Label>
            <Input
              id="title"
              placeholder="Enter song title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Input
                id="genre"
                placeholder="e.g., Pop, Rock, Jazz"
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mood">Mood</Label>
              <Input
                id="mood"
                placeholder="e.g., Happy, Sad, Energetic"
                value={formData.mood}
                onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lyrics">Lyrics (Optional)</Label>
            <Textarea
              id="lyrics"
              placeholder="Enter song lyrics..."
              rows={8}
              value={formData.lyrics}
              onChange={(e) => setFormData({ ...formData, lyrics: e.target.value })}
              disabled={isLoading}
            />
          </div>
        </Card>

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 gap-2"
            disabled={isLoading || !audioFile || !coverFile}
          >
            {isLoading ? (
              <>Uploading...</>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Upload Song
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
