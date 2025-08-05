import React, { useState } from 'react';
import ConnectionTest from './ConnectionTest.jsx';

const SettingsPanel = ({
  personalityMode,
  setPersonalityMode,
  suitsMode,
  setSuitsMode,
  aiProvider,
  onProviderChange,
  onClose
}) => {
  const [showConnectionTest, setShowConnectionTest] = useState(false);
  const characters = [
    { id: 'harvey', name: 'Harvey Specter', emoji: '💼', description: 'Bold, confident, and results-oriented' },
    { id: 'donna', name: 'Donna Paulsen', emoji: '👑', description: 'Wise, supportive, and empowering' },
    { id: 'mike', name: 'Mike Ross', emoji: '🧠', description: 'Analytical, principled, and solution-focused' },
    { id: 'louis', name: 'Louis Litt', emoji: '🔥', description: 'Intense, competitive, and fiercely ambitious' }
  ];

  const personalityModes = [
    { id: 'motivate', name: 'Motivate Me', emoji: '💬', description: 'Only quote + plan' },
    { id: 'roast', name: 'Roast Me', emoji: '🔥', description: 'Only roast' },
    { id: 'both', name: 'Both', emoji: '💬🔥', description: 'All 3 - quote, roast, and plan' }
  ];

  const aiProviders = [
    { id: 'gemini', name: 'Google Gemini', description: 'Fast and creative responses' },
    { id: 'openai', name: 'OpenAI GPT-4', description: 'High-quality and consistent' },
    { id: 'anthropic', name: 'Anthropic Claude', description: 'Thoughtful and detailed' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">⚙️ Settings</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-8">
            {/* Personality Mode */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personality Mode</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {personalityModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setPersonalityMode(mode.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      personalityMode === mode.id
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 hover:border-indigo-300 text-gray-700'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{mode.emoji}</div>
                      <div className="font-medium">{mode.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{mode.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Suits Character */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Suits Character</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {characters.map((character) => (
                  <button
                    key={character.id}
                    onClick={() => setSuitsMode(character.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      suitsMode === character.id
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 hover:border-indigo-300 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{character.emoji}</span>
                      <div className="text-left">
                        <div className="font-medium">{character.name}</div>
                        <div className="text-xs text-gray-500">{character.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Provider */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Provider</h3>
              <div className="space-y-3">
                {aiProviders.map((provider) => (
                  <button
                    key={provider.id}
                    onClick={() => onProviderChange(provider.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      aiProvider === provider.id
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 hover:border-indigo-300 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{provider.name}</div>
                        <div className="text-sm text-gray-500">{provider.description}</div>
                      </div>
                      {aiProvider === provider.id && (
                        <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* API Key Info */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-800 mb-2">🔑 API Key Required</h4>
              <p className="text-sm text-yellow-700 mb-3">
                To use AI-generated content, add your API key to environment variables:
              </p>
              <div className="space-y-1 text-xs font-mono text-yellow-800">
                <div>VITE_GEMINI_API_KEY=your_gemini_key</div>
                <div>VITE_OPENAI_API_KEY=your_openai_key</div>
                <div>VITE_ANTHROPIC_API_KEY=your_anthropic_key</div>
              </div>
              <button
                onClick={() => setShowConnectionTest(true)}
                className="mt-3 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
              >
                🔧 Test Connection
              </button>
            </div>
          </div>

          {/* Close Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Connection Test Modal */}
      {showConnectionTest && (
        <ConnectionTest onClose={() => setShowConnectionTest(false)} />
      )}
    </div>
  );
};

export default SettingsPanel; 