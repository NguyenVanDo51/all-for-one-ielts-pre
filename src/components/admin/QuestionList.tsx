import React from 'react';
import { AdminQuizQuestion } from '../../types/admin';

interface QuestionListProps {
  questions: AdminQuizQuestion[];
  onEdit: (question: AdminQuizQuestion) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

export const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  onEdit,
  onDelete,
  loading = false
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
        <p className="text-gray-500">Get started by adding your first quiz question.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <div key={question.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {question.question}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                  {question.level}
                </span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                  {question.grammarType.name}
                </span>
                <span>{question.grammarType.category}</span>
              </div>
            </div>
            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => onEdit(question)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit question"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => onDelete(question.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete question"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  index === question.correctAnswer
                    ? 'border-green-300 bg-green-50 text-green-800'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                {index === question.correctAnswer && (
                  <span className="ml-2 text-green-600">✓</span>
                )}
              </div>
            ))}
          </div>

          <div className="text-sm text-gray-600">
            <p><strong>Explanation:</strong> {question.explanation.en}</p>
          </div>
        </div>
      ))}
    </div>
  );
};