import React, { useState, useEffect } from 'react';
import { AdminQuizQuestion, GrammarType, CreateQuestionRequest } from '../types/admin';
import { AdminApiService } from '../services/adminApi';
import { QuestionForm } from '../components/admin/QuestionForm';
import { QuestionList } from '../components/admin/QuestionList';

export const AdminPage: React.FC = () => {
  const [questions, setQuestions] = useState<AdminQuizQuestion[]>([]);
  const [grammarTypes, setGrammarTypes] = useState<GrammarType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<AdminQuizQuestion | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  
  // Filters
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedGrammarType, setSelectedGrammarType] = useState<string>('all');

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    loadQuestions();
  }, [selectedLevel, selectedGrammarType]);

  const loadInitialData = async () => {
    try {
      const [questionsData, grammarTypesData] = await Promise.all([
        AdminApiService.getQuestions(),
        AdminApiService.getGrammarTypes()
      ]);
      setQuestions(questionsData);
      setGrammarTypes(grammarTypesData);
    } catch (error) {
      console.error('Error loading initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const questionsData = await AdminApiService.getQuestions(
        selectedLevel === 'all' ? undefined : selectedLevel,
        selectedGrammarType === 'all' ? undefined : selectedGrammarType
      );
      setQuestions(questionsData);
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateQuestion = async (data: CreateQuestionRequest) => {
    try {
      setFormLoading(true);
      await AdminApiService.createQuestion(data);
      setShowForm(false);
      loadQuestions();
    } catch (error) {
      console.error('Error creating question:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateQuestion = async (data: CreateQuestionRequest) => {
    if (!editingQuestion) return;
    
    try {
      setFormLoading(true);
      await AdminApiService.updateQuestion(editingQuestion.id, data);
      setEditingQuestion(null);
      setShowForm(false);
      loadQuestions();
    } catch (error) {
      console.error('Error updating question:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return;
    
    try {
      await AdminApiService.deleteQuestion(id);
      loadQuestions();
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handleEditQuestion = (question: AdminQuizQuestion) => {
    setEditingQuestion(question);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingQuestion(null);
  };

  const groupedGrammarTypes = grammarTypes.reduce((acc, type) => {
    if (!acc[type.category]) {
      acc[type.category] = [];
    }
    acc[type.category].push(type);
    return acc;
  }, {} as Record<string, GrammarType[]>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Quiz Admin</h1>
              <p className="text-gray-600 mt-1">Manage quiz questions and grammar types</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Add New Question
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Level
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Levels</option>
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
                value={selectedGrammarType}
                onChange={(e) => setSelectedGrammarType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Grammar Types</option>
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
        </div>

        {/* Questions List */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Questions ({questions.length})
            </h2>
          </div>
          
          <QuestionList
            questions={questions}
            onEdit={handleEditQuestion}
            onDelete={handleDeleteQuestion}
            loading={loading}
          />
        </div>
      </div>

      {/* Question Form Modal */}
      {showForm && (
        <QuestionForm
          onSubmit={editingQuestion ? handleUpdateQuestion : handleCreateQuestion}
          onCancel={handleCloseForm}
          grammarTypes={grammarTypes}
          loading={formLoading}
          initialData={editingQuestion ? {
            question: editingQuestion.question,
            options: editingQuestion.options,
            correctAnswer: editingQuestion.correctAnswer,
            explanation: editingQuestion.explanation,
            level: editingQuestion.level,
            grammarTypeId: editingQuestion.grammarType.id
          } : undefined}
        />
      )}
    </div>
  );
};