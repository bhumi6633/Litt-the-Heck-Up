import React from 'react';

const CharacterSelector = ({ selectedCharacter, onCharacterSelect }) => {
  const characters = [
    {
      id: 'harvey',
      name: 'Harvey Specter',
      image: '/wp3324908-harvey-specter-wallpapers.jpg',
      description: 'Bold, confident, and results-oriented',
      emoji: '💼'
    },
    {
      id: 'donna',
      name: 'Donna Paulsen',
      image: '/wp11130480-donna-paulsen-wallpapers.png',
      description: 'Wise, supportive, and empowering',
      emoji: '👑'
    },
    {
      id: 'mike',
      name: 'Mike Ross',
      image: '/wp2205819-michael-ross-wallpapers.jpg',
      description: 'Analytical, principled, and solution-focused',
      emoji: '🧠',
      imageClass: 'object-cover object-top'
    },
    {
      id: 'louis',
      name: 'Louis Litt',
      image: '/wp13697344-louis-litt-wallpapers.jpg',
      description: 'Intense, competitive, and fiercely ambitious',
      emoji: '🔥',
      imageClass: 'object-cover object-top'
    },
    {
      id: 'jessica',
      name: 'Jessica Pearson',
      image: '/wp10958001-jessica-pearson-wallpapers.jpg',
      description: 'Commanding, authoritative, and strategic',
      emoji: '⚖️'
    }
  ];

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-slate-300 mb-3 font-heading">Choose your character:</label>
      <div className="grid grid-cols-5 gap-3">
        {characters.map((character) => (
          <button
            key={character.id}
            onClick={() => onCharacterSelect(character.id)}
            className={`relative group overflow-hidden rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
              selectedCharacter === character.id
                ? 'border-indigo-400 bg-indigo-500/20 shadow-lg shadow-indigo-500/25'
                : 'border-slate-600 hover:border-indigo-400 bg-slate-800/50 hover:bg-slate-700/50'
            } ${character.id === 'mike' || character.id === 'louis' ? 'bg-slate-900/30' : ''}`}
          >
            {/* Character Image */}
            <div className="relative h-28 md:h-36 overflow-hidden">
              <img
                src={character.image}
                alt={character.name}
                className={`w-full h-full transition-transform duration-300 group-hover:scale-110 ${
                  character.imageClass || 'object-cover'
                }`}
                style={{
                  objectPosition: character.id === 'mike' || character.id === 'louis' ? 'center 20%' : 'center'
                }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
            
            {/* Character Info */}
            <div className="p-3 text-center">
              <div className="flex items-center justify-center space-x-1 mb-2">
                <h3 className="text-sm font-heading font-semibold text-white truncate">
                  {character.name}
                </h3>
                <span className="text-lg">{character.emoji}</span>
              </div>
              <p className="text-xs text-slate-300 font-ui leading-tight px-1 line-clamp-2">
                {character.description}
              </p>
            </div>

            {/* Selection Indicator */}
            {selectedCharacter === character.id && (
              <div className="absolute top-2 right-2">
                <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CharacterSelector; 