'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  User, 
  Lock, 
  Bell, 
  Palette, 
  CreditCard, 
  Upload,
  Check,
  Crown
} from 'lucide-react'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

const tabs = [
  { id: 'account', label: 'Account', icon: User },
  { id: 'privacy', label: 'Privacy', icon: Lock },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'subscription', label: 'Subscription', icon: CreditCard },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account')
  
  // Account state
  const [email, setEmail] = useState('user@example.com')
  const [username, setUsername] = useState('musiclover')
  const [fullName, setFullName] = useState('Alex Rivera')
  const [bio, setBio] = useState('Music enthusiast | Playlist curator | Always discovering new sounds 🎵')

  // Privacy state
  const [isPublic, setIsPublic] = useState(true)
  const [allowDMs, setAllowDMs] = useState(true)
  const [showRecentlyPlayed, setShowRecentlyPlayed] = useState(true)
  const [showLikedSongs, setShowLikedSongs] = useState(true)

  // Notifications state
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [newFollowers, setNewFollowers] = useState(true)
  const [newComments, setNewComments] = useState(false)
  const [concertReminders, setConcertReminders] = useState(true)
  const [newReleases, setNewReleases] = useState(true)

  // Appearance state
  const [theme, setTheme] = useState('light')
  const [language, setLanguage] = useState('en')
  const [fontSize, setFontSize] = useState([14])

  const handleSaveAccount = () => {
    toast.success('Account settings saved!')
  }

  const handleUploadPhoto = () => {
    toast.success('Photo upload coming soon!')
  }

  const handleUpgradePlan = () => {
    toast.success('Upgrade coming soon!')
  }

  // Mock billing history
  const billingHistory = [
    { id: '1', date: 'Dec 1, 2024', amount: '$0.00', status: 'Free', plan: 'Free Plan' },
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    activeTab === tab.id
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <Card className="p-6">
            {/* Account Tab */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Account Settings</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage your account information
                  </p>
                </div>

                <Separator />

                {/* Profile Picture */}
                <div className="space-y-2">
                  <Label>Profile Picture</Label>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="https://i.pravatar.cc/300?img=1" />
                      <AvatarFallback>AR</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" onClick={handleUploadPhoto}>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                </div>

                {/* Username */}
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input
                    id="fullname"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">{bio.length}/150</p>
                </div>

                <Button onClick={handleSaveAccount}>Save Changes</Button>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Privacy Settings</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Control who can see your activity
                  </p>
                </div>

                <Separator />

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Make profile public</Label>
                      <p className="text-sm text-muted-foreground">
                        Anyone can view your profile
                      </p>
                    </div>
                    <Switch checked={isPublic} onCheckedChange={setIsPublic} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow direct messages from anyone</Label>
                      <p className="text-sm text-muted-foreground">
                        Let anyone send you messages
                      </p>
                    </div>
                    <Switch checked={allowDMs} onCheckedChange={setAllowDMs} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show recently played</Label>
                      <p className="text-sm text-muted-foreground">
                        Display your listening history
                      </p>
                    </div>
                    <Switch checked={showRecentlyPlayed} onCheckedChange={setShowRecentlyPlayed} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show liked songs on profile</Label>
                      <p className="text-sm text-muted-foreground">
                        Make your liked songs visible
                      </p>
                    </div>
                    <Switch checked={showLikedSongs} onCheckedChange={setShowLikedSongs} />
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Notification Settings</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Choose what notifications you want to receive
                  </p>
                </div>

                <Separator />

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive updates via email
                      </p>
                    </div>
                    <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>New followers</Label>
                      <p className="text-sm text-muted-foreground">
                        When someone follows you
                      </p>
                    </div>
                    <Switch checked={newFollowers} onCheckedChange={setNewFollowers} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>New comments</Label>
                      <p className="text-sm text-muted-foreground">
                        When someone comments on your activity
                      </p>
                    </div>
                    <Switch checked={newComments} onCheckedChange={setNewComments} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Concert reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Reminders for upcoming concerts
                      </p>
                    </div>
                    <Switch checked={concertReminders} onCheckedChange={setConcertReminders} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>New releases from followed artists</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about new music
                      </p>
                    </div>
                    <Switch checked={newReleases} onCheckedChange={setNewReleases} />
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Appearance Settings</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Customize how the app looks
                  </p>
                </div>

                <Separator />

                {/* Theme */}
                <div className="space-y-3">
                  <Label>Theme</Label>
                  <RadioGroup value={theme} onValueChange={setTheme}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light" className="font-normal cursor-pointer">
                        Light
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark" className="font-normal cursor-pointer">
                        Dark
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Language */}
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Font Size */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Font Size</Label>
                    <span className="text-sm text-muted-foreground">{fontSize[0]}px</span>
                  </div>
                  <Slider
                    value={fontSize}
                    onValueChange={setFontSize}
                    min={12}
                    max={20}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Small</span>
                    <span>Large</span>
                  </div>
                </div>
              </div>
            )}

            {/* Subscription Tab */}
            {activeTab === 'subscription' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Subscription</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage your subscription and billing
                  </p>
                </div>

                <Separator />

                {/* Current Plan */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Current Plan</h3>
                      <p className="text-2xl font-bold text-primary mt-2">Free Plan</p>
                    </div>
                    <Button onClick={handleUpgradePlan}>
                      <Crown className="h-4 w-4 mr-2" />
                      Upgrade to Premium
                    </Button>
                  </div>

                  {/* Features */}
                  <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
                    <p className="font-medium">What you get:</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Unlimited song plays</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Create playlists</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Follow artists</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4" />
                        <span>Ad-free listening (Premium)</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4" />
                        <span>Offline downloads (Premium)</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4" />
                        <span>High quality audio (Premium)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Billing History */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Billing History</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-secondary/50">
                        <tr>
                          <th className="text-left p-3 text-sm font-medium">Date</th>
                          <th className="text-left p-3 text-sm font-medium">Plan</th>
                          <th className="text-left p-3 text-sm font-medium">Amount</th>
                          <th className="text-left p-3 text-sm font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {billingHistory.map((item) => (
                          <tr key={item.id} className="border-t">
                            <td className="p-3 text-sm">{item.date}</td>
                            <td className="p-3 text-sm">{item.plan}</td>
                            <td className="p-3 text-sm">{item.amount}</td>
                            <td className="p-3 text-sm">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary">
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
