import { AdminQuizQuestion, CreateQuestionRequest, GrammarType } from '../types/admin';

// Mock data for grammar types
const mockGrammarTypes: GrammarType[] = [
  { id: '1', name: 'Present Simple Positive', category: 'Present Tenses' },
  { id: '2', name: 'Present Simple Negative', category: 'Present Tenses' },
  { id: '3', name: 'Present Simple Questions', category: 'Present Tenses' },
  { id: '4', name: 'Present Continuous Positive', category: 'Present Tenses' },
  { id: '5', name: 'Present Continuous Negative', category: 'Present Tenses' },
  { id: '6', name: 'Present Continuous Questions', category: 'Present Tenses' },
  { id: '7', name: 'Past Simple Positive', category: 'Past Tenses' },
  { id: '8', name: 'Past Simple Negative', category: 'Past Tenses' },
  { id: '9', name: 'Past Simple Questions', category: 'Past Tenses' },
  { id: '10', name: 'Past Continuous Positive', category: 'Past Tenses' },
  { id: '11', name: 'First Conditional', category: 'Conditionals' },
  { id: '12', name: 'Second Conditional', category: 'Conditionals' },
  { id: '13', name: 'Third Conditional', category: 'Conditionals' },
  { id: '14', name: 'Zero Conditional', category: 'Conditionals' },
  { id: '15', name: 'Present Perfect Positive', category: 'Perfect Tenses' },
  { id: '16', name: 'Present Perfect Negative', category: 'Perfect Tenses' },
  { id: '17', name: 'Modal Verbs - Can/Could', category: 'Modal Verbs' },
  { id: '18', name: 'Modal Verbs - Should/Must', category: 'Modal Verbs' },
  { id: '19', name: 'Passive Voice Present', category: 'Passive Voice' },
  { id: '20', name: 'Passive Voice Past', category: 'Passive Voice' },
];

// Mock data for questions
let mockQuestions: AdminQuizQuestion[] = [
  {
    id: '1',
    question: 'She _____ to work every day.',
    options: ['go', 'goes', 'going', 'gone'],
    correctAnswer: 1,
    explanation: {
      en: 'We use "goes" because "she" is third person singular and requires the -s ending in present simple.',
      vi: 'Chúng ta dùng "goes" vì "she" là ngôi thứ ba số ít và cần thêm -s trong thì hiện tại đơn.'
    },
    level: 'A1',
    grammarType: mockGrammarTypes[0],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    question: 'They _____ watching TV right now.',
    options: ['is', 'are', 'am', 'be'],
    correctAnswer: 1,
    explanation: {
      en: 'We use "are" with "they" in present continuous tense.',
      vi: 'Chúng ta dùng "are" với "they" trong thì hiện tại tiếp diễn.'
    },
    level: 'A2',
    grammarType: mockGrammarTypes[3],
    createdAt: '2024-01-15T11:00:00Z',
    updatedAt: '2024-01-15T11:00:00Z'
  }
];

export class AdminApiService {
  // Simulate API delay
  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static async getQuestions(level?: string, grammarTypeId?: string): Promise<AdminQuizQuestion[]> {
    await this.delay(500);
    
    let filtered = [...mockQuestions];
    
    if (level && level !== 'all') {
      filtered = filtered.filter(q => q.level === level);
    }
    
    if (grammarTypeId && grammarTypeId !== 'all') {
      filtered = filtered.filter(q => q.grammarType.id === grammarTypeId);
    }
    
    return filtered;
  }

  static async getGrammarTypes(): Promise<GrammarType[]> {
    await this.delay(200);
    return [...mockGrammarTypes];
  }

  static async createQuestion(data: CreateQuestionRequest): Promise<AdminQuizQuestion> {
    await this.delay(800);
    
    const grammarType = mockGrammarTypes.find(gt => gt.id === data.grammarTypeId);
    if (!grammarType) {
      throw new Error('Grammar type not found');
    }

    const newQuestion: AdminQuizQuestion = {
      id: Date.now().toString(),
      ...data,
      grammarType,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mockQuestions.push(newQuestion);
    return newQuestion;
  }

  static async updateQuestion(id: string, data: Partial<CreateQuestionRequest>): Promise<AdminQuizQuestion> {
    await this.delay(800);
    
    const index = mockQuestions.findIndex(q => q.id === id);
    if (index === -1) {
      throw new Error('Question not found');
    }

    const grammarType = data.grammarTypeId 
      ? mockGrammarTypes.find(gt => gt.id === data.grammarTypeId)
      : mockQuestions[index].grammarType;

    if (data.grammarTypeId && !grammarType) {
      throw new Error('Grammar type not found');
    }

    mockQuestions[index] = {
      ...mockQuestions[index],
      ...data,
      grammarType: grammarType!,
      updatedAt: new Date().toISOString()
    };

    return mockQuestions[index];
  }

  static async deleteQuestion(id: string): Promise<void> {
    await this.delay(500);
    
    const index = mockQuestions.findIndex(q => q.id === id);
    if (index === -1) {
      throw new Error('Question not found');
    }

    mockQuestions.splice(index, 1);
  }
}