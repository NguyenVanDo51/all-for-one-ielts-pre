export interface MultilingualText {
  vi: string;
  en: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: MultilingualText;
}

export type DifficultyLevel = 'Auto' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface QuizState {
  currentQuestion: QuizQuestion | null;
  selectedAnswer: number | null;
  showResult: boolean;
  loading: boolean;
  error: string | null;
  difficultyLevel: DifficultyLevel;
  actualLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'; // The actual level being used when Auto is selected
}

export type Language = 'vi' | 'en';