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
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      category: {
        Row: {
          label: string
          value: string
        }
        Insert: {
          label: string
          value: string
        }
        Update: {
          label?: string
          value?: string
        }
        Relationships: []
      }
      profile: {
        Row: {
          avatar: string | null
          birthday: string
          date_created: string
          first_name: string
          friends: string[] | null
          last_name: string
          user_id: string
          username: string
        }
        Insert: {
          avatar?: string | null
          birthday: string
          date_created?: string
          first_name?: string
          friends?: string[] | null
          last_name?: string
          user_id?: string
          username?: string
        }
        Update: {
          avatar?: string | null
          birthday?: string
          date_created?: string
          first_name?: string
          friends?: string[] | null
          last_name?: string
          user_id?: string
          username?: string
        }
        Relationships: []
      }
      school: {
        Row: {
          admins: string[]
          default_space: string | null
          name: string | null
          school_id: string
          users: string[]
        }
        Insert: {
          admins: string[]
          default_space?: string | null
          name?: string | null
          school_id: string
          users: string[]
        }
        Update: {
          admins?: string[]
          default_space?: string | null
          name?: string | null
          school_id?: string
          users?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "Schools_default_space_fkey"
            columns: ["default_space"]
            isOneToOne: false
            referencedRelation: "space"
            referencedColumns: ["space_id"]
          },
        ]
      }
      space: {
        Row: {
          allowed_users: string[]
          background: string
          is_public: boolean
          last_opened: string | null
          modules: Database["public"]["Enums"]["module_key"][]
          name: string
          owner_id: string
          school: string | null
          space_id: string
        }
        Insert: {
          allowed_users?: string[]
          background: string
          is_public?: boolean
          last_opened?: string | null
          modules: Database["public"]["Enums"]["module_key"][]
          name: string
          owner_id?: string
          school?: string | null
          space_id?: string
        }
        Update: {
          allowed_users?: string[]
          background?: string
          is_public?: boolean
          last_opened?: string | null
          modules?: Database["public"]["Enums"]["module_key"][]
          name?: string
          owner_id?: string
          school?: string | null
          space_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "space_school_fkey"
            columns: ["school"]
            isOneToOne: false
            referencedRelation: "school"
            referencedColumns: ["school_id"]
          },
          {
            foreignKeyName: "spaces_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
        ]
      }
      tasklist: {
        Row: {
          private_tasks: Database["public"]["CompositeTypes"]["task"][]
          public_tasks: Database["public"]["CompositeTypes"]["task"][]
          space_id: string
          tags: Database["public"]["CompositeTypes"]["tag"][]
          tasks_complete: number
        }
        Insert: {
          private_tasks?: Database["public"]["CompositeTypes"]["task"][]
          public_tasks?: Database["public"]["CompositeTypes"]["task"][]
          space_id: string
          tags: Database["public"]["CompositeTypes"]["tag"][]
          tasks_complete?: number
        }
        Update: {
          private_tasks?: Database["public"]["CompositeTypes"]["task"][]
          public_tasks?: Database["public"]["CompositeTypes"]["task"][]
          space_id?: string
          tags?: Database["public"]["CompositeTypes"]["tag"][]
          tasks_complete?: number
        }
        Relationships: [
          {
            foreignKeyName: "tasklists_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: true
            referencedRelation: "space"
            referencedColumns: ["space_id"]
          },
        ]
      }
      timer: {
        Row: {
          current_timer: number
          last_updated: string
          running: boolean
          space_id: string
          time_remaining: number
          timers: Database["public"]["CompositeTypes"]["timertype"][]
          timers_complete: number
        }
        Insert: {
          current_timer?: number
          last_updated?: string
          running?: boolean
          space_id: string
          time_remaining: number
          timers?: Database["public"]["CompositeTypes"]["timertype"][]
          timers_complete?: number
        }
        Update: {
          current_timer?: number
          last_updated?: string
          running?: boolean
          space_id?: string
          time_remaining?: number
          timers?: Database["public"]["CompositeTypes"]["timertype"][]
          timers_complete?: number
        }
        Relationships: [
          {
            foreignKeyName: "timer_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: true
            referencedRelation: "space"
            referencedColumns: ["space_id"]
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
      module_key: "tasklist" | "timer"
    }
    CompositeTypes: {
      tag: {
        name: string | null
        color: string | null
      }
      task: {
        id: string | null
        name: string | null
        tag: Database["public"]["CompositeTypes"]["tag"] | null
        complete: boolean | null
        start: string | null
        end: string | null
        task: boolean | null
      }
      timertype: {
        name: string | null
        time: number | null
      }
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
    Enums: {
      module_key: ["tasklist", "timer"],
    },
  },
} as const
