"use client"

import * as React from "react"
import { Upload, Image as ImageIcon, Trash2 } from "lucide-react"
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
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

interface Playlist {
  id: string
  name: string
  description?: string
  cover_image_url?: string
  is_public: boolean
}

interface EditPlaylistModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  playlist: Playlist
}

export function EditPlaylistModal({ open, onOpenChange, playlist }: EditPlaylistModalProps) {
  const [playlistName, setPlaylistName] = React.useState(playlist.name)
  const [description, setDescription] = React.useState(playlist.description || "")
  const [isPublic, setIsPublic] = React.useState(playlist.is_public)
  const [coverImage, setCoverImage] = React.useState<File | null>(null)
  const [dragActive, setDragActive] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  // Update form when playlist prop changes
  React.useEffect(() => {
    setPlaylistName(playlist.name)
    setDescription(playlist.description || "")
    setIsPublic(playlist.is_public)
    setCoverImage(null)
  }, [playlist])

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

  const handleSave = () => {
    // Handle playlist update
    console.log("Updating playlist:", { 
      id: playlist.id, 
      playlistName, 
      description, 
      isPublic, 
      coverImage 
    })
    onOpenChange(false)
  }

  const handleDelete = () => {
    // Handle playlist deletion
    if (confirm("Are you sure you want to delete this playlist? This action cannot be undone.")) {
      console.log("Deleting playlist:", playlist.id)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Playlist</DialogTitle>
          <DialogDescription>
            Make changes to your playlist details.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Playlist Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Playlist name <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              placeholder="My Awesome Playlist"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Add an optional description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Cover Image Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Cover image</label>
            <div
              className={cn(
                "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors cursor-pointer hover:bg-muted/50",
                dragActive ? "border-primary bg-muted/50" : "border-muted-foreground/25",
                (coverImage || playlist.cover_image_url) && "border-primary"
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
              ) : playlist.cover_image_url ? (
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Current cover image</span>
                  <span className="text-xs text-muted-foreground">(Click to replace)</span>
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

          {/* Privacy Toggle */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <label htmlFor="public" className="text-sm font-medium">
                Make playlist public
              </label>
              <p className="text-xs text-muted-foreground">
                Anyone can see this playlist
              </p>
            </div>
            <Switch
              id="public"
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            className="sm:mr-auto"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Playlist
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!playlistName.trim()}>
              Save Changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
