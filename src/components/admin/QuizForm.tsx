import React, { useState, useEffect } from 'react';
import { AdminQuizQuestion, CreateQuizRequest } from '../../types/admin';

interface QuizFormProps {
  quiz?: AdminQuizQuestion | null;
  onSubmit: (data: CreateQuizRequest) => void;
  onCancel: () => void;
  loading: boolean;
}

export const QuizForm: React.FC<QuizFormProps> = ({ quiz, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState<CreateQuizRequest>({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: {
      en: '',
      vi: ''
    },
    level: 'A1'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (quiz) {
      setFormData({
        question: quiz.question,
        options: [...quiz.options],
        correctAnswer: quiz.correctAnswer,
        explanation: { ...quiz.explanation },
        level: quiz.level
      });
    }
  }, [quiz]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.question.trim()) {
      newErrors.question = 'Question is required';
    }

    formData.options.forEach((option, index) => {
      if (!option.trim()) {
        newErrors[`option${index}`] = `Option ${index + 1} is required`;
      }
    });

    if (!formData.explanation.en.trim()) {
      newErrors.explanationEn = 'English explanation is required';
    }

    if (!formData.explanation.vi.trim()) {
      newErrors.explanationVi = 'Vietnamese explanation is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">
          {quiz ? 'Edit Quiz Question' : 'Create New Quiz Question'}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Question */}
        <div>
          <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
            Question *
          </label>
          <textarea
            id="question"
            rows={3}
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.question ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter the quiz question..."
          />
          {errors.question && <p className="mt-1 text-sm text-red-600">{errors.question}</p>}
        </div>

        {/* Level */}
        <div>
          <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">
            Level *
          </label>
          <select
            id="level"
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {levels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        {/* Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Answer Options *
          </label>
          <div className="space-y-3">
            {formData.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={formData.correctAnswer === index}
                  onChange={() => setFormData({ ...formData, correctAnswer: index })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors[`option${index}`] ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder={`Option ${index + 1}`}
                  />
                  {errors[`option${index}`] && (
                    <p className="mt-1 text-sm text-red-600">{errors[`option${index}`]}</p>
                  )}
                </div>
                <span className="text-sm text-gray-500 w-16">
                  {formData.correctAnswer === index ? 'Correct' : ''}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Explanations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="explanationEn" className="block text-sm font-medium text-gray-700 mb-2">
              English Explanation *
            </label>
            <textarea
              id="explanationEn"
              rows={4}
              value={formData.explanation.en}
              onChange={(e) => setFormData({ 
                ...formData, 
                explanation: { ...formData.explanation, en: e.target.value }
              })}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.explanationEn ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Explain why this is the correct answer in English..."
            />
            {errors.explanationEn && <p className="mt-1 text-sm text-red-600">{errors.explanationEn}</p>}
          </div>

          <div>
            <label htmlFor="explanationVi" className="block text-sm font-medium text-gray-700 mb-2">
              Vietnamese Explanation *
            </label>
            <textarea
              id="explanationVi"
              rows={4}
              value={formData.explanation.vi}
              onChange={(e) => setFormData({ 
                ...formData, 
                explanation: { ...formData.explanation, vi: e.target.value }
              })}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.explanationVi ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Giải thích tại sao đây là câu trả lời đúng bằng tiếng Việt..."
            />
            {errors.explanationVi && <p className="mt-1 text-sm text-red-600">{errors.explanationVi}</p>}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : quiz ? 'Update Quiz' : 'Create Quiz'}
          </button>
        </div>
      </form>
    </div>
  );
};