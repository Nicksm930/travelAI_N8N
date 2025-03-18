import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const url = `https://nick07.app.n8n.cloud/webhook/places?city=${data.city}&country=${data.country}`;
    
        const response = await fetch(url, {
          method: "GET",
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
    
        const output = await response.json();
        
    return NextResponse.json({ message: "Data received!", output });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Hello from GET!" });
}
