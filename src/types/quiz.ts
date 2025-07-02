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


export enum EnglishLevel {
  Auto = 'Auto',
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
}

export type DifficultyLevel = EnglishLevel;

export interface QuizState {
  currentQuestion: QuizQuestion | null;
  selectedAnswer: number | null;
  showResult: boolean;
  loading: boolean;
  error: string | null;
  difficultyLevel: DifficultyLevel;
  actualLevel: EnglishLevel
}

export type Language = 'vi' | 'en';