import { API_CONFIG } from '../data/suitsData.js';

class AIService {
  constructor() {
    this.provider = API_CONFIG.provider;
    this.apiKey = this.getApiKey();
    this.retryAttempts = 3;
    this.retryDelay = 1000; // 1 second
  }

  getApiKey() {
    switch (this.provider) {
      case 'gemini':
        return API_CONFIG.GEMINI_API_KEY;
      case 'openai':
        return API_CONFIG.OPENAI_API_KEY;
      case 'anthropic':
        return API_CONFIG.ANTHROPIC_API_KEY;
      default:
        return API_CONFIG.GEMINI_API_KEY;
    }
  }

  // Enhanced retry logic
  async retryOperation(operation, attempts = this.retryAttempts) {
    for (let i = 0; i < attempts; i++) {
      try {
        return await operation();
      } catch (error) {
        if (i === attempts - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, this.retryDelay * (i + 1)));
      }
    }
  }

  async generateContent(prompt, character, contentType) {
    if (!this.apiKey) {
      throw new Error(`No API key found for ${this.provider}. Please add your API key to environment variables.`);
    }

    try {
      switch (this.provider) {
        case 'gemini':
          return await this.retryOperation(() => this.callGeminiAPI(prompt, character, contentType));
        case 'openai':
          return await this.retryOperation(() => this.callOpenAIAPI(prompt, character, contentType));
        case 'anthropic':
          return await this.retryOperation(() => this.callAnthropicAPI(prompt, character, contentType));
        default:
          return await this.retryOperation(() => this.callGeminiAPI(prompt, character, contentType));
      }
    } catch (error) {
      console.error('AI API Error:', error);
      throw error;
    }
  }

  async callGeminiAPI(prompt, character, contentType) {
    const fullPrompt = `${prompt}\n\nUser's goal: ${contentType === 'quote' ? 'Achieving their goals' : 'Their current situation'}\n\nGenerate a ${contentType} in the style of ${character} from Suits.`;

    const response = await fetch(`${API_CONFIG.GEMINI_URL}?key=${this.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: fullPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 200,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Gemini API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text.trim();
  }

  async callOpenAIAPI(prompt, character, contentType) {
    const fullPrompt = `${prompt}\n\nUser's goal: ${contentType === 'quote' ? 'Achieving their goals' : 'Their current situation'}\n\nGenerate a ${contentType} in the style of ${character} from Suits.`;

    const response = await fetch(API_CONFIG.OPENAI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are ${character} from Suits. Generate content in their unique style and personality. Be authentic to the character's voice and mannerisms.`
          },
          {
            role: 'user',
            content: fullPrompt
          }
        ],
        max_tokens: 200,
        temperature: 0.8,
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  }

  async callAnthropicAPI(prompt, character, contentType) {
    const fullPrompt = `${prompt}\n\nUser's goal: ${contentType === 'quote' ? 'Achieving their goals' : 'Their current situation'}\n\nGenerate a ${contentType} in the style of ${character} from Suits.`;

    const response = await fetch(API_CONFIG.ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 200,
        temperature: 0.8,
        messages: [
          {
            role: 'user',
            content: fullPrompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Anthropic API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.content[0].text.trim();
  }

  // Method to switch AI provider
  setProvider(provider) {
    this.provider = provider;
    this.apiKey = this.getApiKey();
  }

  // Method to check if API key is available
  hasApiKey() {
    return !!this.apiKey;
  }

  // Method to get provider status
  getProviderStatus() {
    return {
      provider: this.provider,
      hasKey: this.hasApiKey(),
      availableProviders: this.getAvailableProviders()
    };
  }

  // Get available providers
  getAvailableProviders() {
    const providers = [];
    if (API_CONFIG.GEMINI_API_KEY) providers.push('gemini');
    if (API_CONFIG.OPENAI_API_KEY) providers.push('openai');
    if (API_CONFIG.ANTHROPIC_API_KEY) providers.push('anthropic');
    return providers;
  }

  // Test API connection
  async testConnection() {
    if (!this.hasApiKey()) {
      return { success: false, error: 'No API key available' };
    }

    try {
      const testPrompt = "Generate a short motivational quote.";
      await this.generateContent(testPrompt, 'harvey', 'quote');
      return { success: true, provider: this.provider };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export default new AIService(); 