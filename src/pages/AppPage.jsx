import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PROMPT_TEMPLATES, chatBubbles, fallbackResponses } from '../data/suitsData.js';
import aiService from '../services/aiService.js';
import FloatingChatBubble from '../components/FloatingChatBubble.jsx';
import GoalInput from '../components/GoalInput.jsx';
import ResultCard from '../components/ResultCard.jsx';
import HistorySection from '../components/HistorySection.jsx';

const AppPage = () => {
  const [goal, setGoal] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [personalityMode, setPersonalityMode] = useState('both');
  const [suitsMode, setSuitsMode] = useState('harvey');
  const [chatMessage, setChatMessage] = useState('');
  const [chatVisible, setChatVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [inputFocused, setInputFocused] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);

  const mouseRef = useRef(null);

  // Load history and settings from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('littHistory');
    const savedPersonalityMode = localStorage.getItem('littPersonalityMode');
    const savedSuitsMode = localStorage.getItem('littSuitsMode');
    
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
    if (savedPersonalityMode) {
      setPersonalityMode(savedPersonalityMode);
    }
    if (savedSuitsMode) {
      setSuitsMode(savedSuitsMode);
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
      // Show a more user-friendly error message
      if (error.message.includes('429') || error.message.includes('quota')) {
        alert('API rate limit reached. Using fallback responses. Try again in a few minutes!');
      } else if (error.message.includes('API key')) {
        alert('Please check your Gemini API key in the .env file.');
      } else {
        alert('Network error. Using fallback responses. Check your internet connection.');
      }
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
            <div className="flex items-center space-x-4">
              <Link 
                to="/settings" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-6 py-3 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                ⚙️ Settings
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Goal Input Section - Full Width */}
        <div className="mb-12">
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8">
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
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Current Result */}
          <div>
            {result && (
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
                <ResultCard
                  result={result}
                  personalityMode={personalityMode}
                  suitsMode={suitsMode}
                />
              </div>
            )}
          </div>

          {/* Right Column - History */}
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
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
        <div className="fixed bottom-4 right-4 bg-amber-500/90 backdrop-blur-sm border border-amber-400/50 text-white px-6 py-4 rounded-xl shadow-xl">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-amber-200">
              ⚠️
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">
                <strong>Gemini API Key Required:</strong> Add your VITE_GEMINI_API_KEY to environment variables to enable AI-generated content.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppPage; 