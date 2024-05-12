"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { AI_INSTRUCTION } from "~/constants/aiInstruction";

import { Header } from "~/components/Header/Header";
import { AiMessage } from "~/components/AiMessage/AiMessage";
import { Prompt } from "~/components/Prompt/Prompt";
import { useIAStore } from "~/store/useIAStore";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro-latest",
  generationConfig: { responseMimeType: "text/plain" },
  systemInstruction: AI_INSTRUCTION,
});

export default function Home() {
  const { aiResponse } = useIAStore((state) => state);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />

      <main className="flex flex-col grow h-[calc(100vh-3rem)] border-t border-neutral-500">
        <div className="max-w-3xl w-full mx-auto overflow-auto p-2">
          <AiMessage>{aiResponse}</AiMessage>
        </div>

        <Prompt />
      </main>
    </div>
  );
}
