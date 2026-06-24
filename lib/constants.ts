export const SITE = {
  name: "Imunisinos",
  slogan: "Há 40 anos mantendo seu ambiente mais saudável e harmonioso",
  description:
    "Controle de pragas, cupins, insetos e roedores no Vale dos Sinos, Vale do Paranhana e Serra Gaúcha. Empresa familiar há 40 anos no mercado.",
  region: "Vale dos Sinos, Vale do Paranhana e Serra Gaúcha",
};

export const CONTACT = {
  phoneDisplay: "(51) 3524-1049",
  phoneTel: "tel:+555135241049",
  whatsappNumber: "5551352410490",
  get whatsappUrl() {
    return `https://wa.me/${this.whatsappNumber}`;
  },
  whatsappUrlWithMessage: (message: string) =>
    `https://wa.me/5551352410490?text=${encodeURIComponent(message)}`,
};

export const SOCIAL = {
  instagram: "https://www.instagram.com/imunisinos/",
  facebook: "https://www.facebook.com/imunisinos/",
};

export const NAV_LINKS = [
  { href: "/institucional", label: "Início" },
  { href: "/a-imunisinos", label: "A Imunisinos" },
  { href: "/servicos", label: "Serviços" },
];
