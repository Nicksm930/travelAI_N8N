import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const url = `http://localhost:5678/webhook/b432fd00-d434-4be2-acd3-f6915f5dc66a?city=${data.city}&country=${data.country}`;
    
        const response = await fetch(url, {
          method: "GET",
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
    
        const output = await response.json();
        
    return NextResponse.json({ message: "Data received!", output });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Hello from GET!" });
}
