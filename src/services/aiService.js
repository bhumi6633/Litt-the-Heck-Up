import { GEMINI_CONFIG } from '../data/suitsData.js';

class AIService {
  constructor() {
    this.apiKey = GEMINI_CONFIG.API_KEY;
    this.retryAttempts = 3;
    this.retryDelay = 1000; // ms
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

  async generateContent(prompt, character, contentType, userGoal) {
    if (!this.apiKey) {
      throw new Error('Missing Gemini API key. Please add VITE_GEMINI_API_KEY to your environment variables.');
    }

    return this.retryOperation(() => this.callGeminiAPI(prompt, character, contentType, userGoal));
  }

  async callGeminiAPI(prompt, character, contentType, userGoal) {
    const fullPrompt = `${prompt}\n\nUser's goal: ${userGoal}\n\nGenerate a ${contentType} in the style of ${character} from Suits.`;

    const res = await fetch(`${GEMINI_CONFIG.URL}?key=${this.apiKey}`, {
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
    return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'Gemini returned no content.';
  }

  hasApiKey() {
    return !!this.apiKey;
  }

  async testConnection() {
    if (!this.hasApiKey()) return { success: false, error: 'No Gemini API key available' };

    try {
      await this.generateContent('Test motivational quote', 'Harvey', 'quote');
      return { success: true, provider: 'gemini' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
}

export default new AIService();
