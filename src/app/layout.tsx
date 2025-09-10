import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Introducción al Derecho - Plataforma de Estudio",
  description: "Plataforma educativa completa para el estudio de Introducción al Derecho con mapas conceptuales, flashcards, juegos y exámenes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}