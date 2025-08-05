import React from 'react';

const ResultCard = ({ result, personalityMode, suitsMode }) => {
  const getCharacterName = (character) => {
    const names = {
      harvey: 'Harvey Specter',
      donna: 'Donna Paulsen',
      mike: 'Mike Ross',
      louis: 'Louis Litt',
      jessica: 'Jessica Pearson'
    };
    return names[character] || character;
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-xl p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-heading font-semibold text-slate-200">
              {getCharacterName(suitsMode)} says:
            </h3>
            <p className="text-sm text-slate-400 font-ui">
              {new Date(result.timestamp).toLocaleDateString()} at {new Date(result.timestamp).toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Goal */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
          <h4 className="text-sm font-heading font-medium text-slate-300 mb-2">Your Goal:</h4>
          <p className="text-slate-200 font-medium font-ui">{result.goal}</p>
        </div>

        {/* Content based on personality mode */}
        <div className="space-y-4">
          {(personalityMode === 'motivate' || personalityMode === 'both') && result.quote && (
            <div className="border-l-4 border-slate-500 pl-4">
              <h4 className="text-sm font-heading font-medium text-slate-300 mb-2">Motivation</h4>
              <p className="text-slate-200 font-quote">"{result.quote}"</p>
            </div>
          )}

          {(personalityMode === 'roast' || personalityMode === 'both') && result.roast && (
            <div className="border-l-4 border-slate-500 pl-4">
              <h4 className="text-sm font-heading font-medium text-slate-300 mb-2">Roast</h4>
              <p className="text-slate-200 font-quote">"{result.roast}"</p>
            </div>
          )}

          {(personalityMode === 'motivate' || personalityMode === 'both') && result.plan && (
            <div className="border-l-4 border-slate-500 pl-4">
              <h4 className="text-sm font-heading font-medium text-slate-300 mb-2">Strategy</h4>
              <div className="text-slate-200 font-ui">
                {result.plan.split('\n').map((step, index) => (
                  <div key={index} className="mb-1">
                    {step}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mode indicator */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 font-ui">
          <span>Mode: {personalityMode === 'both' ? 'Motivate + Roast' : personalityMode === 'motivate' ? 'Motivate Only' : 'Roast Only'}</span>
          <span>Character: {getCharacterName(suitsMode)}</span>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
