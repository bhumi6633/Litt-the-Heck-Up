import { API_CONFIG } from '../data/suitsData.js';

class AIService {
  constructor() {
    this.provider = API_CONFIG.provider;
    this.apiKey = this.getApiKey();
    this.retryAttempts = 3;
    this.retryDelay = 1000; // ms
  }

  getApiKey() {
    const keys = {
      gemini: API_CONFIG.GEMINI_API_KEY,
      openai: API_CONFIG.OPENAI_API_KEY,
      anthropic: API_CONFIG.ANTHROPIC_API_KEY
    };
    return keys[this.provider] || '';
  }

  async retryOperation(operation, attempts = this.retryAttempts) {
    for (let i = 0; i < attempts; i++) {
      try {
        return await operation();
      } catch (err) {
        if (i === attempts - 1) throw err;
        await new Promise(res => setTimeout(res, this.retryDelay * (i + 1)));
      }
    }
  }

  async generateContent(prompt, character, contentType) {
    if (!this.apiKey) {
      throw new Error(`Missing API key for ${this.provider}.`);
    }

    const apiMap = {
      gemini: () => this.callGeminiAPI(prompt, character, contentType),
      openai: () => this.callOpenAIAPI(prompt, character, contentType),
      anthropic: () => this.callAnthropicAPI(prompt, character, contentType)
    };

    const callAPI = apiMap[this.provider] || apiMap['gemini'];
    return this.retryOperation(callAPI);
  }

  async callGeminiAPI(prompt, character, contentType) {
    const fullPrompt = `${prompt}\n\nUser's goal: ${contentType === 'quote' ? 'Achieving their goals' : 'Their current situation'}\n\nGenerate a ${contentType} in the style of ${character} from Suits.`;

    const res = await fetch(`${API_CONFIG.GEMINI_URL}?key=${this.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: fullPrompt }] }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 200
        }
      })
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(`Gemini API error: ${res.status} - ${errData.error?.message || 'Unknown error'}`);
    }

    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || ' Gemini returned no content.';
  }

  async callOpenAIAPI(prompt, character, contentType) {
    const fullPrompt = `${prompt}\n\nUser's goal: ${contentType === 'quote' ? 'Achieving their goals' : 'Their current situation'}\n\nGenerate a ${contentType} in the style of ${character} from Suits.`;

    const res = await fetch(API_CONFIG.OPENAI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: `You are ${character} from Suits. Be true to their voice.` },
          { role: 'user', content: fullPrompt }
        ],
        max_tokens: 200,
        temperature: 0.8,
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1
      })
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(`OpenAI API error: ${res.status} - ${errData.error?.message || 'Unknown error'}`);
    }

    const data = await res.json();
    return data?.choices?.[0]?.message?.content?.trim() || ' OpenAI returned no content.';
  }

  async callAnthropicAPI(prompt, character, contentType) {
    const fullPrompt = `${prompt}\n\nUser's goal: ${contentType === 'quote' ? 'Achieving their goals' : 'Their current situation'}\n\nGenerate a ${contentType} in the style of ${character} from Suits.`;

    const res = await fetch(API_CONFIG.ANTHROPIC_URL, {
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
        messages: [{ role: 'user', content: fullPrompt }]
      })
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(`Anthropic API error: ${res.status} - ${errData.error?.message || 'Unknown error'}`);
    }

    const data = await res.json();
    return data?.content?.[0]?.text?.trim() || ' Anthropic returned no content.';
  }

  setProvider(provider) {
    this.provider = provider;
    this.apiKey = this.getApiKey();
  }

  hasApiKey() {
    return !!this.apiKey;
  }

  getProviderStatus() {
    return {
      provider: this.provider,
      hasKey: this.hasApiKey(),
      availableProviders: this.getAvailableProviders()
    };
  }

  getAvailableProviders() {
    const available = [];
    if (API_CONFIG.GEMINI_API_KEY) available.push('gemini');
    if (API_CONFIG.OPENAI_API_KEY) available.push('openai');
    if (API_CONFIG.ANTHROPIC_API_KEY) available.push('anthropic');
    return available;
  }

  async testConnection() {
    if (!this.hasApiKey()) return { success: false, error: 'No API key available' };

    try {
      await this.generateContent('Test motivational quote', 'Harvey', 'quote');
      return { success: true, provider: this.provider };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
}

export default new AIService();
