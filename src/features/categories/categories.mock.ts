import type { Category } from "./category.types";

const MOCK_CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Redação",
    description:
      "Produção textual dissertativa-argumentativa e competências de escrita.",
  },
  {
    id: "2",
    name: "Matemática",
    description: "Álgebra, geometria, estatística e raciocínio lógico quantitativo.",
  },
  {
    id: "3",
    name: "Ciências da natureza",
    description: "Biologia, química e física em nível médio e vestibulares.",
  },
  {
    id: "4",
    name: "Ciências humanas",
    description: "História, geografia, filosofia e sociologia aplicadas ao ENEM.",
  },
  {
    id: "5",
    name: "Linguagens e códigos",
    description: "Português, literatura, artes e tecnologias da comunicação.",
  },
  {
    id: "6",
    name: "Atualidades",
    description: "Contexto político, econômico e social para interpretação de textos.",
  },
  {
    id: "7",
    name: "Inglês",
    description: "Leitura, vocabulário e estruturas para provas objetivas.",
  },
  {
    id: "8",
    name: "Espanhol",
    description: "Compreensão textual e gramática essencial para vestibulares.",
  },
];

const MOCK_DELAY_MS = 400;

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function listCategoriesMock(): Promise<Category[]> {
  await delay(MOCK_DELAY_MS);
  return [...MOCK_CATEGORIES];
}
