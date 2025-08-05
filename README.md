# Litt the Heck Up 🔥

A Suits-inspired motivation web app that generates personalized quotes, roasts, and strategic plans using AI.

## Features

### 🎯 Core Functionality
- **Goal Input**: Type your goals and get AI-generated responses
- **Dynamic Content**: AI-generated quotes, roasts, and 3-step strategies
- **Multiple AI Providers**: Support for Gemini, OpenAI GPT-4, and Anthropic Claude
- **Character Personalities**: Choose from Harvey, Donna, Mike, or Louis from Suits

### 🎨 Personality Modes
- **Motivate Me**: Only quote + plan
- **Roast Me**: Only roast
- **Both**: All 3 - quote, roast, and plan

### 👥 Suits Characters
- **Harvey Specter** 💼: Bold, confident, and results-oriented
- **Donna Paulsen** 👑: Wise, supportive, and empowering
- **Mike Ross** 🧠: Analytical, principled, and solution-focused
- **Louis Litt** 🔥: Intense, competitive, and fiercely ambitious

### 🎪 Interactive Features
- **Floating Chat Bubble**: Cursor-following motivational messages
- **History Section**: View all past goals and responses
- **Litt Me Again**: Regenerate new content for the same goal
- **Add Another Goal**: Reset and start fresh

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **AI Integration**: Gemini, OpenAI GPT-4, Anthropic Claude
- **Storage**: LocalStorage for history persistence

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up AI API Keys
Create a `.env` file in the root directory and add your API keys:

```env
# Choose one or more AI providers
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### 3. Get API Keys

#### Google Gemini
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add to `.env` as `VITE_GEMINI_API_KEY`

#### OpenAI GPT-4
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add to `.env` as `VITE_OPENAI_API_KEY`

#### Anthropic Claude
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Create a new API key
3. Add to `.env` as `VITE_ANTHROPIC_API_KEY`

### 4. Run the Development Server
```bash
npm run dev
```

The app will open at `http://localhost:3000`

## Usage

1. **Enter Your Goal**: Type what you want to achieve
2. **Choose Settings**: Select personality mode and Suits character
3. **Click "Litt Me 🔥"**: Get AI-generated motivation
4. **Explore Options**: 
   - "Litt Me Again" for new responses
   - "Add Another Goal" to start fresh
   - View history in the right panel

## Features in Detail

### AI-Generated Content
- **Quotes**: Motivational quotes in the style of your chosen character
- **Roasts**: Savage but funny roasts about lack of determination
- **Plans**: 3-step strategic plans for achieving goals

### Interactive UI
- **Floating Chat**: Responds to typing, hovering, and clicking
- **Responsive Design**: Works on desktop and mobile
- **Smooth Animations**: Card hover effects and transitions

### History Management
- **Persistent Storage**: Goals saved in LocalStorage
- **Expandable Cards**: Click to see full responses
- **Timestamp Tracking**: See when each goal was created

## Customization

### Adding New Characters
Edit `src/data/suitsData.js` to add new Suits characters with their own quotes, roasts, and plans.

### Modifying AI Prompts
Update the prompt templates in `src/data/suitsData.js` to change how AI generates content.

### Styling Changes
Modify `src/index.css` and component styles to match your preferred design.

## Troubleshooting

### API Key Issues
- Ensure your API key is correctly added to `.env`
- Check that the API key has proper permissions
- Verify the API service is available

### No AI Content
- The app will show fallback responses if AI fails
- Check browser console for error messages
- Verify your internet connection

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for your own motivation needs!