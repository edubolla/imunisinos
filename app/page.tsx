import type { Metadata } from "next";
import ImuniFullScreenChat from "@/components/ImuniFullScreenChat";

export const metadata: Metadata = {
  title: "Fale com a Imuni",
  description:
    "Converse agora com a Imuni, assistente virtual da Imunisinos, e tire suas dúvidas sobre controle de pragas, cupins, insetos e roedores.",
};

export default function ChatPage() {
  return <ImuniFullScreenChat />;
}
