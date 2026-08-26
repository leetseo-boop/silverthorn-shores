export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          user_id?: string
        }
        Relationships: []
      }
      booking_clicks: {
        Row: {
          boat_id: string | null
          created_at: string
          cta_location: string
          destination_url: string
          id: string
          referrer: string | null
          source_page: string
          user_agent: string | null
        }
        Insert: {
          boat_id?: string | null
          created_at?: string
          cta_location: string
          destination_url: string
          id?: string
          referrer?: string | null
          source_page: string
          user_agent?: string | null
        }
        Update: {
          boat_id?: string | null
          created_at?: string
          cta_location?: string
          destination_url?: string
          id?: string
          referrer?: string | null
          source_page?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      google_reviews_cache: {
        Row: {
          fetched_at: string
          place_id: string
          rating: number | null
          reviews: Json
          updated_at: string
          user_ratings_total: number | null
        }
        Insert: {
          fetched_at?: string
          place_id: string
          rating?: number | null
          reviews?: Json
          updated_at?: string
          user_ratings_total?: number | null
        }
        Update: {
          fetched_at?: string
          place_id?: string
          rating?: number | null
          reviews?: Json
          updated_at?: string
          user_ratings_total?: number | null
        }
        Relationships: []
      }
      thorn_abuse_events: {
        Row: {
          created_at: string
          id: string
          ip_hash: string
          ip_preview: string | null
          message: string | null
          offense_no: number
          session_id: string | null
          term: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          ip_hash: string
          ip_preview?: string | null
          message?: string | null
          offense_no?: number
          session_id?: string | null
          term?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          ip_hash?: string
          ip_preview?: string | null
          message?: string | null
          offense_no?: number
          session_id?: string | null
          term?: string | null
        }
        Relationships: []
      }
      thorn_banned_ips: {
        Row: {
          banned_at: string
          ip_hash: string
          ip_preview: string | null
          reason: string | null
        }
        Insert: {
          banned_at?: string
          ip_hash: string
          ip_preview?: string | null
          reason?: string | null
        }
        Update: {
          banned_at?: string
          ip_hash?: string
          ip_preview?: string | null
          reason?: string | null
        }
        Relationships: []
      }
      thorn_daily_conditions: {
        Row: {
          day: string
          fetched_at: string
          lake: Json
          weather: Json
        }
        Insert: {
          day: string
          fetched_at?: string
          lake?: Json
          weather?: Json
        }
        Update: {
          day?: string
          fetched_at?: string
          lake?: Json
          weather?: Json
        }
        Relationships: []
      }
      thorn_knowledge_cache: {
        Row: {
          fetched_at: string
          slug: string
          snippet: string
          title: string | null
          url: string
        }
        Insert: {
          fetched_at?: string
          slug: string
          snippet: string
          title?: string | null
          url: string
        }
        Update: {
          fetched_at?: string
          slug?: string
          snippet?: string
          title?: string | null
          url?: string
        }
        Relationships: []
      }
      thorn_learned_facts: {
        Row: {
          answer: string
          approved: boolean
          created_at: string
          hits: number
          id: string
          question: string | null
          source: string | null
          topic: string
          updated_at: string
        }
        Insert: {
          answer: string
          approved?: boolean
          created_at?: string
          hits?: number
          id?: string
          question?: string | null
          source?: string | null
          topic: string
          updated_at?: string
        }
        Update: {
          answer?: string
          approved?: boolean
          created_at?: string
          hits?: number
          id?: string
          question?: string | null
          source?: string | null
          topic?: string
          updated_at?: string
        }
        Relationships: []
      }
      thorn_messages: {
        Row: {
          content: string
          created_at: string
          handoff: boolean
          id: string
          ip_hash: string | null
          ip_preview: string | null
          latency_ms: number | null
          mode: string | null
          model: string | null
          role: string
          session_id: string
          tokens_in: number | null
          tokens_out: number | null
        }
        Insert: {
          content: string
          created_at?: string
          handoff?: boolean
          id?: string
          ip_hash?: string | null
          ip_preview?: string | null
          latency_ms?: number | null
          mode?: string | null
          model?: string | null
          role: string
          session_id: string
          tokens_in?: number | null
          tokens_out?: number | null
        }
        Update: {
          content?: string
          created_at?: string
          handoff?: boolean
          id?: string
          ip_hash?: string | null
          ip_preview?: string | null
          latency_ms?: number | null
          mode?: string | null
          model?: string | null
          role?: string
          session_id?: string
          tokens_in?: number | null
          tokens_out?: number | null
        }
        Relationships: []
      }
      thorn_staff_roster: {
        Row: {
          created_at: string
          display_name: string
          greeting: string
          id: string
          is_active: boolean
          staff_key: string
          tone_notes: string | null
        }
        Insert: {
          created_at?: string
          display_name: string
          greeting: string
          id?: string
          is_active?: boolean
          staff_key: string
          tone_notes?: string | null
        }
        Update: {
          created_at?: string
          display_name?: string
          greeting?: string
          id?: string
          is_active?: boolean
          staff_key?: string
          tone_notes?: string | null
        }
        Relationships: []
      }
      thorn_staff_sessions: {
        Row: {
          display_name: string | null
          last_seen_at: string
          session_id: string
          staff_key: string | null
        }
        Insert: {
          display_name?: string | null
          last_seen_at?: string
          session_id: string
          staff_key?: string | null
        }
        Update: {
          display_name?: string | null
          last_seen_at?: string
          session_id?: string
          staff_key?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
