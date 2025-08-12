import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const AudioContext = createContext();

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  // Load audio state from localStorage on mount
  useEffect(() => {
    const savedVolume = localStorage.getItem('audioVolume');
    const savedIsPlaying = localStorage.getItem('audioIsPlaying');
    
    if (savedVolume) {
      setVolume(parseFloat(savedVolume));
    }
    if (savedIsPlaying === 'true') {
      setIsPlaying(true);
    }
  }, []);

  // Save audio state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('audioVolume', volume.toString());
    localStorage.setItem('audioIsPlaying', isPlaying.toString());
  }, [volume, isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const value = {
    isPlaying,
    volume,
    togglePlay,
    handleVolumeChange,
    audioRef
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
      {/* Global Audio Element */}
      <audio
        ref={audioRef}
        onEnded={handleEnded}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            audioRef.current.volume = volume;
          }
        }}
      >
        <source src="/videoplayback.webm" type="video/webm" />
        <source src="/suits-theme.mp3" type="audio/mpeg" />
        <source src="/suits-theme.ogg" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>
    </AudioContext.Provider>
  );
};
