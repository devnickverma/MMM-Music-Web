export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          is_artist: boolean
          created_at: string
        }
        Insert: {
          id: string
          username: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          is_artist?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          is_artist?: boolean
          created_at?: string
        }
      }
      artists: {
        Row: {
          id: string
          profile_id: string
          artist_name: string
          verified: boolean
          total_streams: number
          total_loves: number
          created_at: string
        }
      }
      songs: {
        Row: {
          id: string
          artist_id: string
          title: string
          genre: string | null
          mood: string | null
          duration: number
          audio_url: string
          cover_image_url: string | null
          plays_count: number
          love_count: number
          love_percentage: number
          is_public: boolean
          created_at: string
        }
      }
      playlists: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          cover_image_url: string | null
          is_public: boolean
          created_at: string
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          content: string
          read: boolean
          created_at: string
        }
      }
      concerts: {
        Row: {
          id: string
          artist_id: string
          title: string
          description: string | null
          scheduled_at: string
          duration_minutes: number
          stream_url: string | null
          ticket_price: number
          status: string
          created_at: string
        }
      }
    }
  }
}
