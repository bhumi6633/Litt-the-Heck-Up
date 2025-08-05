import React, { useState } from 'react';

const HistorySection = ({ history, personalityMode, suitsMode, onHistoryChange }) => {
  const [expandedId, setExpandedId] = useState(null);

  const getCharacterName = (character) => {
    const names = {
      harvey: 'Harvey',
      donna: 'Donna',
      mike: 'Mike',
      louis: 'Louis',
      jessica: 'Jessica'
    };
    return names[character] || character;
  };



  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const exportHistory = () => {
    const dataStr = JSON.stringify(history, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `litt-history-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importHistory = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedHistory = JSON.parse(e.target.result);
        if (Array.isArray(importedHistory)) {
          onHistoryChange(importedHistory);
          alert('History imported successfully!');
        } else {
          alert('Invalid file format. Please select a valid history file.');
        }
      } catch (error) {
        alert('Error importing history. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history? This action cannot be undone.')) {
      onHistoryChange([]);
    }
  };

  if (history.length === 0) {
    return (
      <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-semibold text-slate-200">History</h2>
          <div className="flex space-x-2">
            <label className="cursor-pointer px-3 py-1 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-colors text-sm font-heading">
              Import
              <input
                type="file"
                accept=".json"
                onChange={importHistory}
                className="hidden"
              />
            </label>
          </div>
        </div>
        <div className="text-center py-8">
          <div className="text-slate-500 text-6xl mb-4">📝</div>
          <p className="text-slate-400 font-ui">No goals yet. Start by adding your first goal!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-heading font-semibold text-slate-200">History</h2>
        <div className="flex space-x-2">
          <button
            onClick={exportHistory}
            className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-colors text-sm font-heading"
          >
            Export
          </button>
          <label className="cursor-pointer px-3 py-1 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-colors text-sm font-heading">
            Import
            <input
              type="file"
              accept=".json"
              onChange={importHistory}
              className="hidden"
            />
          </label>
          <button
            onClick={clearHistory}
            className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-colors text-sm font-heading"
          >
            Clear
          </button>
        </div>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {history.map((item) => (
          <div
            key={item.id}
            className="border border-slate-600/50 rounded-lg p-4 hover:border-slate-500 transition-colors cursor-pointer bg-slate-800/30 backdrop-blur-sm"
            onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-heading font-medium text-slate-200">
                  {getCharacterName(item.character)}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-ui">{formatTimestamp(item.timestamp)}</span>
            </div>

            {/* Goal */}
            <div className="mb-3">
              <p className="text-sm text-slate-200 font-medium line-clamp-2 font-ui">{item.goal}</p>
            </div>

            {/* Mode indicator */}
            <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
              <span className="text-xs font-ui">
                {item.personalityMode === 'both' ? 'Motivate + Roast' : 
                 item.personalityMode === 'motivate' ? 'Motivate Only' : 'Roast Only'}
              </span>
            </div>

            {/* Expandable content */}
            {expandedId === item.id && (
              <div className="mt-4 pt-4 border-t border-slate-600/50 space-y-3">
                {/* Quote */}
                {(item.personalityMode === 'motivate' || item.personalityMode === 'both') && item.quote && (
                  <div className="border-l-2 border-slate-500 pl-3">
                    <h4 className="text-xs font-heading font-medium text-slate-300 mb-1">Motivation</h4>
                    <p className="text-sm text-slate-200 font-quote">"{item.quote}"</p>
                  </div>
                )}

                {/* Roast */}
                {(item.personalityMode === 'roast' || item.personalityMode === 'both') && item.roast && (
                  <div className="border-l-2 border-slate-500 pl-3">
                    <h4 className="text-xs font-heading font-medium text-slate-300 mb-1">Roast</h4>
                    <p className="text-sm text-slate-200 font-quote">"{item.roast}"</p>
                  </div>
                )}

                {/* Plan */}
                {(item.personalityMode === 'motivate' || item.personalityMode === 'both') && item.plan && (
                  <div className="border-l-2 border-slate-500 pl-3">
                    <h4 className="text-xs font-heading font-medium text-slate-300 mb-1">Strategy</h4>
                    <div className="text-sm text-slate-200 font-ui">
                      {item.plan.split('\n').map((step, index) => (
                        <div key={index} className="mb-1">
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Expand/collapse indicator */}
            <div className="text-center">
              <span className="text-xs text-indigo-600">
                {expandedId === item.id ? 'Click to collapse' : 'Click to expand'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistorySection; 