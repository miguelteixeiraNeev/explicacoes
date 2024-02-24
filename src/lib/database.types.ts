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
      Exam: {
        Row: {
          created_at: string
          date: string
          examType_id: number | null
          id: number
          subject_id: number
          trimester_id: number | null
          year_id: number
        }
        Insert: {
          created_at?: string
          date: string
          examType_id?: number | null
          id?: number
          subject_id: number
          trimester_id?: number | null
          year_id: number
        }
        Update: {
          created_at?: string
          date?: string
          examType_id?: number | null
          id?: number
          subject_id?: number
          trimester_id?: number | null
          year_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_Exam_examType_id_fkey"
            columns: ["examType_id"]
            isOneToOne: false
            referencedRelation: "ExamType"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_Exam_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "Subject"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_Exam_trimester_id_fkey"
            columns: ["trimester_id"]
            isOneToOne: false
            referencedRelation: "Trimester"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_Exam_year_id_fkey"
            columns: ["year_id"]
            isOneToOne: false
            referencedRelation: "Year"
            referencedColumns: ["id"]
          }
        ]
      }
      ExamType: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      Grade: {
        Row: {
          created_at: string
          exam_id: number | null
          grade: string | null
          id: number
          student_year_id: number | null
        }
        Insert: {
          created_at?: string
          exam_id?: number | null
          grade?: string | null
          id?: number
          student_year_id?: number | null
        }
        Update: {
          created_at?: string
          exam_id?: number | null
          grade?: string | null
          id?: number
          student_year_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_Grade_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "Exam"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_Grade_student_year_id_fkey"
            columns: ["student_year_id"]
            isOneToOne: false
            referencedRelation: "Student_Year"
            referencedColumns: ["id"]
          }
        ]
      }
      Level: {
        Row: {
          created_at: string
          id: number
          name: string | null
          parent_level: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          parent_level?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          parent_level?: string | null
        }
        Relationships: []
      }
      School: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      Student: {
        Row: {
          avatar: string | null
          birthdate: string | null
          created_at: string
          gender: number | null
          id: number
          name: string | null
        }
        Insert: {
          avatar?: string | null
          birthdate?: string | null
          created_at?: string
          gender?: number | null
          id?: number
          name?: string | null
        }
        Update: {
          avatar?: string | null
          birthdate?: string | null
          created_at?: string
          gender?: number | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      Student_Year: {
        Row: {
          created_at: string
          id: number
          school_id: number | null
          student_id: number | null
          year_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          school_id?: number | null
          student_id?: number | null
          year_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          school_id?: number | null
          student_id?: number | null
          year_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_Student_Year_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "School"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_Student_Year_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "Student"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_Student_Year_year_id_fkey"
            columns: ["year_id"]
            isOneToOne: false
            referencedRelation: "Year"
            referencedColumns: ["id"]
          }
        ]
      }
      Subject: {
        Row: {
          created_at: string
          id: number
          level_id: number | null
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          level_id?: number | null
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          level_id?: number | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_Subject_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "Level"
            referencedColumns: ["id"]
          }
        ]
      }
      Trimester: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      Year: {
        Row: {
          created_at: string
          end: string | null
          id: number
          name: string | null
          start: string | null
        }
        Insert: {
          created_at?: string
          end?: string | null
          id?: number
          name?: string | null
          start?: string | null
        }
        Update: {
          created_at?: string
          end?: string | null
          id?: number
          name?: string | null
          start?: string | null
        }
        Relationships: []
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
