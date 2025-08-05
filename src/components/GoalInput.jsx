import React from 'react';
import CharacterSelector from './CharacterSelector.jsx';

const GoalInput = ({
  goal,
  setGoal,
  onLittMe,
  onLittMeAgain,
  onAddAnotherGoal,
  loading,
  result,
  onInputFocus,
  onInputBlur,
  onInputHover,
  onButtonHover,
  personalityMode,
  setPersonalityMode,
  suitsMode,
  setSuitsMode
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      onLittMe();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-display text-white mb-2 tracking-wide">What's your goal?</h2>
        <p className="text-slate-300 text-lg mb-4 font-quote italic">"Win a no-win situation by rewriting the rules." - Harvey Specter</p>
      </div>

      {/* Character Selector */}
      <CharacterSelector 
        selectedCharacter={suitsMode}
        onCharacterSelect={setSuitsMode}
      />

      {/* Personality Mode Selection */}
      <div className="flex-1">
        <select
          value={personalityMode}
          onChange={(e) => setPersonalityMode(e.target.value)}
          className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-heading font-semibold rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <option value="both">Motivation + Roast</option>
          <option value="motivate">Motivation Only</option>
          <option value="roast">Roast Only</option>
        </select>
      </div>

      {/* Goal Input */}
      <div>
        <textarea
          id="goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          onMouseEnter={onInputHover}
          placeholder="e.g., Wake up at 5AM daily, Get an internship at IBM, Learn to code..."
          className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 resize-none text-white placeholder-slate-400 font-ui"
          rows="4"
          disabled={loading}
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={onLittMe}
          onMouseEnter={() => onButtonHover(true)}
          onMouseLeave={() => onButtonHover(false)}
          disabled={loading || !goal.trim()}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-heading font-semibold rounded-xl px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : (
            <span>Litt Me 🔥</span>
          )}
        </button>

        {result && (
          <>
            <button
              onClick={onLittMeAgain}
              onMouseEnter={() => onButtonHover(true)}
              onMouseLeave={() => onButtonHover(false)}
              disabled={loading}
              className="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Litt Me Again 🔄
            </button>

            <button
              onClick={onAddAnotherGoal}
              onMouseEnter={() => onButtonHover(true)}
              onMouseLeave={() => onButtonHover(false)}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Add Another Goal 💼
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GoalInput; 