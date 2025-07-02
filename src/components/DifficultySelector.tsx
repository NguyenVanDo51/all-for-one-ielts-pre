import { DifficultyLevel } from '../types/quiz';

interface DifficultySelectorProps {
  currentLevel: DifficultyLevel;
  onLevelChange: (level: DifficultyLevel) => void;
  disabled?: boolean;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  currentLevel,
  onLevelChange,
  disabled = false,
}) => {
  const levels: { value: DifficultyLevel; label: string; description: string }[] = [
    { value: 'Auto', label: 'Auto', description: 'Adaptive difficulty' },
    { value: 'A1', label: 'A1', description: 'Beginner' },
    { value: 'A2', label: 'A2', description: 'Elementary' },
    { value: 'B1', label: 'B1', description: 'Intermediate' },
    { value: 'B2', label: 'B2', description: 'Upper-Intermediate' },
    { value: 'C1', label: 'C1', description: 'Advanced' },
    { value: 'C2', label: 'C2', description: 'Proficiency' },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {levels.map((level) => (
        <button
          key={level.value}
          onClick={() => onLevelChange(level.value)}
          disabled={disabled}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            currentLevel === level.value
              ? level.value === 'Auto' 
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                : 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 hover:border-blue-300'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
          title={level.description}
        >
          {level.label}
        </button>
      ))}
    </div>
  );
};