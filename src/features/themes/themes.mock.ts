import type { Theme } from "./theme.types";

const MOCK_THEMES: Theme[] = [
  {
    id: 1,
    name: "Matemática aplicada",
    description:
      "Tema focado em problemas de matemática do cotidiano e modelagem básica.",
    categories: ["r1", "r2", "r3"],
  },
  {
    id: 2,
    name: "Leitura e interpretação",
    description:
      "Compreensão textual, inferência e análise de gêneros variados.",
    categories: ["r1", "r4"],
  },
  {
    id: 3,
    name: "Ciências da natureza",
    description: "Biologia, química e física em nível médio.",
    categories: ["r2", "r3", "r5", "r6"],
  },
];

const MOCK_DELAY_MS = 400;

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function listThemesMock(): Promise<Theme[]> {
  await delay(MOCK_DELAY_MS);
  return [...MOCK_THEMES];
}
