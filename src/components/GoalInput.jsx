import React from 'react';

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
  onButtonHover
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      onLittMe();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 card-hover">
      <div className="space-y-4">
        <div>
          <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-2">
            What's your goal? 💼
          </label>
          <textarea
            id="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            onMouseEnter={onInputHover}
            placeholder="e.g., Wake up at 5AM daily, Get an internship at IBM, Learn to code..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
            rows="3"
            disabled={loading}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={onLittMe}
            onMouseEnter={() => onButtonHover(true)}
            onMouseLeave={() => onButtonHover(false)}
            disabled={loading || !goal.trim()}
            className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Litt Me Again 🔄
              </button>

              <button
                onClick={onAddAnotherGoal}
                onMouseEnter={() => onButtonHover(true)}
                onMouseLeave={() => onButtonHover(false)}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Add Another Goal 💼
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalInput; 