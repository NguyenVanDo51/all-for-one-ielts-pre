import { supabase } from '../lib/supabase';
import { QuizQuestion, DifficultyLevel } from '../types/quiz';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent';

export class GeminiApiService {
  private static async makeRequest(prompt: string): Promise<string> {
    if (!GEMINI_API_KEY) {
      throw new Error('Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your environment variables.');
    }

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response from Gemini API');
    }

    return data.candidates[0].content.parts[0].text;
  }

  static async generateQuizQuestion(level: DifficultyLevel): Promise<QuizQuestion> {
const { data, error } = await supabase
  .rpc('get_random_quiz_question', { question_level: level })
    console.log("data", data)
    
if (data && data.length > 0) {
  return {
    ...data[0],
    correctAnswer: data[0].correct_answer,
    explanation: {
      vi: data[0].explanation_vi,
      en: data[0].explanation_en,
    },
  }
}
  }
}