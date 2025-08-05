import React, { useState } from 'react';
import aiService from '../services/aiService.js';

const ConnectionTest = ({ onClose }) => {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const testConnection = async () => {
    setTesting(true);
    setError(null);
    setResults(null);

    try {
      const status = aiService.getProviderStatus();
      const testResult = await aiService.testConnection();

      setResults({
        status,
        test: testResult
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setTesting(false);
    }
  };

  const getStatusColor = (hasKey, testSuccess) => {
    if (!hasKey) return 'text-red-600';
    if (testSuccess) return 'text-green-600';
    return 'text-yellow-600';
  };

  const getStatusIcon = (hasKey, testSuccess) => {
    if (!hasKey) return '❌';
    if (testSuccess) return '✅';
    return '⚠️';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">🔧 Connection Test</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Test Button */}
          <div className="mb-6">
            <button
              onClick={testConnection}
              disabled={testing}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {testing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Testing...
                </span>
              ) : (
                'Test Connection'
              )}
            </button>
          </div>

          {/* Results */}
          {results && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Results:</h3>
              
              {/* Provider Status */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Provider Status</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Current Provider:</span>
                    <span className="text-sm font-medium">{results.status.provider}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">API Key:</span>
                    <span className={`text-sm font-medium ${getStatusColor(results.status.hasKey, results.test.success)}`}>
                      {getStatusIcon(results.status.hasKey, results.test.success)} {results.status.hasKey ? 'Available' : 'Missing'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Connection:</span>
                    <span className={`text-sm font-medium ${getStatusColor(true, results.test.success)}`}>
                      {getStatusIcon(true, results.test.success)} {results.test.success ? 'Working' : 'Failed'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Available Providers */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Available Providers</h4>
                <div className="flex flex-wrap gap-2">
                  {results.status.availableProviders.length > 0 ? (
                    results.status.availableProviders.map(provider => (
                      <span key={provider} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {provider}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-red-600">No providers available</span>
                  )}
                </div>
              </div>

              {/* Error Details */}
              {results.test.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-medium text-red-900 mb-2">Error Details</h4>
                  <p className="text-sm text-red-700">{results.test.error}</p>
                </div>
              )}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-medium text-red-900 mb-2">Test Error</h4>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Setup Instructions</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p>1. Add your API keys to environment variables</p>
              <p>2. Restart the development server</p>
              <p>3. Test the connection</p>
              <p>4. Start getting Litt the Heck Up! 🔥</p>
            </div>
          </div>

          {/* Close Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionTest; 