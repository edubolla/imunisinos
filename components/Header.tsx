"use client";

import { useState } from "react";
import Link from "next/link";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { InstagramIcon, FacebookIcon } from "@/components/icons/SocialIcons";
import { CONTACT, NAV_LINKS, SOCIAL } from "@/lib/constants";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
          <ImageWithFallback
            src="/images/logo/logo_imunisinos.webp"
            alt="Logo da Imunisinos"
            width={56}
            height={56}
            fallbackLabel="Logo"
            className="h-14 w-14 rounded-md object-contain"
          />
          <span className="font-heading text-xl font-bold leading-tight text-secondary sm:text-2xl">
            Imunisinos
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-base font-semibold text-secondary transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center gap-3 text-secondary">
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Imunisinos"
              className="transition-colors hover:text-primary"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook da Imunisinos"
              className="transition-colors hover:text-primary"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
          </div>
          <a
            href={CONTACT.phoneTel}
            className="rounded-full bg-primary px-5 py-2.5 font-body text-sm font-bold text-white transition-colors hover:bg-primary-dark"
          >
            {CONTACT.phoneDisplay}
          </a>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md text-secondary lg:hidden"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-7 w-7">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="animate-slide-down border-t border-black/5 bg-white lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-2 py-3 font-body text-base font-semibold text-secondary hover:bg-primary-light hover:text-primary-dark"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={CONTACT.phoneTel}
              className="mt-2 rounded-full bg-primary px-5 py-3 text-center font-body text-sm font-bold text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              {CONTACT.phoneDisplay}
            </a>
            <div className="mt-3 flex items-center gap-4 px-2 text-secondary">
              <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram da Imunisinos">
                <InstagramIcon className="h-6 w-6" />
              </a>
              <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook da Imunisinos">
                <FacebookIcon className="h-6 w-6" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
