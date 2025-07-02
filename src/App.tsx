import { useState, useEffect } from 'react';
import { QuizState, Language, DifficultyLevel } from './types/quiz';
import { GeminiApiService } from './services/geminiApi';
import { QuizQuestion } from './components/QuizQuestion';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { LanguageToggle } from './components/LanguageToggle';
import { DifficultySelector } from './components/DifficultySelector';

enum EnglishLevel {
  A1, A2, B1,B2,C1,C2 
}

enum QuizLevel = EnglishLevel & {
  Auto,A1, A2, B1,B2,C1,C2 
}

function App() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: null,
    selectedAnswer: null,
    showResult: false,
    loading: false,
    error: null,
    difficultyLevel: 'Auto',
    actualLevel: 'B1',
  });

  const [language, setLanguage] = useState<Language>('en');

  // Helper function to get next level based on performance
  const getNextLevel = (currentLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2', isCorrect: boolean): 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' => {
    const levels: ('A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2')[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const currentIndex = levels.indexOf(currentLevel);
    
    if (isCorrect) {
      // Move up one level if possible
      return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : currentLevel;
    } else {
      // Move down one level if possible
      return currentIndex > 0 ? levels[currentIndex - 1] : currentLevel;
    }
  };

  const loadNewQuestion = async (level?: DifficultyLevel, isCorrect?: boolean) => {
    let targetLevel: DifficultyLevel;
    let actualLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

    if (level) {
      // Manual level change
      targetLevel = level;
      actualLevel = level === 'Auto' ? 'A1' : level as 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
    } else if (quizState.difficultyLevel === 'Auto' && typeof isCorrect === 'boolean') {
      // Auto mode with performance feedback
      targetLevel = 'Auto';
      actualLevel = getNextLevel(quizState.actualLevel, isCorrect);
    } else {
      // Default behavior
      targetLevel = quizState.difficultyLevel;
      actualLevel = quizState.difficultyLevel === 'Auto' ? quizState.actualLevel : quizState.difficultyLevel as 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
    }
    
    setQuizState(prev => ({
      ...prev,
      loading: true,
      error: null,
      selectedAnswer: null,
      showResult: false,
      difficultyLevel: targetLevel,
      actualLevel: actualLevel,
    }));

    try {
      const question = await GeminiApiService.generateQuizQuestion(actualLevel);
      setQuizState(prev => ({
        ...prev,
        currentQuestion: question,
        loading: false,
      }));
    } catch (error) {
      setQuizState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      }));
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setQuizState(prev => ({
      ...prev,
      selectedAnswer: answerIndex,
      showResult: true,
    }));
  };

  const handleNextQuestion = () => {
    if (quizState.difficultyLevel === 'Auto' && quizState.currentQuestion && quizState.selectedAnswer !== null) {
      const isCorrect = quizState.selectedAnswer === quizState.currentQuestion.correctAnswer;
      loadNewQuestion(undefined, isCorrect);
    } else {
      loadNewQuestion();
    }
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const handleDifficultyChange = (newLevel: DifficultyLevel) => {
    loadNewQuestion(newLevel);
  };

  // Load first question on mount
  useEffect(() => {
    loadNewQuestion();
  }, []);

  const getLocalizedText = (key: string) => {
    const texts = {
      title: {
        en: 'English Grammar Quiz',
        vi: 'Bài Kiểm Tra Ngữ Pháp Tiếng Anh'
      },
      subtitle: {
        en: 'Test your grammar skills with AI-powered questions',
        vi: 'Kiểm tra kỹ năng ngữ pháp với câu hỏi được tạo bởi AI'
      },
      difficultyLabel: {
        en: 'Difficulty Level',
        vi: 'Độ Khó'
      },
      languageLabel: {
        en: 'Language',
        vi: 'Ngôn Ngữ'
      },
      nextQuestion: {
        en: 'Next Question',
        vi: 'Câu Hỏi Tiếp Theo'
      },
      loadingText: {
        en: 'Loading new question...',
        vi: 'Đang tải câu hỏi mới...'
      },
      apiKeyTitle: {
        en: 'API Key Required',
        vi: 'Cần API Key'
      },
      apiKeyDescription: {
        en: 'To use this app, you need to add your Gemini API key as an environment variable.',
        vi: 'Để sử dụng ứng dụng này, bạn cần thêm API key Gemini vào biến môi trường.'
      }
    };
    return texts[key as keyof typeof texts]?.[language] || '';
  };

  const getLevelDescription = (level: DifficultyLevel) => {
    const descriptions = {
      Auto: { en: 'Adaptive', vi: 'Tự Động' },
      A1: { en: 'Beginner', vi: 'Cơ Bản' },
      A2: { en: 'Elementary', vi: 'Sơ Cấp' },
      B1: { en: 'Intermediate', vi: 'Trung Cấp' },
      B2: { en: 'Upper-Intermediate', vi: 'Trung Cấp Cao' },
      C1: { en: 'Advanced', vi: 'Nâng Cao' },
      C2: { en: 'Proficiency', vi: 'Thành Thạo' },
    };
    return descriptions[level][language];
  };

  const getCurrentLevelDisplay = () => {
    if (quizState.difficultyLevel === 'Auto') {
      return `Auto (${quizState.actualLevel} - ${getLevelDescription(quizState.actualLevel)})`;
    }
    return `${quizState.difficultyLevel} - ${getLevelDescription(quizState.difficultyLevel)}`;
  };

  return (
    <div className="min-h-screen gradient-bg py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {getLocalizedText('title')}
          </h1>
          <p className="text-xl text-blue-100">
            {getLocalizedText('subtitle')}
          </p>
        </div>

        {/* Main Quiz Card */}
        <div className="bg-white rounded-2xl card-shadow p-4 md:p-12 mb-8">
          {quizState.loading && <LoadingSpinner language={language} />}
          
          {quizState.error && (
            <ErrorMessage 
              message={quizState.error} 
              language={language}
              onRetry={loadNewQuestion}
            />
          )}
          
          {quizState.currentQuestion && !quizState.loading && !quizState.error && (
            <>
              <QuizQuestion
                question={quizState.currentQuestion}
                selectedAnswer={quizState.selectedAnswer}
                showResult={quizState.showResult}
                language={language}
                onAnswerSelect={handleAnswerSelect}
              />
              
              {quizState.showResult && (
                <div className="mt-8 text-center">
                  <button
                    onClick={handleNextQuestion}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
                  >
                    {getLocalizedText('nextQuestion')}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Settings Section - Moved to Bottom */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Difficulty Level */}
            <div className="text-center">
              <p className="text-white font-medium mb-3">{getLocalizedText('difficultyLabel')}</p>
              <div className="text-sm text-blue-100 mb-2">
                {getCurrentLevelDisplay()}
              </div>
              <DifficultySelector
                currentLevel={quizState.difficultyLevel}
                onLevelChange={handleDifficultyChange}
                disabled={quizState.loading}
              />
            </div>

            {/* Language Toggle */}
            <div className="text-center">
              <p className="text-white font-medium mb-3">{getLocalizedText('languageLabel')}</p>
              <div className="flex justify-center">
                <LanguageToggle 
                  currentLanguage={language}
                  onLanguageChange={handleLanguageChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* API Key Notice */}
        {!import.meta.env.VITE_GEMINI_API_KEY && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-yellow-800">{getLocalizedText('apiKeyTitle')}</h3>
                <p className="mt-1 text-sm text-yellow-700">
                  {getLocalizedText('apiKeyDescription')}
                  {' '}
                  <code className="bg-yellow-100 px-1 rounded">.env</code>
                  {' '}
                  <code className="bg-yellow-100 px-1 rounded ml-1">VITE_GEMINI_API_KEY=your_api_key_here</code>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;