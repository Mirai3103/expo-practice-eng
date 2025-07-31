export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      levels: {
        Row: {
          description: string | null
          id: number
          level_order: number | null
          name: string | null
        }
        Insert: {
          description?: string | null
          id?: number
          level_order?: number | null
          name?: string | null
        }
        Update: {
          description?: string | null
          id?: number
          level_order?: number | null
          name?: string | null
        }
        Relationships: []
      }
      parts: {
        Row: {
          id: number
          name: string | null
          skill: string | null
        }
        Insert: {
          id?: number
          name?: string | null
          skill?: string | null
        }
        Update: {
          id?: number
          name?: string | null
          skill?: string | null
        }
        Relationships: []
      }
      question_choices: {
        Row: {
          choice_text: string | null
          id: number
          index: number
          is_correct: boolean
          question_id: number | null
        }
        Insert: {
          choice_text?: string | null
          id?: number
          index?: number
          is_correct?: boolean
          question_id?: number | null
        }
        Update: {
          choice_text?: string | null
          id?: number
          index?: number
          is_correct?: boolean
          question_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "question_choices_question_id_questions_id_fk"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_choices_question_id_questions_id_fk"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "random_questions_view"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          content_audio_url: string | null
          content_image_url: string | null
          content_text: string | null
          difficulty: string | null
          explanation: string | null
          id: number
          is_parent: number
          parent_id: number | null
          part_id: number | null
          source_id: string
          tags: string[]
        }
        Insert: {
          content_audio_url?: string | null
          content_image_url?: string | null
          content_text?: string | null
          difficulty?: string | null
          explanation?: string | null
          id?: number
          is_parent?: number
          parent_id?: number | null
          part_id?: number | null
          source_id: string
          tags?: string[]
        }
        Update: {
          content_audio_url?: string | null
          content_image_url?: string | null
          content_text?: string | null
          difficulty?: string | null
          explanation?: string | null
          id?: number
          is_parent?: number
          parent_id?: number | null
          part_id?: number | null
          source_id?: string
          tags?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "questions_part_id_parts_id_fk"
            columns: ["part_id"]
            isOneToOne: false
            referencedRelation: "parts"
            referencedColumns: ["id"]
          },
        ]
      }
      test_questions: {
        Row: {
          question_id: number | null
          question_order: number | null
          test_id: number | null
        }
        Insert: {
          question_id?: number | null
          question_order?: number | null
          test_id?: number | null
        }
        Update: {
          question_id?: number | null
          question_order?: number | null
          test_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "test_questions_question_id_questions_id_fk"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "test_questions_question_id_questions_id_fk"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "random_questions_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "test_questions_test_id_tests_id_fk"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "tests"
            referencedColumns: ["id"]
          },
        ]
      }
      tests: {
        Row: {
          duration_minutes: number | null
          id: number
          title: string | null
          type: string | null
        }
        Insert: {
          duration_minutes?: number | null
          id?: number
          title?: string | null
          type?: string | null
        }
        Update: {
          duration_minutes?: number | null
          id?: number
          title?: string | null
          type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      random_questions_view: {
        Row: {
          content_audio_url: string | null
          content_image_url: string | null
          content_text: string | null
          explanation: string | null
          id: number | null
          is_parent: number | null
          part_id: number | null
        }
        Insert: {
          content_audio_url?: string | null
          content_image_url?: string | null
          content_text?: string | null
          explanation?: string | null
          id?: number | null
          is_parent?: number | null
          part_id?: number | null
        }
        Update: {
          content_audio_url?: string | null
          content_image_url?: string | null
          content_text?: string | null
          explanation?: string | null
          id?: number | null
          is_parent?: number | null
          part_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_part_id_parts_id_fk"
            columns: ["part_id"]
            isOneToOne: false
            referencedRelation: "parts"
            referencedColumns: ["id"]
          },
        ]
      }
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
