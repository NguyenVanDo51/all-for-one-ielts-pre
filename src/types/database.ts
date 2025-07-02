export interface Database {
  public: {
    Tables: {
      grammar_types: {
        Row: {
          id: string;
          name: string;
          name_vi: string;
          category: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          name_vi: string;
          category: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          name_vi?: string;
          category?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      quiz_questions: {
        Row: {
          id: string;
          question: string;
          options: string[];
          correct_answer: number;
          explanation_en: string;
          explanation_vi: string;
          level: string;
          grammar_type_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          question: string;
          options: string[];
          correct_answer: number;
          explanation_en: string;
          explanation_vi: string;
          level: string;
          grammar_type_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          question?: string;
          options?: string[];
          correct_answer?: number;
          explanation_en?: string;
          explanation_vi?: string;
          level?: string;
          grammar_type_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}