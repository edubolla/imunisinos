import { CONTACT } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/icons/SocialIcons";

export default function WhatsAppButton() {
  return (
    <a
      href={CONTACT.whatsappUrlWithMessage(
        "Olá! Gostaria de solicitar um orçamento com a Imunisinos.",
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Imunisinos pelo WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-110 sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span className="sr-only">Falar com a Imunisinos pelo WhatsApp</span>
    </a>
  );
}
