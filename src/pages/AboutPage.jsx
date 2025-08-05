import React from 'react';
import { Link } from 'react-router-dom';
import AudioButton from '../components/AudioButton.jsx';

const AboutPage = () => {
  const topQuotes = [
    {
      character: "Harvey Specter",
      quote: "Win a no-win situation by rewriting the rules.",
      context: "Harvey's confidence and self-assurance"
    },
    {
      character: "Donna Paulsen",
      quote: "I know everything. It's my job.",
      context: "Donna's wisdom and competence"
    },
    {
      character: "Mike Ross",
      quote: "I'm not a real lawyer, but I am a real pain in the ass.",
      context: "Mike's determination and resourcefulness"
    },
    {
      character: "Louis Litt",
      quote: "I'm not a monster. I'm a winner.",
      context: "Louis's competitive drive and ambition"
    }
  ];

  const instructions = [
    {
      step: "1",
      title: "Enter Your Goal",
      description: "Type any goal you want to achieve - from waking up early to landing your dream job.",
    },
    {
      step: "2",
      title: "Choose Your Coach",
      description: "Pick your Suits character: Harvey for confidence, Donna for wisdom, Mike for strategy, or Louis for fire.",
    },
    {
      step: "3",
      title: "Get Litt",
      description: "Click 'Litt Me 🔥' to get AI-generated motivation, roasts, and strategic plans.",
    },
    {
      step: "4",
      title: "Track Progress",
      description: "View your history, export your goals, and keep building momentum.",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/wp2732690-suits-wallpapers.png)' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80"></div>
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
              Get Started 🔥
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white font-['Inter',sans-serif] mb-6">
            About Litt the Heck Up
          </h1>
          <p className="text-xl text-slate-300 font-['Inter',sans-serif] max-w-3xl mx-auto">
            Your personal Suits-inspired motivation coach. Get the confidence of Harvey, 
            the wisdom of Donna, the strategy of Mike, and the fire of Louis - all in one app.
          </p>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center font-['Inter',sans-serif]">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {instructions.map((instruction) => (
              <div key={instruction.step} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">{instruction.icon}</div>
                <div className="text-2xl font-bold text-indigo-400 mb-2">{instruction.step}</div>
                <h3 className="text-lg font-semibold mb-3">{instruction.title}</h3>
                <p className="text-slate-300 text-sm">{instruction.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Quotes */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center font-['Inter',sans-serif]">
            Top Suits Quotes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topQuotes.map((quote, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{quote.emoji}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-indigo-300 mb-2">{quote.character}</h3>
                    <p className="text-white text-lg mb-3 italic">"{quote.quote}"</p>
                    <p className="text-slate-400 text-sm">{quote.context}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center font-['Inter',sans-serif]">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered</h3>
              <p className="text-slate-300">Dynamic content generated by Google Gemini AI, tailored to each Suits character's personality.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="text-4xl mb-4">💾</div>
              <h3 className="text-xl font-semibold mb-3">History Tracking</h3>
              <p className="text-slate-300">Save all your goals and responses. Export and import your motivation history.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-3">Customizable</h3>
              <p className="text-slate-300">Choose your personality mode and favorite Suits character for personalized motivation.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link 
            to="/app"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xl rounded-xl px-12 py-6 transition-all duration-300 shadow-2xl hover:shadow-indigo-500/25 hover:scale-105 font-['Inter',sans-serif]"
          >
            Start Getting Litt 🔥
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-slate-400 font-['Inter',sans-serif]">
        <p>Made with love, sassand inspired by Suits</p>
      </footer>

      {/* Audio Button */}
      <AudioButton />
    </div>
  );
};

export default AboutPage; 