'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { EmptyState } from '@/components/ui/EmptyState'
import { Send, Search, MoreVertical, Music, MessageCircle } from 'lucide-react'

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState('1')
  const [messageInput, setMessageInput] = useState('')

  // Mock conversations - set to empty array to demonstrate empty state
  const conversations = [
    {
      id: '1',
      name: 'Luna Wave',
      lastMessage: 'Thanks for listening to my new track!',
      time: '2m ago',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=100&h=100&fit=crop',
      isArtist: true,
    },
    {
      id: '2',
      name: 'Neon Pulse',
      lastMessage: 'See you at the concert!',
      time: '1h ago',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop',
      isArtist: true,
    },
    {
      id: '3',
      name: 'The Wanderers',
      lastMessage: 'Glad you enjoyed the show',
      time: '3h ago',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
      isArtist: true,
    },
  ]

  // Toggle to show empty state: const conversations = []

  // Mock messages for selected chat
  const messages = [
    {
      id: '1',
      sender: 'Luna Wave',
      text: 'Hey! Thanks for your support!',
      time: '10:30 AM',
      isSelf: false,
    },
    {
      id: '2',
      sender: 'You',
      text: 'Love your new album! When is the next concert?',
      time: '10:32 AM',
      isSelf: true,
    },
    {
      id: '3',
      sender: 'Luna Wave',
      text: "I'm planning a virtual concert next month. I'll keep you posted!",
      time: '10:35 AM',
      isSelf: false,
    },
    {
      id: '4',
      sender: 'You',
      text: "Can't wait! I'll be there for sure 🎵",
      time: '10:36 AM',
      isSelf: true,
    },
    {
      id: '5',
      sender: 'Luna Wave',
      text: 'Thanks for listening to my new track!',
      time: '10:40 AM',
      isSelf: false,
    },
  ]

  const selectedConversation = conversations.find(c => c.id === selectedChat)

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Handle send message (demo only)
      setMessageInput('')
    }
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Conversations List */}
      <div className="w-80 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-xl font-bold mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              className="pl-10"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {conversations.length === 0 ? (
              <div className="flex items-center justify-center h-full py-12">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">Start a conversation with your favorite artists</p>
                  <Button onClick={() => console.log('Find artists clicked')}>Find Artists</Button>
                </div>
              </div>
            ) : (
              conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedChat(conversation.id)}
                className={`w-full p-3 rounded-lg hover:bg-secondary/50 transition-colors mb-1 ${
                  selectedChat === conversation.id ? 'bg-secondary' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-secondary overflow-hidden">
                      <img
                        src={conversation.avatar}
                        alt={conversation.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {conversation.isArtist && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <Music className="h-3 w-3 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm truncate">
                        {conversation.name}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {conversation.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                      {conversation.unread > 0 && (
                        <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground rounded-full text-xs font-medium">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden">
                    <img
                      src={selectedConversation.avatar}
                      alt={selectedConversation.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {selectedConversation.isArtist && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                      <Music className="h-2.5 w-2.5 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{selectedConversation.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {selectedConversation.isArtist ? 'Artist' : 'User'}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isSelf ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.isSelf
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.isSelf
                            ? 'text-primary-foreground/70'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Music className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
