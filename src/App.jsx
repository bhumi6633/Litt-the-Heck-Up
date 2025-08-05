import React, { useState, useEffect, useRef } from 'react';
import { PROMPT_TEMPLATES, chatBubbles, fallbackResponses } from './data/suitsData.js';
import aiService from './services/aiService.js';
import FloatingChatBubble from './components/FloatingChatBubble.jsx';
import GoalInput from './components/GoalInput.jsx';
import ResultCard from './components/ResultCard.jsx';
import HistorySection from './components/HistorySection.jsx';
import SettingsPanel from './components/SettingsPanel.jsx';

function App() {
  const [goal, setGoal] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [personalityMode, setPersonalityMode] = useState('both'); // 'motivate', 'roast', 'both'
  const [suitsMode, setSuitsMode] = useState('harvey'); // 'harvey', 'donna', 'mike', 'louis'
  const [showSettings, setShowSettings] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatVisible, setChatVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [inputFocused, setInputFocused] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);

  const mouseRef = useRef(null);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('littHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('littHistory', JSON.stringify(history));
  }, [history]);

  // Track mouse position for floating chat bubble
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle chat bubble messages based on user interactions
  useEffect(() => {
    let message = '';
    let messages = [];

    if (inputFocused) {
      messages = chatBubbles.typing;
    } else if (buttonHovered) {
      messages = chatBubbles.buttonHover;
    }

    if (messages.length > 0) {
      message = messages[Math.floor(Math.random() * messages.length)];
    }

    if (message && message !== chatMessage) {
      setChatMessage(message);
      setChatVisible(true);
      setTimeout(() => setChatVisible(false), 3000);
    }
  }, [inputFocused, buttonHovered, chatMessage]);

  const generateContent = async (userGoal) => {
    setLoading(true);
    
    try {
      const character = suitsMode;
      const prompts = PROMPT_TEMPLATES[character];
      const results = {};

      // Generate content based on personality mode
      if (personalityMode === 'motivate' || personalityMode === 'both') {
        try {
          results.quote = await aiService.generateContent(prompts.quote, character, 'quote');
        } catch (error) {
          console.error('Error generating quote:', error);
          results.quote = fallbackResponses[character].quote;
        }

        try {
          results.plan = await aiService.generateContent(prompts.plan, character, 'plan');
        } catch (error) {
          console.error('Error generating plan:', error);
          results.plan = fallbackResponses[character].plan;
        }
      }

      if (personalityMode === 'roast' || personalityMode === 'both') {
        try {
          results.roast = await aiService.generateContent(prompts.roast, character, 'roast');
        } catch (error) {
          console.error('Error generating roast:', error);
          results.roast = fallbackResponses[character].roast;
        }
      }

      const newResult = {
        id: Date.now(),
        goal: userGoal,
        character: character,
        personalityMode: personalityMode,
        timestamp: new Date().toISOString(),
        ...results
      };

      setResult(newResult);
      setHistory(prev => [newResult, ...prev]);
      
      // Show click message
      const clickMessages = chatBubbles.click;
      const clickMessage = clickMessages[Math.floor(Math.random() * clickMessages.length)];
      setChatMessage(clickMessage);
      setChatVisible(true);
      setTimeout(() => setChatVisible(false), 3000);

    } catch (error) {
      console.error('Error generating content:', error);
      alert('Failed to generate content. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLittMe = () => {
    if (!goal.trim()) {
      alert('Please enter a goal first!');
      return;
    }
    generateContent(goal);
  };

  const handleLittMeAgain = () => {
    if (result) {
      generateContent(result.goal);
    }
  };

  const handleAddAnotherGoal = () => {
    setGoal('');
    setResult(null);
  };

  const handleInputHover = () => {
    const messages = chatBubbles.inputHover;
    const message = messages[Math.floor(Math.random() * messages.length)];
    setChatMessage(message);
    setChatVisible(true);
    setTimeout(() => setChatVisible(false), 3000);
  };

  const handleButtonHover = (isHovered) => {
    setButtonHovered(isHovered);
  };



  return (
    <div className="min-h-screen bg-slate-100 text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-indigo-600">Litt the Heck Up</h1>
              <p className="text-gray-600 mt-1">Your Suits-inspired motivation app</p>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              ⚙️ Settings
            </button>
          </div>
        </div>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel
          personalityMode={personalityMode}
          setPersonalityMode={setPersonalityMode}
          suitsMode={suitsMode}
          setSuitsMode={setSuitsMode}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input and Current Result */}
          <div className="space-y-6">
            {/* Goal Input */}
            <GoalInput
              goal={goal}
              setGoal={setGoal}
              onLittMe={handleLittMe}
              onLittMeAgain={handleLittMeAgain}
              onAddAnotherGoal={handleAddAnotherGoal}
              loading={loading}
              result={result}
              onInputFocus={() => setInputFocused(true)}
              onInputBlur={() => setInputFocused(false)}
              onInputHover={handleInputHover}
              onButtonHover={handleButtonHover}
            />

            {/* Current Result */}
            {result && (
              <ResultCard
                result={result}
                personalityMode={personalityMode}
                suitsMode={suitsMode}
              />
            )}
          </div>

          {/* Right Column - History */}
          <div>
            <HistorySection
              history={history}
              personalityMode={personalityMode}
              suitsMode={suitsMode}
              onHistoryChange={setHistory}
            />
          </div>
        </div>
      </main>

      {/* Floating Chat Bubble */}
      <FloatingChatBubble
        message={chatMessage}
        visible={chatVisible}
        position={mousePosition}
      />

      {/* API Key Warning */}
      {!aiService.hasApiKey() && (
        <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg shadow-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              ⚠️
            </div>
            <div className="ml-3">
              <p className="text-sm">
                <strong>Gemini API Key Required:</strong> Add your VITE_GEMINI_API_KEY to environment variables to enable AI-generated content.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App; 