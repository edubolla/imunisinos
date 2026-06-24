import type { Metadata } from "next";
import { Comfortaa, Assistant } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/constants";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-comfortaa",
  display: "swap",
});

const assistant = Assistant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-assistant",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | Controle de Pragas no Vale dos Sinos`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${comfortaa.variable} ${assistant.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
