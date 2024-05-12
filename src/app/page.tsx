"use client";

import { useId, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AI_INSTRUCTION } from "~/constants/aiInstruction";
import Markdown from "react-markdown";
import style from "./markdown.module.css";
import { VscLoading } from "react-icons/vsc";
import { Header } from "~/components/Header/Header";

const INITIAL_MESSAGE =
  "Que tal me dizer quais ingredientes você tem em casa, e eu crio uma receita deliciosa para você? 🥕🫑🧅🧄.";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro-latest",
  generationConfig: { responseMimeType: "text/plain" },
  systemInstruction: AI_INSTRUCTION,
});

export default function Home() {
  const fieldId = useId();
  const [input, setInput] = useState("");
  const [responseData, setResponseData] = useState("");
  const [loading, setLoading] = useState(false);
  const runChat = async () => {
    setLoading(true);
    const chat = model.startChat();
    const result = await chat.sendMessageStream(input);
    const response = result.stream;

    setResponseData("");

    for await (const chunk of response) {
      setResponseData((previous) => {
        return `${previous}${chunk.text()}`;
      });
    }

    setInput("");
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />

      <main className="flex flex-col grow h-[calc(100vh-3rem)] border-t border-neutral-500">
        <div className="max-w-3xl w-full mx-auto overflow-auto p-2">
          <div className="p-4 rounded bg-neutral-100 border border-neutral-300">
            <Markdown className={style.markdown}>
              {responseData || INITIAL_MESSAGE}
            </Markdown>
          </div>
        </div>

        <form
          className=" shrink-0 mt-auto py-2 border-t border-neutral-500"
          onSubmit={(event) => {
            event.preventDefault();
            runChat();
          }}
        >
          <div className="max-w-3xl w-full mx-auto flex items-end gap-2">
            <div className="grow">
              <label className="block pb-1" htmlFor={fieldId}>
                Escreva os seus ingredientes e deixe IA criar uma receita
                deliciosa para você! 😋
              </label>

              <input
                type="text"
                id={fieldId}
                className="w-full block border border-black h-12 rounded-full px-4 disabled:bg-gray-400"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                placeholder="ex.: Banana e leite"
                required
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="block px-4 h-12 rounded-full bg-black text-white font-bold disabled:bg-gray-700"
              disabled={loading}
            >
              {loading ? (
                <VscLoading className="block size-6 fill-current animate-spin" />
              ) : (
                "Enviar"
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
