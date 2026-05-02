import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get('topic');
  const difficulty = searchParams.get('difficulty');
  
  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const res = await fetch(`${API}/api/quiz/generate?topic=${topic}&difficulty=${difficulty}`);
  const data = await res.json();
  
  return NextResponse.json(data);
}