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
  createdAt: string;
  updatedAt: string;
}

export interface QuizFilter {
  level: string;
  searchTerm: string;
}

export interface CreateQuizRequest {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: {
    vi: string;
    en: string;
  };
  level: string;
}

export interface UpdateQuizRequest extends CreateQuizRequest {
  id: string;
}