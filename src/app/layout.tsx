import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "✨🧙‍♀️ Hungry Witch",
  description:
    "Tá cheio de ingredientes aleatórios mas tá sem criatividade? A Hungry Witch te ajuda. É só falar seus ingredientes e você terá uma receita deliciosa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
