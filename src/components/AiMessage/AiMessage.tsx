import Markdown from "react-markdown";
import style from "./markdown.module.css";

const DEFAULT_MESSAGE =
  "Quer fazer um lanchinho mas está sem ideia ou com preguiça? Escreva os ingredientes que você tem e deixe a **Hungry Witch** criar uma receita deliciosa para você em segundos. ✨🧙‍♀️.";

export type AiMessageProps = {
  children?: string;
};

export const AiMessage = ({ children }: AiMessageProps) => {
  return (
    <div className="p-4 text-base rounded bg-neutral-100 border border-neutral-300">
      <Markdown className={style.markdown}>
        {children || DEFAULT_MESSAGE}
      </Markdown>
    </div>
  );
};
