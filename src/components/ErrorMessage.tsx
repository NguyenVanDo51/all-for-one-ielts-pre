import React from 'react';
import { Language } from '../types/quiz';

interface ErrorMessageProps {
  message: string;
  language: Language;
  onRetry: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, language, onRetry }) => {
  const getLocalizedText = (key: string) => {
    const texts = {
      title: {
        en: 'Oops! Something went wrong',
        vi: 'Ôi! Có lỗi xảy ra'
      },
      retry: {
        en: 'Try Again',
        vi: 'Thử Lại'
      }
    };
    return texts[key as keyof typeof texts]?.[language] || '';
  };

  return (
    <div className="text-center py-12">
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-red-800 mb-2">{getLocalizedText('title')}</h3>
        <p className="text-red-700 mb-6">{message}</p>
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          {getLocalizedText('retry')}
        </button>
      </div>
    </div>
  );
};