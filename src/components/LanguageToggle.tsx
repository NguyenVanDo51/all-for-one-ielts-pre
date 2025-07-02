import React from 'react';
import { Language } from '../types/quiz';

interface LanguageToggleProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  return (
    <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-xl p-1">
      <button
        onClick={() => onLanguageChange('en')}
        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
          currentLanguage === 'en'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-white hover:bg-white/10'
        }`}
      >
        English
      </button>
      <button
        onClick={() => onLanguageChange('vi')}
        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
          currentLanguage === 'vi'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-white hover:bg-white/10'
        }`}
      >
        Tiếng Việt
      </button>
    </div>
  );
};