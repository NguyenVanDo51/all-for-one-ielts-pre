import { AdminQuizQuestion, CreateQuizRequest, UpdateQuizRequest, QuizFilter } from '../types/admin';

// Mock data storage
let mockQuizzes: AdminQuizQuestion[] = [
  {
    id: '1',
    question: 'If I ______ enough money, I ______ a new car.',
    options: ['have, will buy', 'had, would buy', 'have, would buy', 'had, will buy'],
    correctAnswer: 1,
    explanation: {
      en: 'This is a second conditional sentence expressing a hypothetical situation. We use "had" in the if-clause and "would + base verb" in the main clause.',
      vi: 'Đây là câu điều kiện loại 2 diễn tả tình huống giả định. Chúng ta dùng "had" trong mệnh đề if và "would + động từ nguyên mẫu" trong mệnh đề chính.'
    },
    level: 'B1',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    question: 'She ______ to the store yesterday.',
    options: ['go', 'goes', 'went', 'going'],
    correctAnswer: 2,
    explanation: {
      en: 'We use the past simple tense "went" to describe a completed action in the past. "Yesterday" is a clear time indicator for past simple.',
      vi: 'Chúng ta dùng thì quá khứ đơn "went" để mô tả hành động đã hoàn thành trong quá khứ. "Yesterday" là dấu hiệu thời gian rõ ràng cho thì quá khứ đơn.'
    },
    level: 'A1',
    createdAt: '2024-01-14T09:15:00Z',
    updatedAt: '2024-01-14T09:15:00Z'
  },
  {
    id: '3',
    question: 'The report ______ by the team next week.',
    options: ['will complete', 'will be completed', 'completes', 'is completing'],
    correctAnswer: 1,
    explanation: {
      en: 'This sentence requires the future passive voice. "Will be completed" shows that the action will be done to the subject (report) by someone else.',
      vi: 'Câu này cần dùng thể bị động tương lai. "Will be completed" cho thấy hành động sẽ được thực hiện lên chủ ngữ (báo cáo) bởi ai đó khác.'
    },
    level: 'B2',
    createdAt: '2024-01-13T14:20:00Z',
    updatedAt: '2024-01-13T14:20:00Z'
  },
  {
    id: '4',
    question: 'I wish I ______ more time to study.',
    options: ['have', 'had', 'will have', 'would have'],
    correctAnswer: 1,
    explanation: {
      en: 'After "I wish" we use the past simple to express a desire about the present situation. "Had" expresses that we want more time now.',
      vi: 'Sau "I wish" chúng ta dùng thì quá khứ đơn để diễn tả mong muốn về tình huống hiện tại. "Had" thể hiện rằng chúng ta muốn có nhiều thời gian hơn bây giờ.'
    },
    level: 'B2',
    createdAt: '2024-01-12T11:45:00Z',
    updatedAt: '2024-01-12T11:45:00Z'
  },
  {
    id: '5',
    question: 'The book ______ on the table.',
    options: ['is', 'are', 'am', 'be'],
    correctAnswer: 0,
    explanation: {
      en: 'The subject "book" is singular, so we use "is" with the verb "to be" in present simple.',
      vi: 'Chủ ngữ "book" là số ít, nên chúng ta dùng "is" với động từ "to be" ở thì hiện tại đơn.'
    },
    level: 'A1',
    createdAt: '2024-01-11T08:30:00Z',
    updatedAt: '2024-01-11T08:30:00Z'
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class MockAdminApiService {
  static async getAllQuizzes(filter?: QuizFilter): Promise<AdminQuizQuestion[]> {
    await delay(500);
    
    let filteredQuizzes = [...mockQuizzes];
    
    if (filter?.level && filter.level !== 'All') {
      filteredQuizzes = filteredQuizzes.filter(quiz => quiz.level === filter.level);
    }
    
    if (filter?.searchTerm) {
      const searchLower = filter.searchTerm.toLowerCase();
      filteredQuizzes = filteredQuizzes.filter(quiz => 
        quiz.question.toLowerCase().includes(searchLower) ||
        quiz.explanation.en.toLowerCase().includes(searchLower) ||
        quiz.explanation.vi.toLowerCase().includes(searchLower)
      );
    }
    
    return filteredQuizzes.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  static async getQuizById(id: string): Promise<AdminQuizQuestion | null> {
    await delay(300);
    return mockQuizzes.find(quiz => quiz.id === id) || null;
  }

  static async createQuiz(data: CreateQuizRequest): Promise<AdminQuizQuestion> {
    await delay(800);
    
    const newQuiz: AdminQuizQuestion = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockQuizzes.push(newQuiz);
    return newQuiz;
  }

  static async updateQuiz(data: UpdateQuizRequest): Promise<AdminQuizQuestion> {
    await delay(800);
    
    const index = mockQuizzes.findIndex(quiz => quiz.id === data.id);
    if (index === -1) {
      throw new Error('Quiz not found');
    }
    
    const updatedQuiz: AdminQuizQuestion = {
      ...mockQuizzes[index],
      question: data.question,
      options: data.options,
      correctAnswer: data.correctAnswer,
      explanation: data.explanation,
      level: data.level,
      updatedAt: new Date().toISOString()
    };
    
    mockQuizzes[index] = updatedQuiz;
    return updatedQuiz;
  }

  static async deleteQuiz(id: string): Promise<void> {
    await delay(500);
    
    const index = mockQuizzes.findIndex(quiz => quiz.id === id);
    if (index === -1) {
      throw new Error('Quiz not found');
    }
    
    mockQuizzes.splice(index, 1);
  }
}