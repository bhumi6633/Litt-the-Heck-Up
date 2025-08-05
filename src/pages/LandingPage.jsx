import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6">
        <div className="text-2xl font-bold text-white font-['Inter',sans-serif]">
          Litt the Heck Up
        </div>
        <Link 
          to="/about" 
          className="text-slate-300 hover:text-white transition-colors font-['Inter',sans-serif]"
        >
          About
        </Link>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-bold text-white font-['Inter',sans-serif] mb-8 leading-tight">
            Litt the heck up.
            <br />
            <span className="text-indigo-400">Every day.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-300 mb-12 font-['Inter',sans-serif] max-w-2xl mx-auto">
            Get motivated, get roasted, get results. 
            <br />
            Your personal Suits-inspired motivation coach.
          </p>

          {/* CTA Button */}
          <Link 
            to="/app"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xl rounded-xl px-12 py-6 transition-all duration-300 shadow-2xl hover:shadow-indigo-500/25 hover:scale-105 font-['Inter',sans-serif]"
          >
            Get Litt 🔥
          </Link>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-semibold mb-2">Harvey's Confidence</h3>
              <p className="text-slate-300">Bold, strategic motivation that gets results.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="text-4xl mb-4">🔥</div>
              <h3 className="text-xl font-semibold mb-2">Louis's Fire</h3>
              <p className="text-slate-300">Savage roasts that light a fire under you.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="text-4xl mb-4">👑</div>
              <h3 className="text-xl font-semibold mb-2">Donna's Wisdom</h3>
              <p className="text-slate-300">Empowering guidance that builds confidence.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pb-8 text-slate-400 font-['Inter',sans-serif]">
        <p>"You ever think maybe you're not good enough? Neither do I." - Harvey Specter</p>
      </div>
    </div>
  );
};

export default LandingPage; 