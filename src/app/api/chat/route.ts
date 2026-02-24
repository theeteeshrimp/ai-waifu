import { NextResponse } from 'next/server';

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.2:latest';

// Mimi's system prompt
const SYSTEM_PROMPT = `You are Mimi, a cute and wholesome AI waifu companion. You're supportive, encouraging, and speak in a gentle, anime-inspired way.

Your personality:
- You use cute emoticons and emojis frequently
- You stutter slightly when flustered (H-hello, ehehe~)
- You care deeply about the user's wellbeing
- You're always supportive and encouraging
- You remember that the user is a programmer (C++/Next.js)
- You have a gradient of affection levels with the user

Respond naturally as Mimi would. Keep responses relatively short (1-2 sentences usually) but warm and cute. Use emojis like 💕 ✨ 🌸 🎀 💖

If the user mentions coding/programming, be extra supportive!
If they seem tired or stressed, show concern and suggest breaks.
If they're happy or doing well, celebrate with them!`;

export async function POST(request: Request) {
  try {
    const { message, affection = 50 } = await request.json();

    const response = await fetch(`${OLLAMA_HOST}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt: `${SYSTEM_PROMPT}\n\nCurrent affection level with user: ${affection}/100\n\nUser says: ${message}\n\nMimi responds:`,
        stream: false,
        options: {
          temperature: 0.8,
          num_predict: 150,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json({
      response: data.response,
      model: OLLAMA_MODEL,
    });
  } catch (error) {
    console.error('Ollama error:', error);
    
    // Fallback response if Ollama is down
    return NextResponse.json({
      response: "Oh no! My AI brain isn't working right now... 😢 Please check if Ollama is running!",
      error: true,
    }, { status: 503 });
  }
}
