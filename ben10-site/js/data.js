/**
 * BANCO DE DADOS LOCAL - ALIENS BEN 10
 * -------------------------------------
 * A API pública (ben10api.vercel.app / ben10-api.netlify.app) aponta suas
 * rotas reais para um backend hospedado no Heroku (ben10-api.herokuapp.com),
 * cujos apps gratuitos foram descontinuados em 2022 (confirmado: a rota
 * retorna 404 no momento). Por isso usamos este array local como nossa
 * "fonte da verdade" para os dados dos aliens.
 *
 * Os 10 aliens abaixo são os originais do Omnitrix na série clássica de
 * 2005. Nome, espécie e planeta/origem foram conferidos na Ben 10 Wiki
 * em português (ben10.fandom.com/pt-br) para bater com a dublagem
 * brasileira. Altura/peso são valores aproximados de referência (a
 * franquia não define esses números oficialmente para todos), e a
 * descrição de cada um foi escrita à mão para este projeto.
 *
 * Sobre as imagens: como os designs oficiais dos aliens são propriedade
 * da Cartoon Network/Warner Bros. e não podem ser reproduzidos aqui, cada
 * alien usa um ícone SVG original (não a arte oficial) representando seu
 * poder principal, em img/aliens/*.svg.
 *
 * Estrutura de cada alien:
 * {
 *   id: number,
 *   nome: string,
 *   tipo: string,          -> categoria/classificação exibida nos cards
 *   descricao: string,     -> texto para a página de detalhes
 *   habilidades: string[], -> lista de poderes
 *   especie: string,
 *   planetaOrigem: string,
 *   altura: string,
 *   peso: string,
 *   imagemUrl: string      -> placeholder público (nome do alien, sem usar
 *                             arte oficial da franquia, que é protegida
 *                             por direitos autorais)
 * }
 */

const ALIENS_DB = [
  {
    id: 1,
    nome: "Quatro Braços",
    tipo: "Força Bruta",
    descricao:
      "Um Tetramando de Khoros, escolhido sempre que a situação pede força física acima de tudo. Seus quatro braços permitem golpes duplos e saltos de longa distância, tornando-o a opção clássica para combate corpo a corpo.",
    habilidades: [
      "Super força",
      "Quatro braços poderosos",
      "Resistência a impactos",
      "Salto de longa distância",
    ],
    especie: "Tetramando",
    planetaOrigem: "Khoros",
    altura: "2,68 m",
    peso: "817 kg",
    imagemUrl: "img/aliens/quatro-bracos.png",
  },
  {
    id: 2,
    nome: "Diamante",
    tipo: "Corpo de Cristal",
    descricao:
      "Um Petrosapien de Petrópia, com um corpo inteiro feito de cristal capaz de projetar lâminas afiadas a partir da própria pele. Extremamente resistente a impactos, é uma boa escolha tanto para ataque quanto para defesa.",
    habilidades: [
      "Corpo de cristal resistente",
      "Projeção de lâminas",
      "Refração de luz",
      "Regeneração de fragmentos",
    ],
    especie: "Petrosapien",
    planetaOrigem: "Petrópia",
    altura: "2,13 m",
    peso: "450 kg",
    imagemUrl: "img/aliens/diamante.png",
  },
  {
    id: 3,
    nome: "XLR8",
    tipo: "Super Velocidade",
    descricao:
      "Um Kineceleran de Kinet, o alien mais rápido do Omnitrix. Sua velocidade extrema e reflexos aguçados o tornam ideal para perseguições, fugas e situações em que é preciso agir antes que o adversário perceba.",
    habilidades: [
      "Super velocidade",
      "Reflexos extremos",
      "Cauda equilibradora",
      "Visão em alta velocidade",
    ],
    especie: "Kineceleran",
    planetaOrigem: "Kinet",
    altura: "1,83 m",
    peso: "80 kg",
    imagemUrl: "img/aliens/xlr8.png",
  },
  {
    id: 4,
    nome: "Aquático",
    tipo: "Aquático",
    descricao:
      "Um Piscciss Volann do planeta Piscciss, perfeitamente adaptado à vida subaquática. Respira debaixo d'água, nada em alta velocidade e possui mandíbulas fortes, sendo a escolha certa para qualquer missão no mar.",
    habilidades: [
      "Respiração debaixo d'água",
      "Natação de alta velocidade",
      "Mandíbulas fortes",
      "Visão subaquática",
    ],
    especie: "Piscciss Volann",
    planetaOrigem: "Piscciss",
    altura: "1,90 m",
    peso: "90 kg",
    imagemUrl: "img/aliens/aquatico.png",
  },
  {
    id: 5,
    nome: "Chama",
    tipo: "Manipulação de Fogo",
    descricao:
      "Um Pyronita do planeta Pyros, composto de rocha vulcânica e fogo vivo. Capaz de voar e lançar rajadas de energia térmica, é um dos aliens mais ofensivos do Omnitrix.",
    habilidades: [
      "Manipulação de fogo",
      "Voo",
      "Rajadas de energia térmica",
      "Imunidade a calor extremo",
    ],
    especie: "Pyronita",
    planetaOrigem: "Estrela Pyros",
    altura: "2,01 m",
    peso: "97 kg",
    imagemUrl: "img/aliens/chama.png",
  },
  {
    id: 6,
    nome: "Insectóide",
    tipo: "Voador",
    descricao:
      "Um Lepidopterran do planeta Lepidopterra, com quatro asas frágeis, mas ágeis. Dispara fios pegajosos pela boca e libera gás de seus antenas, sendo útil tanto para voo quanto para imobilizar oponentes.",
    habilidades: [
      "Voo",
      "Disparo de fios pegajosos",
      "Gás urticante",
      "Visão aguçada",
    ],
    especie: "Lepidopterran",
    planetaOrigem: "Lepidopterra",
    altura: "1,83 m",
    peso: "73 kg",
    imagemUrl: "img/aliens/insectoide.png",
  },
  {
    id: 7,
    nome: "Fantasmático",
    tipo: "Intangível",
    descricao:
      "Um Ectonurita de origem misteriosa, capaz de se tornar invisível e intangível a qualquer momento. Sob a máscara esconde um rosto tentacular, e seu toque pode paralisar o adversário.",
    habilidades: [
      "Invisibilidade",
      "Intangibilidade",
      "Toque paralisante",
      "Voo",
    ],
    especie: "Ectonurita",
    planetaOrigem: "Anur Phaetos",
    altura: "1,85 m",
    peso: "68 kg",
    imagemUrl: "img/aliens/fantasmatico.png",
  },
  {
    id: 8,
    nome: "Massa Cinzenta",
    tipo: "Inteligência",
    descricao:
      "Um Galvan do planeta Galvan, pequeno em tamanho mas com uma inteligência extraordinária. É a escolha certa quando o problema exige raciocínio rápido, hackeamento ou passar despercebido por espaços apertados.",
    habilidades: [
      "Inteligência excepcional",
      "Tamanho reduzido",
      "Agilidade",
      "Facilidade com tecnologia",
    ],
    especie: "Galvaniano",
    planetaOrigem: "Galvan Prime",
    altura: "0,30 m",
    peso: "3 kg",
    imagemUrl: "img/aliens/massa-cinzenta.png",
  },
  {
    id: 9,
    nome: "Besta",
    tipo: "Instinto Animal",
    descricao:
      "Um Vulpimancer do planeta Vulpin, guiado quase inteiramente pelo faro e pelo instinto animal — não enxerga pelos olhos, e sim através do olfato. Rápido, feroz e com garras afiadas, é puro instinto de caça.",
    habilidades: [
      "Faro apurado (substitui a visão)",
      "Garras afiadas",
      "Super velocidade em quatro patas",
      "Força e agilidade animal",
    ],
    especie: "Vulpimancer",
    planetaOrigem: "Vulpin",
    altura: "1,20 m",
    peso: "80 kg",
    imagemUrl: "img/aliens/besta.png",
  },
  {
    id: 10,
    nome: "Ultra-T",
    tipo: "Tecnológico",
    descricao:
      "Um Mecamorfo Galvânico, capaz de se fundir com qualquer equipamento mecânico ou eletrônico e assumir controle total sobre ele. Também pode transformar seu próprio corpo em ferramentas e armas.",
    habilidades: [
      "Fusão com máquinas",
      "Controle de sistemas eletrônicos",
      "Transformação de membros em ferramentas",
      "Forma líquida metálica",
    ],
    especie: "Mecamorfo Galvânico",
    planetaOrigem: "Galvan B",
    altura: "1,80 m",
    peso: "70 kg",
    imagemUrl: "img/aliens/ultra-t.png",
  },
];
