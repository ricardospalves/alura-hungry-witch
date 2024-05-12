import { create } from "zustand";

type Prompt = string;
type AiResponse = string;
type Loading = boolean;

type UseIAStoreData = {
  prompt: Prompt;
  setPrompt: (prompt: Prompt) => void;
  aiResponse: AiResponse;
  setAIResponse: (aiResponse: AiResponse) => void;
  loading: Loading;
  setLoading: (loading: Loading) => void;
};

export const useIAStore = create<UseIAStoreData>((set) => {
  return {
    prompt: "",
    setPrompt(prompt) {
      return set({
        prompt,
      });
    },
    aiResponse: "",
    setAIResponse(aiResponse) {
      return set({ aiResponse });
    },
    loading: false,
    setLoading(loading) {
      return set({ loading });
    },
  };
});
