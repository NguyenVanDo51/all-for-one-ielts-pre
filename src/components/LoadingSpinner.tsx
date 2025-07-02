import React from 'react';
import { Language } from '../types/quiz';

interface LoadingSpinnerProps {
  language: Language;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ language }) => {
  const loadingText = language === 'vi' ? 'Đang tải câu hỏi mới...' : 'Loading new question...';

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-600 animate-pulse-soft">{loadingText}</p>
    </div>
  );
};