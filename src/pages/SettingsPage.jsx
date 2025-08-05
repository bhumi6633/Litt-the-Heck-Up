import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
  const [personalityMode, setPersonalityMode] = useState('both');
  const [suitsMode, setSuitsMode] = useState('harvey');
  const [history, setHistory] = useState([]);

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

  // Load settings from localStorage
  useEffect(() => {
    const savedPersonalityMode = localStorage.getItem('littPersonalityMode');
    const savedSuitsMode = localStorage.getItem('littSuitsMode');
    const savedHistory = localStorage.getItem('littHistory');

    if (savedPersonalityMode) setPersonalityMode(savedPersonalityMode);
    if (savedSuitsMode) setSuitsMode(savedSuitsMode);
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('littPersonalityMode', personalityMode);
    localStorage.setItem('littSuitsMode', suitsMode);
  }, [personalityMode, suitsMode]);

  const exportHistory = () => {
    const dataStr = JSON.stringify(history, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'litt-history.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importHistory = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedHistory = JSON.parse(e.target.result);
          setHistory(importedHistory);
          localStorage.setItem('littHistory', JSON.stringify(importedHistory));
          alert('History imported successfully!');
        } catch (error) {
          alert('Invalid file format. Please select a valid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear all history? This cannot be undone.')) {
      setHistory([]);
      localStorage.removeItem('littHistory');
      alert('History cleared successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-[#0B0F1A] shadow-lg border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link to="/" className="text-2xl font-bold text-white font-['Inter',sans-serif]">
              Litt the Heck Up
            </Link>
            <Link 
              to="/app" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-6 py-3 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              ← Back to App
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-slate-800/90 backdrop-blur-md border border-slate-700 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white font-['Inter',sans-serif] mb-4">⚙️ Settings</h1>
            <p className="text-slate-300 font-['Inter',sans-serif]">Customize your Suits experience</p>
          </div>

          <div className="space-y-12">
            {/* Personality Mode */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6 font-['Inter',sans-serif]">Personality Mode</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {personalityModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setPersonalityMode(mode.id)}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                      personalityMode === mode.id
                        ? 'border-indigo-400 bg-indigo-500/20 text-indigo-200 shadow-lg'
                        : 'border-slate-600 hover:border-indigo-400 text-slate-300 hover:text-white'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-3">{mode.emoji}</div>
                      <div className="font-semibold text-lg">{mode.name}</div>
                      <div className="text-xs text-slate-400 mt-2">{mode.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Suits Character */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6 font-['Inter',sans-serif]">Suits Character</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {characters.map((character) => (
                  <button
                    key={character.id}
                    onClick={() => setSuitsMode(character.id)}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                      suitsMode === character.id
                        ? 'border-indigo-400 bg-indigo-500/20 text-indigo-200 shadow-lg'
                        : 'border-slate-600 hover:border-indigo-400 text-slate-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">{character.emoji}</span>
                      <div className="text-left">
                        <div className="font-semibold text-lg">{character.name}</div>
                        <div className="text-xs text-slate-400">{character.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* History Management */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6 font-['Inter',sans-serif]">History Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={exportHistory}
                  disabled={history.length === 0}
                  className="p-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  📤 Export History
                </button>
                
                <label className="p-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl text-center">
                  📥 Import History
                  <input
                    type="file"
                    accept=".json"
                    onChange={importHistory}
                    className="hidden"
                  />
                </label>
                
                <button
                  onClick={clearHistory}
                  disabled={history.length === 0}
                  className="p-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  🗑️ Clear History
                </button>
              </div>
              <p className="text-slate-400 text-sm mt-4">
                {history.length} goals in your history
              </p>
            </div>

            {/* API Key Info */}
            <div className="bg-amber-500/20 border border-amber-400/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-amber-200 mb-3">🔑 API Setup</h3>
              <p className="text-slate-300 text-sm mb-4">
                To enable AI-generated content, add your Gemini API key to the <code className="bg-slate-700 px-2 py-1 rounded">.env</code> file:
              </p>
              <div className="bg-slate-800 p-4 rounded-lg">
                <code className="text-amber-200 text-sm">VITE_GEMINI_API_KEY=your_gemini_api_key_here</code>
              </div>
              <p className="text-slate-400 text-xs mt-3">
                Get your free API key from: <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:text-amber-200 underline">Google AI Studio</a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage; 