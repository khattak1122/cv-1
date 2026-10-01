import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text, type, jobTitle } = await req.json();

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Text is required to enhance." },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key is not configured." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    let systemInstruction = "";

    if (type === "about") {
      systemInstruction = `You are an expert executive resume writer. Enhance the user's professional summary / 'About Me' for a resume.
Keep it concise (2-4 sentences or short punchy paragraph), impactful, professional, and tailored for a ${jobTitle || "professional"}. Return ONLY the polished summary text. Do not wrap in quotes or add conversational filler.`;
    } else if (type === "experience") {
      systemInstruction = `You are an expert executive resume writer. Enhance the user's work experience entries for a resume. Use strong action verbs (e.g. Engineered, Spearheaded, Coordinated, Optimized, Managed) and quantifiable achievements where appropriate. Preserve the user's roles, company names, and dates, but upgrade the bullet points and descriptions to be crisp, recruiter-friendly, and professional. Return ONLY the enhanced experience text formatted cleanly with line breaks. Do not wrap in quotes or add conversational preamble.`;
    } else {
      systemInstruction = `You are an expert resume writer. Enhance and polish this resume text to sound highly professional, crisp, and compelling. Return ONLY the polished text with no preamble or commentary.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${systemInstruction}\n\nUser input:\n"""\n${text}\n"""`,
            },
          ],
        },
      ],
    });

    const enhanced = response.text?.trim() || text;
    return NextResponse.json({ enhanced });
  } catch (err: unknown) {
    console.error("AI enhancement error:", err);
    return NextResponse.json(
      { error: "Failed to enhance content. Please try again." },
      { status: 500 }
    );
  }
}
