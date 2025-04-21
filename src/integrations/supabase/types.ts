export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      evaluations: {
        Row: {
          areas_to_improve: string[] | null
          created_at: string
          evaluated_at: string
          expert_id: string
          feedback: string
          id: string
          recommendation: string
          score: number
          sport: string
          strengths: string[] | null
          updated_at: string
          youth_id: string
        }
        Insert: {
          areas_to_improve?: string[] | null
          created_at?: string
          evaluated_at?: string
          expert_id: string
          feedback: string
          id?: string
          recommendation: string
          score: number
          sport: string
          strengths?: string[] | null
          updated_at?: string
          youth_id: string
        }
        Update: {
          areas_to_improve?: string[] | null
          created_at?: string
          evaluated_at?: string
          expert_id?: string
          feedback?: string
          id?: string
          recommendation?: string
          score?: number
          sport?: string
          strengths?: string[] | null
          updated_at?: string
          youth_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "evaluations_expert_id_fkey"
            columns: ["expert_id"]
            isOneToOne: false
            referencedRelation: "experts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evaluations_youth_id_fkey"
            columns: ["youth_id"]
            isOneToOne: false
            referencedRelation: "youth_athletes"
            referencedColumns: ["id"]
          },
        ]
      }
      experts: {
        Row: {
          created_at: string
          id: string
          qualifications: string[] | null
          rating: number | null
          specialization: string
          updated_at: string
          years_experience: number
        }
        Insert: {
          created_at?: string
          id: string
          qualifications?: string[] | null
          rating?: number | null
          specialization: string
          updated_at?: string
          years_experience: number
        }
        Update: {
          created_at?: string
          id?: string
          qualifications?: string[] | null
          rating?: number | null
          specialization?: string
          updated_at?: string
          years_experience?: number
        }
        Relationships: [
          {
            foreignKeyName: "experts_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          first_name: string
          id: string
          last_name: string
          updated_at: string
          user_type: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          first_name: string
          id: string
          last_name: string
          updated_at?: string
          user_type: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string
          updated_at?: string
          user_type?: string
        }
        Relationships: []
      }
      registrations: {
        Row: {
          created_at: string
          id: string
          payment_amount: number
          payment_status: string
          session_id: string | null
          updated_at: string
          youth_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          payment_amount: number
          payment_status: string
          session_id?: string | null
          updated_at?: string
          youth_id: string
        }
        Update: {
          created_at?: string
          id?: string
          payment_amount?: number
          payment_status?: string
          session_id?: string | null
          updated_at?: string
          youth_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "registrations_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "training_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registrations_youth_id_fkey"
            columns: ["youth_id"]
            isOneToOne: false
            referencedRelation: "youth_athletes"
            referencedColumns: ["id"]
          },
        ]
      }
      training_sessions: {
        Row: {
          created_at: string
          current_participants: number | null
          description: string | null
          end_time: string
          expert_id: string | null
          id: string
          max_participants: number
          sport: string
          start_time: string
          updated_at: string
          venue_id: string
        }
        Insert: {
          created_at?: string
          current_participants?: number | null
          description?: string | null
          end_time: string
          expert_id?: string | null
          id?: string
          max_participants: number
          sport: string
          start_time: string
          updated_at?: string
          venue_id: string
        }
        Update: {
          created_at?: string
          current_participants?: number | null
          description?: string | null
          end_time?: string
          expert_id?: string | null
          id?: string
          max_participants?: number
          sport?: string
          start_time?: string
          updated_at?: string
          venue_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_sessions_expert_id_fkey"
            columns: ["expert_id"]
            isOneToOne: false
            referencedRelation: "experts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_sessions_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
      venues: {
        Row: {
          address: string
          capacity: number | null
          city: string
          contact_email: string | null
          contact_phone: string | null
          country: string
          created_at: string
          id: string
          name: string
          sports_supported: string[]
          state: string | null
          updated_at: string
        }
        Insert: {
          address: string
          capacity?: number | null
          city: string
          contact_email?: string | null
          contact_phone?: string | null
          country: string
          created_at?: string
          id?: string
          name: string
          sports_supported: string[]
          state?: string | null
          updated_at?: string
        }
        Update: {
          address?: string
          capacity?: number | null
          city?: string
          contact_email?: string | null
          contact_phone?: string | null
          country?: string
          created_at?: string
          id?: string
          name?: string
          sports_supported?: string[]
          state?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      youth_athletes: {
        Row: {
          achievements: string[] | null
          age: number
          created_at: string
          current_level: string | null
          experience_years: number
          id: string
          primary_sport: string
          updated_at: string
        }
        Insert: {
          achievements?: string[] | null
          age: number
          created_at?: string
          current_level?: string | null
          experience_years?: number
          id: string
          primary_sport: string
          updated_at?: string
        }
        Update: {
          achievements?: string[] | null
          age?: number
          created_at?: string
          current_level?: string | null
          experience_years?: number
          id?: string
          primary_sport?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "youth_athletes_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
