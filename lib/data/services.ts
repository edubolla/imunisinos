export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  heroDescription: string;
  image: string;
  imageAlt: string;
  highlights: string[];
  howItWorks: string[];
  idealFor: string;
};

export const services: Service[] = [
  {
    slug: "controle-integrado-de-pragas",
    title: "Controle Integrado de Pragas (CIP)",
    shortDescription:
      "Solução abrangente que previne e controla pragas como insetos, roedores e outros vetores, combinando métodos preventivos e corretivos.",
    heroDescription:
      "O CIP é o nosso programa mais completo: uma combinação de métodos preventivos e corretivos para manter o seu ambiente protegido o ano todo, com visitas periódicas e monitoramento contínuo.",
    image: "/images/servicos/controle_integrado_de_pragas_01.jpg",
    imageAlt: "Técnico da Imunisinos monitorando estação de controle de pragas com leitor de QR code",
    highlights: [
      "Visitas periódicas programadas",
      "Monitoramento contínuo do ambiente",
      "Métodos preventivos e corretivos combinados",
      "Indicado para residências, empresas e indústrias",
    ],
    howItWorks: [
      "Inspeção inicial para identificar pontos de risco e espécies presentes",
      "Elaboração de um plano de controle sob medida para o ambiente",
      "Aplicação de métodos preventivos e corretivos com produtos regulamentados",
      "Visitas periódicas de monitoramento e ajuste do plano quando necessário",
    ],
    idealFor:
      "Ideal para quem quer manter o ambiente protegido o ano todo, sem precisar se preocupar com novas infestações.",
  },
  {
    slug: "controle-de-cupins",
    title: "Controle de Cupins",
    shortDescription:
      "Controle completo, desde a inspeção até a aplicação de barreiras químicas e tratamentos especializados.",
    heroDescription:
      "Os cupins podem comprometer a estrutura de imóveis sem dar sinais visíveis até que o estrago já esteja avançado. Por isso, atuamos desde a inspeção detalhada até a aplicação de barreiras químicas e tratamentos especializados.",
    image: "/images/servicos/como-acabar-com-os-cupins.jpg",
    imageAlt: "Cupins em madeira infestada, foco do serviço de controle de cupins",
    highlights: [
      "Inspeção detalhada de estruturas e fundações",
      "Barreiras químicas de proteção",
      "Tratamentos especializados conforme a espécie identificada",
      "Indicado para residências, empresas e imóveis em construção",
    ],
    howItWorks: [
      "Inspeção da estrutura para identificar focos e rota de infestação",
      "Definição do tratamento mais adequado (barreira química, localizado ou preventivo)",
      "Aplicação do tratamento por equipe especializada",
      "Acompanhamento para garantir a eliminação completa da colônia",
    ],
    idealFor:
      "Indicado para quem identificou sinais de cupins ou quer proteger preventivamente uma construção nova ou existente.",
  },
  {
    slug: "sanitizacao-de-ambientes",
    title: "Sanitização de Ambientes",
    shortDescription:
      "Ambientes limpos e desinfectados, eliminando vírus, bactérias e fungos.",
    heroDescription:
      "Mais do que limpeza visual, a sanitização elimina vírus, bactérias e fungos que não são vistos a olho nu, tornando o ambiente realmente mais saudável para quem vive ou trabalha nele.",
    image: "/images/servicos/dedetizacao_01.jpg",
    imageAlt: "Técnico da Imunisinos aplicando sanitizante em ambiente residencial",
    highlights: [
      "Eliminação de vírus, bactérias e fungos",
      "Indicado para ambientes comerciais, residenciais e industriais",
      "Produtos seguros para pessoas e animais após o tempo de carência",
      "Reduz odores e contaminação cruzada",
    ],
    howItWorks: [
      "Avaliação do ambiente e definição das áreas críticas",
      "Aplicação de produto sanitizante regulamentado",
      "Tempo de carência conforme orientação técnica",
      "Liberação do ambiente para uso seguro",
    ],
    idealFor:
      "Indicado para comércios, escritórios, condomínios, indústrias e residências que buscam um ambiente mais saudável.",
  },
  {
    slug: "higienizacao-de-reservatorios-de-agua",
    title: "Higienização de Reservatórios de Água",
    shortDescription:
      "Limpeza de caixas d'água essencial para garantir a qualidade da água que você consome.",
    heroDescription:
      "A limpeza periódica da caixa d'água é essencial para garantir a qualidade da água que você consome e evitar a proliferação de bactérias, fungos e sedimentos no reservatório.",
    image: "/images/servicos/limpeza_agua_2.png",
    imageAlt: "Antes e depois da higienização de um reservatório de água da Imunisinos",
    highlights: [
      "Remoção de sedimentos, limo e impurezas",
      "Desinfecção do reservatório",
      "Recomendada a cada 6 meses",
      "Emissão de laudo técnico do serviço",
    ],
    howItWorks: [
      "Esvaziamento e remoção de sedimentos do reservatório",
      "Escovação e lavagem das paredes internas",
      "Desinfecção com produto apropriado",
      "Enxágue final e liberação para uso",
    ],
    idealFor:
      "Indicado para residências, condomínios e empresas que querem garantir a qualidade da água armazenada.",
  },
  {
    slug: "controle-de-insetos",
    title: "Controle de Insetos",
    shortDescription:
      "Eliminação de aranhas, baratas, formigas e outros insetos com técnicas modernas e seguras.",
    heroDescription:
      "Aranhas, baratas, formigas e outros insetos são eliminados com técnicas modernas e seguras: pulverização líquida, gel e métodos secos, escolhidos conforme o tipo de ambiente e infestação.",
    image: "/images/servicos/dedetizacao_02.jpg",
    imageAlt: "Técnico da Imunisinos realizando pulverização líquida para controle de insetos",
    highlights: [
      "Pulverização líquida, gel e métodos secos",
      "Controle de aranhas, baratas, formigas e outros insetos",
      "Técnicas seguras para pessoas e animais de estimação",
      "Indicado para residências, comércios e indústrias",
    ],
    howItWorks: [
      "Identificação da espécie e dos pontos de infestação",
      "Escolha da técnica mais adequada para o ambiente",
      "Aplicação por equipe especializada",
      "Orientações para evitar reinfestação",
    ],
    idealFor:
      "Indicado para quem percebeu a presença de aranhas, baratas, formigas ou outros insetos no ambiente.",
  },
  {
    slug: "controle-de-ratos",
    title: "Controle de Ratos",
    shortDescription:
      "Proteção contra roedores com inspeção especializada, iscas e armadilhas eficientes.",
    heroDescription:
      "Roedores representam risco à saúde e podem causar danos estruturais. Atuamos com inspeção especializada, iscas e armadilhas eficientes, além de monitoramento contínuo para evitar novas infestações.",
    image: "/images/servicos/controle_de_ratos_01.webp",
    imageAlt: "Técnico da Imunisinos removendo roedor capturado em armadilha de controle",
    highlights: [
      "Inspeção especializada de rotas e tocas",
      "Iscas e armadilhas eficientes e seguras",
      "Monitoramento contínuo pós-tratamento",
      "Indicado para residências, indústrias e comércios",
    ],
    howItWorks: [
      "Inspeção para identificar rotas, tocas e pontos de entrada",
      "Instalação de iscas e armadilhas em pontos estratégicos",
      "Monitoramento periódico da eficácia do controle",
      "Orientações para vedação de pontos de acesso",
    ],
    idealFor:
      "Indicado para quem identificou sinais de roedores ou quer prevenir novas infestações no ambiente.",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
