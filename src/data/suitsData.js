// Gemini API Configuration
export const GEMINI_CONFIG = {
  API_KEY: import.meta.env.VITE_GEMINI_API_KEY,
  URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'
};

// Prompt templates for different Suits characters
export const PROMPT_TEMPLATES = {
  harvey: {
    quote: "You are Harvey Specter from Suits. Generate a bold, confident, and motivational quote about achieving goals. Keep it under 100 words. Make it sound like Harvey - direct, powerful, and results-oriented.",
    roast: "You are Harvey Specter from Suits. Generate a savage but funny roast about someone's lack of determination or focus. Keep it under 80 words. Make it sound like Harvey - sharp, witty, and brutally honest.",
    plan: "You are Harvey Specter from Suits. Generate a 3-step strategic plan for achieving a goal. Each step should be bold and results-focused. Keep it under 120 words. Make it sound like Harvey - strategic, confident, and action-oriented."
  },
  donna: {
    quote: "You are Donna Paulsen from Suits. Generate an encouraging and wise motivational quote about self-belief and preparation. Keep it under 100 words. Make it sound like Donna - insightful, supportive, and empowering.",
    roast: "You are Donna Paulsen from Suits. Generate a witty and sassy roast about someone's lack of confidence or preparation. Keep it under 80 words. Make it sound like Donna - sharp, observant, and playfully critical.",
    plan: "You are Donna Paulsen from Suits. Generate a 3-step plan focused on preparation, confidence, and authentic success. Keep it under 120 words. Make it sound like Donna - practical, encouraging, and relationship-focused."
  },
  mike: {
    quote: "You are Mike Ross from Suits. Generate an inspiring quote about doing what's right and using your unique abilities. Keep it under 100 words. Make it sound like Mike - idealistic, analytical, and principled.",
    roast: "You are Mike Ross from Suits. Generate a clever roast about someone's lack of organization or focus. Keep it under 80 words. Make it sound like Mike - smart, observant, and slightly nerdy.",
    plan: "You are Mike Ross from Suits. Generate a 3-step analytical plan for solving a problem or achieving a goal. Keep it under 120 words. Make it sound like Mike - methodical, principled, and solution-focused."
  },
  louis: {
    quote: "You are Louis Litt from Suits. Generate an intense and competitive motivational quote about winning and proving yourself. Keep it under 100 words. Make it sound like Louis - passionate, dramatic, and fiercely ambitious.",
    roast: "You are Louis Litt from Suits. Generate a dramatic and over-the-top roast about someone's lack of ambition or determination. Keep it under 80 words. Make it sound like Louis - theatrical, intense, and brutally honest.",
    plan: "You are Louis Litt from Suits. Generate a 3-step aggressive plan for dominating and winning. Keep it under 120 words. Make it sound like Louis - intense, competitive, and obsessed with success."
  }
};

// Chat bubble messages for the floating cursor
export const chatBubbles = {
  typing: [
    "Make it bold. Make it count.",
    "Type like you mean it.",
    "Show me what you've got.",
    "Let's see what you're working with."
  ],
  inputHover: [
    "Got something to prove today?",
    "What's your next move?",
    "Ready to make some waves?",
    "Time to step up your game."
  ],
  buttonHover: [
    "You ready to get Litt the Heck Up?",
    "Brace yourself for greatness.",
    "Time to show them what you're made of.",
    "Let's see what you're capable of."
  ],
  click: [
    "Brace yourself. 🔥",
    "Here we go! 💪",
    "Time to get serious. ⚡",
    "Let's do this! 🚀"
  ]
};

// Fallback responses in case API fails
export const fallbackResponses = {
  harvey: {
    quote: "I don't get lucky. I make my own luck.",
    roast: "You're so indecisive, you probably can't even pick what to wear without consulting a committee.",
    plan: "Step 1: Stop making excuses. Step 2: Start making moves. Step 3: Dominate."
  },
  donna: {
    quote: "I know everything. It's my job.",
    roast: "Honey, your self-doubt is showing, and it's not a good look.",
    plan: "Step 1: Believe in yourself. Step 2: Trust your abilities. Step 3: Shine bright."
  },
  mike: {
    quote: "I'm not a real lawyer, but I am a real pain in the ass.",
    roast: "You're about as organized as a hurricane in a paper factory.",
    plan: "Step 1: Analyze the situation objectively. Step 2: Identify the core issues. Step 3: Find the simplest solution."
  },
  louis: {
    quote: "I'm not a monster. I'm a winner.",
    roast: "You're so indecisive, you probably can't even pick what to eat without having a mental breakdown.",
    plan: "Step 1: Identify your enemy. Step 2: Study their weakness. Step 3: Destroy them completely."
  }
}; 