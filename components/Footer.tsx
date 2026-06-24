import Link from "next/link";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { InstagramIcon, FacebookIcon } from "@/components/icons/SocialIcons";
import { CONTACT, NAV_LINKS, SITE, SOCIAL } from "@/lib/constants";
import { services } from "@/lib/data/services";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <ImageWithFallback
              src="/images/logo/logo_imunisinos.webp"
              alt="Logo da Imunisinos"
              width={48}
              height={48}
              fallbackLabel="Logo"
              className="h-12 w-12 rounded-md object-contain"
            />
            <span className="font-heading text-xl font-bold">{SITE.name}</span>
          </div>
          <p className="mt-4 max-w-xs font-body text-sm text-white/70">{SITE.slogan}</p>
          <div className="mt-5 flex items-center gap-4">
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Imunisinos"
              className="text-white/80 transition-colors hover:text-primary"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook da Imunisinos"
              className="text-white/80 transition-colors hover:text-primary"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-primary">
            Institucional
          </h3>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="font-body text-sm text-white/80 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-primary">
            Serviços
          </h3>
          <ul className="mt-4 space-y-2">
            {services.slice(0, 6).map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/servicos/${service.slug}`}
                  className="font-body text-sm text-white/80 hover:text-white"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-primary">
            Contato
          </h3>
          <ul className="mt-4 space-y-2 font-body text-sm text-white/80">
            <li>
              <a href={CONTACT.phoneTel} className="hover:text-white">
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                WhatsApp: {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>{SITE.region}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-center font-body text-xs text-white/60 sm:flex-row sm:text-left">
          <p>
            © {year} {SITE.name}. Todos os direitos reservados.
          </p>
          <p>Controle de Pragas no Vale dos Sinos, Vale do Paranhana e Serra Gaúcha.</p>
        </div>
      </div>
    </footer>
  );
}
