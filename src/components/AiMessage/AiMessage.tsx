import Markdown from "react-markdown";
import style from "./markdown.module.css";
import { classNames } from "~/utils/classNames";
import { useIAStore } from "~/store/useIAStore";

const DEFAULT_MESSAGE =
  "Quer fazer um lanchinho mas está sem ideia ou com preguiça? Escreva os ingredientes que você tem e deixe a **Hungry Witch** criar uma receita deliciosa para você em segundos. ✨🧙‍♀️.";

const ERROR_MESSAGE = `
**Ops, ocorreu um erro inesperado**

Dessa vez nem mesmo a bruxinha foi capaz de prever 😅.

Já que a bruxinha não resolveu, você pode [abrir uma issue](https://github.com/ricardospalves/alura-hungry-witch/issues/new) para me avisar.
`;

export type AiMessageProps = {
  children?: string;
};

export const AiMessage = ({ children }: AiMessageProps) => {
  const { error } = useIAStore((state) => state);

  return (
    <div
      className={classNames([
        "p-4 text-base rounded border",
        error
          ? "border-red-300 bg-red-100"
          : "border-neutral-300 bg-neutral-100",
      ])}
    >
      <Markdown className={style.markdown}>
        {error ? ERROR_MESSAGE : children || DEFAULT_MESSAGE}
      </Markdown>
    </div>
  );
};
