import React from 'react';

const ResultCard = ({ result, personalityMode, suitsMode }) => {
  const getCharacterName = (character) => {
    const names = {
      harvey: 'Harvey Specter',
      donna: 'Donna Paulsen',
      mike: 'Mike Ross',
      louis: 'Louis Litt'
    };
    return names[character] || character;
  };

  const getCharacterEmoji = (character) => {
    const emojis = {
      harvey: '💼',
      donna: '👑',
      mike: '🧠',
      louis: '🔥'
    };
    return emojis[character] || '💼';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 card-hover">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getCharacterEmoji(suitsMode)}</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {getCharacterName(suitsMode)} says:
              </h3>
              <p className="text-sm text-gray-500">
                {new Date(result.timestamp).toLocaleDateString()} at {new Date(result.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>

        {/* Goal */}
        <div className="bg-indigo-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-indigo-700 mb-2">Your Goal:</h4>
          <p className="text-gray-900 font-medium">{result.goal}</p>
        </div>

        {/* Content based on personality mode */}
        <div className="space-y-4">
          {/* Quote */}
          {(personalityMode === 'motivate' || personalityMode === 'both') && result.quote && (
            <div className="border-l-4 border-indigo-500 pl-4">
              <h4 className="text-sm font-medium text-indigo-700 mb-2">💬 Motivation</h4>
              <p className="text-gray-900 italic">"{result.quote}"</p>
            </div>
          )}

          {/* Roast */}
          {(personalityMode === 'roast' || personalityMode === 'both') && result.roast && (
            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="text-sm font-medium text-red-700 mb-2">🔥 Roast</h4>
              <p className="text-gray-900 italic">"{result.roast}"</p>
            </div>
          )}

          {/* Plan */}
          {(personalityMode === 'motivate' || personalityMode === 'both') && result.plan && (
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="text-sm font-medium text-green-700 mb-2">📋 Strategy</h4>
              <p className="text-gray-900">{result.plan}</p>
            </div>
          )}
        </div>

        {/* Mode indicator */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Mode: {personalityMode === 'both' ? 'Motivate + Roast' : personalityMode === 'motivate' ? 'Motivate Only' : 'Roast Only'}</span>
          <span>Character: {getCharacterName(suitsMode)}</span>
        </div>
      </div>
    </div>
  );
};

export default ResultCard; 