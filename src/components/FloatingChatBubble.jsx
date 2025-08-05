import React from 'react';

const FloatingChatBubble = ({ message, visible, position }) => {
  if (!visible || !message) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 floating-bubble"
      style={{
        left: position.x + 20,
        top: position.y - 60,
        transform: 'translateX(-50%)'
      }}
    >
      <div className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg max-w-xs">
        <div className="text-sm font-medium">{message}</div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-indigo-600"></div>
      </div>
    </div>
  );
};

export default FloatingChatBubble; 