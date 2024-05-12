import { SiGithub as GitHubIcon } from "react-icons/si";

export const Header = () => {
  return (
    <header className="shrink-0 px-1">
      <div className="max-w-5xl mx-auto h-12 py-1 flex items-center justify-between">
        <h1 className="text-2xl font-bold">✨🧙‍♀️ Hungry Witch</h1>

        <a
          href="https://github.com/ricardospalves/alura-hungry-witch"
          className="block size-8"
        >
          <span className="sr-only">Acessar o GitHub do projeto</span>
          <GitHubIcon className="block size-full" aria-hidden={true} />
        </a>
      </div>
    </header>
  );
};
