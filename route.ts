import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get('topic');
  const difficulty = searchParams.get('difficulty');
  
  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${API}/api/quiz/generate?topic=${topic}&difficulty=${difficulty}&t=${Date.now()}`, {
    headers: {
      'Cache-Control': 'no-cache',
    },
  });
  const data = await res.json();
  
  return NextResponse.json(data);
}