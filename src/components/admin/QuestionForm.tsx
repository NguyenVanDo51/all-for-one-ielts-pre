import React, { useState, useEffect } from 'react';
import { CreateQuestionRequest, GrammarType } from '../../types/admin';

interface QuestionFormProps {
  onSubmit: (data: CreateQuestionRequest) => void;
  onCancel: () => void;
  grammarTypes: GrammarType[];
  loading?: boolean;
  initialData?: Partial<CreateQuestionRequest>;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  onSubmit,
  onCancel,
  grammarTypes,
  loading = false,
  initialData
}) => {
  const [formData, setFormData] = useState<CreateQuestionRequest>({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: { en: '', vi: '' },
    level: 'A1',
    grammarTypeId: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData(prev => ({ ...prev, options: newOptions }));
  };

  const groupedGrammarTypes = grammarTypes.reduce((acc, type) => {
    if (!acc[type.category]) {
      acc[type.category] = [];
    }
    acc[type.category].push(type);
    return acc;
  }, {} as Record<string, GrammarType[]>);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {initialData ? 'Edit Question' : 'Add New Question'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Question */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question
            </label>
            <textarea
              value={formData.question}
              onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              required
              placeholder="Enter the quiz question..."
            />
          </div>

          {/* Level and Grammar Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Level
              </label>
              <select
                value={formData.level}
                onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="A1">A1 - Beginner</option>
                <option value="A2">A2 - Elementary</option>
                <option value="B1">B1 - Intermediate</option>
                <option value="B2">B2 - Upper-Intermediate</option>
                <option value="C1">C1 - Advanced</option>
                <option value="C2">C2 - Proficiency</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grammar Type
              </label>
              <select
                value={formData.grammarTypeId}
                onChange={(e) => setFormData(prev => ({ ...prev, grammarTypeId: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select grammar type...</option>
                {Object.entries(groupedGrammarTypes).map(([category, types]) => (
                  <optgroup key={category} label={category}>
                    {types.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          {/* Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Answer Options
            </label>
            <div className="space-y-3">
              {formData.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={formData.correctAnswer === index}
                    onChange={() => setFormData(prev => ({ ...prev, correctAnswer: index }))}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="w-8 text-sm font-medium text-gray-600">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    required
                  />
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Select the radio button next to the correct answer
            </p>
          </div>

          {/* Explanations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Explanation (English)
              </label>
              <textarea
                value={formData.explanation.en}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  explanation: { ...prev.explanation, en: e.target.value }
                }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                required
                placeholder="Explain why this is the correct answer in English..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Explanation (Vietnamese)
              </label>
              <textarea
                value={formData.explanation.vi}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  explanation: { ...prev.explanation, vi: e.target.value }
                }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                required
                placeholder="Giải thích tại sao đây là câu trả lời đúng bằng tiếng Việt..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Saving...' : (initialData ? 'Update Question' : 'Add Question')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};