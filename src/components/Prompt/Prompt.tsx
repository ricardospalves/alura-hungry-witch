import { FormEvent, useId } from "react";
import { VscLoading as LoadingIcon } from "react-icons/vsc";
import { model } from "~/libs/gemini";
import { useIAStore } from "~/store/useIAStore";

export const Prompt = () => {
  const fieldId = useId();
  const {
    loading,
    prompt,
    setAIResponse,
    setLoading,
    setPrompt,
    setError,
    error,
  } = useIAStore((state) => state);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    try {
      const chat = model.startChat();
      const result = await chat.sendMessageStream(prompt);
      const response = result.stream;
      let streamResponse = "";

      setAIResponse("");

      for await (const chunk of response) {
        streamResponse += chunk.text();

        setAIResponse(streamResponse);
      }

      setPrompt("");
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className=" shrink-0 mt-auto py-2 border-t border-neutral-500 px-1"
      onSubmit={handleFormSubmit}
    >
      <div className="max-w-3xl w-full mx-auto flex items-end gap-2">
        <div className="grow">
          <label className="block pb-1" htmlFor={fieldId}>
            Quais são os seus ingredientes?
          </label>

          <input
            type="text"
            id={fieldId}
            className="w-full block border border-black h-12 rounded-full px-4 disabled:opacity-50 disabled:cursor-not-allowed"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={error || loading}
            placeholder="ex.: Banana e leite"
            required
            autoFocus
          />
        </div>

        <button
          type="submit"
          className="flex items-center justify-center px-4 h-12 rounded-full bg-black text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={error || loading}
        >
          {loading ? (
            <LoadingIcon className="block shrink-0 size-6 fill-current animate-spin" />
          ) : (
            <span className="block shrink-0">Enviar</span>
          )}
        </button>
      </div>
    </form>
  );
};
