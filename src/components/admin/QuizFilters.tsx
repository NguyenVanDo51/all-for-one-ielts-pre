import React from 'react';
import { QuizFilter } from '../../types/admin';

interface QuizFiltersProps {
  filter: QuizFilter;
  onFilterChange: (filter: QuizFilter) => void;
  onCreateNew: () => void;
}

export const QuizFilters: React.FC<QuizFiltersProps> = ({ filter, onFilterChange, onCreateNew }) => {
  const levels = ['All', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search questions..."
              value={filter.searchTerm}
              onChange={(e) => onFilterChange({ ...filter, searchTerm: e.target.value })}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Level Filter */}
          <div>
            <select
              value={filter.level}
              onChange={(e) => onFilterChange({ ...filter, level: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {levels.map(level => (
                <option key={level} value={level}>
                  {level === 'All' ? 'All Levels' : `Level ${level}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Create Button */}
        <button
          onClick={onCreateNew}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create New Quiz
        </button>
      </div>
    </div>
  );
};