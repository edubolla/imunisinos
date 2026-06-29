export default function WhatsAppLeadButton({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center self-start rounded-full bg-[#25D366] px-4 py-2 font-body text-xs font-bold text-white shadow-sm transition-transform hover:scale-105"
    >
      Falar com o Comercial pelo WhatsApp
    </a>
  );
}
