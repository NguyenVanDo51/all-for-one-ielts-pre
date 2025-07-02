import React from 'react';
import { QuizQuestion as QuizQuestionType, Language } from '../types/quiz';

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedAnswer: number | null;
  showResult: boolean;
  language: Language;
  onAnswerSelect: (answerIndex: number) => void;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedAnswer,
  showResult,
  language,
  onAnswerSelect,
}) => {
  const getOptionClassName = (optionIndex: number): string => {
    let className = 'option-button';
    
    if (showResult) {
      className += ' option-disabled';
      
      if (optionIndex === question.correctAnswer) {
        className += ' option-correct';
      } else if (optionIndex === selectedAnswer && optionIndex !== question.correctAnswer) {
        className += ' option-incorrect';
      }
    }
    
    return className;
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="md:text-2xl font-bold text-gray-800 leading-relaxed text-center">
          {question.question}
        </h2>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={getOptionClassName(index)}
            onClick={() => !showResult && onAnswerSelect(index)}
            disabled={showResult}
          >
            <div className="flex items-center justify-center">
              <span className="text-gray-800 font-medium">{option}</span>
            </div>
          </button>
        ))}
      </div>
      
      {showResult && (
        <div className="animate-slide-up bg-blue-50 border border-blue-200 rounded-xl p-6 mt-4 md:mt-8">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {selectedAnswer === question.correctAnswer ? (
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-2">
                {selectedAnswer === question.correctAnswer ? 
                  (language === 'vi' ? 'Đúng!' : 'Correct!') : 
                  (language === 'vi' ? 'Sai' : 'Incorrect')
                }
              </h3>
              <p className="text-gray-700 leading-relaxed">{question.explanation[language]}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};