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
          last_name: string
          user_id: string
          username: string
        }
        Insert: {
          avatar?: string | null
          birthday: string
          date_created?: string
          first_name?: string
          last_name?: string
          user_id?: string
          username?: string
        }
        Update: {
          avatar?: string | null
          birthday?: string
          date_created?: string
          first_name?: string
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
          modules: string[]
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
          modules: string[]
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
          modules?: string[]
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
      [_ in never]: never
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
