import { create } from "zustand";

type Prompt = string;
type AiResponse = string;
type Loading = boolean;
type ErrorData = boolean;

type UseIAStoreData = {
  prompt: Prompt;
  setPrompt: (prompt: Prompt) => void;
  aiResponse: AiResponse;
  setAIResponse: (aiResponse: AiResponse) => void;
  loading: Loading;
  setLoading: (loading: Loading) => void;
  error: ErrorData;
  setError: (error: ErrorData) => void;
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
    error: false,
    setError(error) {
      return set({ error });
    },
  };
});
