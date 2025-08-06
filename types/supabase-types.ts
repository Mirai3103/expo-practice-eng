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
          range_from: number | null
          range_to: number | null
        }
        Insert: {
          description?: string | null
          id?: number
          level_order?: number | null
          name?: string | null
          range_from?: number | null
          range_to?: number | null
        }
        Update: {
          description?: string | null
          id?: number
          level_order?: number | null
          name?: string | null
          range_from?: number | null
          range_to?: number | null
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
            foreignKeyName: "hasChild"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hasChild"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "random_questions_view"
            referencedColumns: ["id"]
          },
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
      user_answers: {
        Row: {
          answer_time: string | null
          id: string
          is_correct: boolean
          note: string | null
          question_choice_id: number | null
          question_id: number | null
          user_id: string | null
        }
        Insert: {
          answer_time?: string | null
          id?: string
          is_correct?: boolean
          note?: string | null
          question_choice_id?: number | null
          question_id?: number | null
          user_id?: string | null
        }
        Update: {
          answer_time?: string | null
          id?: string
          is_correct?: boolean
          note?: string | null
          question_choice_id?: number | null
          question_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_answers_question_choice_id_question_choices_id_fk"
            columns: ["question_choice_id"]
            isOneToOne: false
            referencedRelation: "question_choices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_answers_question_id_questions_id_fk"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_answers_question_id_questions_id_fk"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "random_questions_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_answers_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_processes: {
        Row: {
          current_level_id: number | null
          expected_level_id: number | null
          id: string
          part_id: number | null
          percent_completed: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          current_level_id?: number | null
          expected_level_id?: number | null
          id?: string
          part_id?: number | null
          percent_completed?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          current_level_id?: number | null
          expected_level_id?: number | null
          id?: string
          part_id?: number | null
          percent_completed?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_processes_current_level_id_levels_id_fk"
            columns: ["current_level_id"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_processes_expected_level_id_levels_id_fk"
            columns: ["expected_level_id"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_processes_part_id_parts_id_fk"
            columns: ["part_id"]
            isOneToOne: false
            referencedRelation: "parts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_processes_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          current_level: number | null
          expected_level: number | null
          id: string
          last_practice_date: string | null
          streak_count: number
        }
        Insert: {
          current_level?: number | null
          expected_level?: number | null
          id?: string
          last_practice_date?: string | null
          streak_count?: number
        }
        Update: {
          current_level?: number | null
          expected_level?: number | null
          id?: string
          last_practice_date?: string | null
          streak_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_current_level_levels_id_fk"
            columns: ["current_level"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_profiles_expected_level_levels_id_fk"
            columns: ["expected_level"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      random_questions_view: {
        Row: {
          content_audio_url: string | null
          content_image_url: string | null
          content_text: string | null
          difficulty: string | null
          explanation: string | null
          id: number | null
          is_parent: number | null
          parent_id: number | null
          part_id: number | null
          tags: string[] | null
        }
        Insert: {
          content_audio_url?: string | null
          content_image_url?: string | null
          content_text?: string | null
          difficulty?: string | null
          explanation?: string | null
          id?: number | null
          is_parent?: number | null
          parent_id?: number | null
          part_id?: number | null
          tags?: string[] | null
        }
        Update: {
          content_audio_url?: string | null
          content_image_url?: string | null
          content_text?: string | null
          difficulty?: string | null
          explanation?: string | null
          id?: number | null
          is_parent?: number | null
          parent_id?: number | null
          part_id?: number | null
          tags?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "hasChild"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hasChild"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "random_questions_view"
            referencedColumns: ["id"]
          },
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
      get_random_parent_questions: {
        Args: Record<PropertyKey, never> | { part: number; limit_count: number }
        Returns: {
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
        }[]
      }
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
