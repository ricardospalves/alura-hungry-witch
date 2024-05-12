import { FormEvent, useId } from "react";
import { VscLoading as LoadingIcon } from "react-icons/vsc";
import { model } from "~/libs/gemini";
import { useIAStore } from "~/store/useIAStore";

export const Prompt = () => {
  const fieldId = useId();
  const { loading, prompt, setAIResponse, setLoading, setPrompt } = useIAStore(
    (state) => state
  );

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

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
    setLoading(false);
  };

  return (
    <form
      className=" shrink-0 mt-auto py-2 border-t border-neutral-500"
      onSubmit={handleFormSubmit}
    >
      <div className="max-w-3xl w-full mx-auto flex items-end gap-2">
        <div className="grow">
          <label className="block pb-1" htmlFor={fieldId}>
            Escreva os seus ingredientes e deixe a{" "}
            <abbr title="Inteligência Artificial">IA</abbr> criar uma receita
            deliciosa para você! 😋
          </label>

          <input
            type="text"
            id={fieldId}
            className="w-full block border border-black h-12 rounded-full px-4 disabled:bg-gray-400"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
            placeholder="ex.: Banana e leite"
            required
            autoFocus
          />
        </div>

        <button
          type="submit"
          className="flex items-center justify-center px-4 h-12 rounded-full bg-black text-white font-bold disabled:bg-gray-700"
          disabled={loading}
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
