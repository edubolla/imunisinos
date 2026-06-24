export type TeamMember = {
  name: string;
  role: string;
  image: string;
  imageAlt: string;
};

export const teamMembers: TeamMember[] = [
  {
    name: "Alan de Sá",
    role: "Sócio-gestor",
    image: "/images/equipe/alan-de-sa.webp",
    imageAlt: "Foto de Alan de Sá, sócio-gestor da Imunisinos",
  },
  {
    name: "Renata de Sá",
    role: "Sócia-gestora",
    image: "/images/equipe/renata-de-sa.webp",
    imageAlt: "Foto de Renata de Sá, sócia-gestora da Imunisinos",
  },
];
