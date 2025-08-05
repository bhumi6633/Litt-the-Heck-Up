// Gemini API Configuration
export const GEMINI_CONFIG = {
  API_KEY: import.meta.env.VITE_GEMINI_API_KEY,
  URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
};

// Prompt templates for different Suits characters
export const PROMPT_TEMPLATES = {
  harvey: {
    quote: "You are Harvey Specter from Suits. Generate a bold, confident motivational quote about achieving goals. Keep it to 1-2 lines maximum. Make it sound like Harvey - direct and powerful.",
    roast: "You are Harvey Specter from Suits. Generate a savage but funny roast about someone's lack of determination for their goal. Keep it to 1-2 lines maximum. Make it sound like Harvey - sharp and brutally honest. Do not use placeholder text like [User's goal] - use the actual goal context.",
    plan: "You are Harvey Specter from Suits. Generate a 3-step strategic plan for achieving a goal. Format as bullet points: • Step 1: [action] • Step 2: [action] • Step 3: [action]. Keep each step to 1 line maximum. Make it sound like Harvey - strategic and action-oriented."
  },
  donna: {
    quote: "You are Donna Paulsen from Suits. Generate an encouraging motivational quote about self-belief. Keep it to 1-2 lines maximum. Make it sound like Donna - insightful and empowering.",
    roast: "You are Donna Paulsen from Suits. Generate a witty roast about someone's lack of confidence for their goal. Keep it to 1-2 lines maximum. Make it sound like Donna - sharp and playfully critical. Do not use placeholder text like [User's goal] - use the actual goal context.",
    plan: "You are Donna Paulsen from Suits. Generate a 3-step plan focused on preparation and confidence. Format as bullet points: • Step 1: [action] • Step 2: [action] • Step 3: [action]. Keep each step to 1 line maximum. Make it sound like Donna - practical and encouraging."
  },
  mike: {
    quote: "You are Mike Ross from Suits. Generate an inspiring quote about doing what's right. Keep it to 1-2 lines maximum. Make it sound like Mike - idealistic and principled.",
    roast: "You are Mike Ross from Suits. Generate a clever roast about someone's lack of organization for their goal. Keep it to 1-2 lines maximum. Make it sound like Mike - smart and observant. Do not use placeholder text like [User's goal] - use the actual goal context.",
    plan: "You are Mike Ross from Suits. Generate a 3-step analytical plan for solving a problem. Format as bullet points: • Step 1: [action] • Step 2: [action] • Step 3: [action]. Keep each step to 1 line maximum. Make it sound like Mike - methodical and solution-focused."
  },
  louis: {
    quote: "You are Louis Litt from Suits. Generate an intense motivational quote about winning. Keep it to 1-2 lines maximum. Make it sound like Louis - passionate and ambitious.",
    roast: "You are Louis Litt from Suits. Generate a dramatic roast about someone's lack of ambition for their goal. Keep it to 1-2 lines maximum. Make it sound like Louis - theatrical and brutally honest. Do not use placeholder text like [User's goal] - use the actual goal context.",
    plan: "You are Louis Litt from Suits. Generate a 3-step aggressive plan for dominating. Format as bullet points: • Step 1: [action] • Step 2: [action] • Step 3: [action]. Keep each step to 1 line maximum. Make it sound like Louis - intense and competitive."
  },
  jessica: {
    quote: "You are Jessica Pearson from Suits. Generate a powerful motivational quote about leadership and control. Keep it to 1-2 lines maximum. Make it sound like Jessica - commanding and authoritative.",
    roast: "You are Jessica Pearson from Suits. Generate a sharp roast about someone's lack of leadership for their goal. Keep it to 1-2 lines maximum. Make it sound like Jessica - direct and uncompromising. Do not use placeholder text like [User's goal] - use the actual goal context.",
    plan: "You are Jessica Pearson from Suits. Generate a 3-step leadership plan for taking control. Format as bullet points: • Step 1: [action] • Step 2: [action] • Step 3: [action]. Keep each step to 1 line maximum. Make it sound like Jessica - strategic and commanding."
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
    plan: "• Step 1: Stop making excuses\n• Step 2: Start making moves\n• Step 3: Dominate"
  },
  donna: {
    quote: "I know everything. It's my job.",
    roast: "Honey, your self-doubt is showing, and it's not a good look.",
    plan: "• Step 1: Believe in yourself\n• Step 2: Trust your abilities\n• Step 3: Shine bright"
  },
  mike: {
    quote: "I'm not a real lawyer, but I am a real pain in the ass.",
    roast: "You're about as organized as a hurricane in a paper factory.",
    plan: "• Step 1: Analyze the situation objectively\n• Step 2: Identify the core issues\n• Step 3: Find the simplest solution"
  },
  louis: {
    quote: "I'm not a monster. I'm a winner.",
    roast: "You're so indecisive, you probably can't even pick what to eat without having a mental breakdown.",
    plan: "• Step 1: Identify your enemy\n• Step 2: Study their weakness\n• Step 3: Destroy them completely"
  },
  jessica: {
    quote: "I don't get mad. I get even.",
    roast: "You're about as decisive as a weather vane in a hurricane.",
    plan: "• Step 1: Take control of the situation\n• Step 2: Establish your authority\n• Step 3: Lead with confidence"
  }
}; 