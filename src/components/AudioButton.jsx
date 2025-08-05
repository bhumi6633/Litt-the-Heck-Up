import React, { useState, useRef } from 'react';

const AudioButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <>
      {/* Audio Button */}
      <button
        onClick={togglePlay}
        className="fixed top-4 right-20 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl z-50"
        title="Play Suits Theme Song"
      >
        {isPlaying ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        onEnded={handleEnded}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            audioRef.current.volume = 0.5; // Set to 50% volume
          }
        }}
      >
        <source src="/videoplayback.webm" type="video/webm" />
        <source src="/suits-theme.mp3" type="audio/mpeg" />
        <source src="/suits-theme.ogg" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>
    </>
  );
};

export default AudioButton; 