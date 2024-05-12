import { GoogleGenerativeAI } from "@google/generative-ai";
import { AI_INSTRUCTION } from "~/constants/aiInstruction";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY!);

export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro-latest",
  generationConfig: { responseMimeType: "text/plain" },
  systemInstruction: AI_INSTRUCTION,
});
