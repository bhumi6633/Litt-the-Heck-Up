import React from 'react';

const FloatingChatBubble = ({ message, visible, position }) => {
  if (!visible || !message) return null;

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: position.x + 20,
        top: position.y - 60,
        transform: 'translateX(-50%)'
      }}
    >
      <div className="relative bg-neutral-800 text-white px-4 py-2 rounded-lg shadow-md text-sm font-medium max-w-xs">
        <div>{message}</div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-800"></div>
      </div>
    </div>
  );
};

export default FloatingChatBubble;
