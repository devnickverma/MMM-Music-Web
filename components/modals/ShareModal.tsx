"use client"

import * as React from "react"
import { Copy, Check, Twitter, Facebook, Linkedin, Mail } from "lucide-react"
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
import { Label } from "@/components/ui/label"
import toast from "react-hot-toast"

interface ShareModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type: 'song' | 'playlist' | 'artist' | 'concert'
  title: string
  url?: string
}

export function ShareModal({ 
  open, 
  onOpenChange, 
  type, 
  title, 
  url 
}: ShareModalProps) {
  const [copied, setCopied] = React.useState(false)
  
  // Generate a dummy URL if none provided
  const shareUrl = url || `https://mmm-music.com/${type}/${title.toLowerCase().replace(/\s+/g, '-')}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    toast.success("Link copied to clipboard!")
    
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const handleSocialShare = (platform: string) => {
    toast.success(`Shared to ${platform}!`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share {type.charAt(0).toUpperCase() + type.slice(1)}</DialogTitle>
          <DialogDescription>
            Share "{title}" with your friends and followers.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center space-x-2 py-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={shareUrl}
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3" onClick={handleCopy}>
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">Copy</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          <Button variant="outline" className="flex flex-col gap-1 h-auto py-3" onClick={() => handleSocialShare('Twitter')}>
            <Twitter className="h-5 w-5" />
            <span className="text-xs">Twitter</span>
          </Button>
          <Button variant="outline" className="flex flex-col gap-1 h-auto py-3" onClick={() => handleSocialShare('Facebook')}>
            <Facebook className="h-5 w-5" />
            <span className="text-xs">Facebook</span>
          </Button>
          <Button variant="outline" className="flex flex-col gap-1 h-auto py-3" onClick={() => handleSocialShare('LinkedIn')}>
            <Linkedin className="h-5 w-5" />
            <span className="text-xs">LinkedIn</span>
          </Button>
          <Button variant="outline" className="flex flex-col gap-1 h-auto py-3" onClick={() => handleSocialShare('Email')}>
            <Mail className="h-5 w-5" />
            <span className="text-xs">Email</span>
          </Button>
        </div>
        
        <DialogFooter className="sm:justify-start">
          <div className="text-xs text-muted-foreground">
            Or copy the link above to share anywhere.
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
