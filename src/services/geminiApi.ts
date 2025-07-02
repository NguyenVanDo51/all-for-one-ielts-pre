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
    const levelDescriptions = {
      A1: 'beginner level (basic present tense, simple vocabulary, basic sentence structure)',
      A2: 'elementary level (past tense, future tense, basic adjectives and adverbs)',
      B1: 'intermediate level (present perfect, conditionals, passive voice, complex sentences)',
      B2: 'upper-intermediate level (advanced tenses, subjunctive mood, complex grammar structures)',
      C1: 'advanced level (sophisticated grammar, nuanced language use, complex syntax)',
      C2: 'proficiency level (native-like grammar mastery, subtle distinctions, advanced linguistic concepts)'
    };

    const prompt = `Generate a random English grammar quiz question at ${level} ${levelDescriptions[level]} with both Vietnamese and English versions. The question should test grammar concepts appropriate for ${level} level learners.

Format your response as a JSON object with exactly this structure:
{
  "question": "The grammar question here by English",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": 0,
  "explanation": {
    "vi": "A clear explanation of why the correct answer is right and what grammar rule it demonstrates by vietnamese",
    "en": "A clear explanation of why the correct answer is right and what grammar rule it demonstrates by english"
  }
}

Requirements:
- Focus specifically on ${level} level grammar concepts
- Provide both Vietnamese and English versions of the question and explanation
- Make the question clear and educational in both languages
- Provide exactly 4 multiple choice options (these can be in English as they are grammar examples)
- The correctAnswer should be the index (0-3) of the correct option
- Include detailed explanations in both languages that teach the grammar rule
- Ensure the difficulty matches ${level} level expectations
- Ensure Vietnamese translations are accurate and natural

Return only the JSON object, no additional text.`;

    try {
      const response = await this.makeRequest(prompt);
      
      // Clean the response to extract JSON
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response');
      }
      
      const cleanJson = jsonMatch[0];
      const parsed = JSON.parse(cleanJson);
      
      // Validate the response structure
      if (!parsed.question || !Array.isArray(parsed.options) || parsed.options.length !== 4 || 
          typeof parsed.correctAnswer !== 'number' || parsed.correctAnswer < 0 || 
          parsed.correctAnswer > 3 || !parsed.explanation || 
          !parsed.explanation.vi || !parsed.explanation.en) {
        throw new Error('Invalid question format received from API');
      }
      
      return parsed as QuizQuestion;
    } catch (error) {
      console.error('Error generating quiz question:', error);
      throw new Error('Failed to generate quiz question. Please try again.');
    }
  }
}