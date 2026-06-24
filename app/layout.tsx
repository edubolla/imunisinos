import type { Metadata } from "next";
import { Comfortaa, Assistant } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ImuniChat from "@/components/ImuniChat";
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
        <div className="sticky top-0 z-50">
          <ImuniChat />
          <Header />
        </div>
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
