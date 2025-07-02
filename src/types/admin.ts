export interface GrammarType {
  id: string;
  name: string;
  category: string;
}

export interface AdminQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: {
    vi: string;
    en: string;
  };
  level: string;
  grammarType: GrammarType;
  createdAt: string;
  updatedAt: string;
}

export interface CreateQuestionRequest {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: {
    vi: string;
    en: string;
  };
  level: string;
  grammarTypeId: string;
}