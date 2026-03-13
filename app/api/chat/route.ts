import { NextRequest, NextResponse } from 'next/server';
import { callGemini } from '@/lib/gemini';
import { ChatHistory } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history } = body as {
      message: string;
      history: ChatHistory[];
    };

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const response = await callGemini(message, history || []);
    return NextResponse.json({ response });
  } catch (error: unknown) {
    console.error('Chat API error:', error);
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
