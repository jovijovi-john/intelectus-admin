import type { Question } from "./question.types";

const MOCK_QUESTIONS: Question[] = [
  {
    id: "1",
    code: "Q-2024-001",
    title:
      "Leia o texto e assinale a alternativa que melhor expressa a ideia central.",
    theme: "Linguagens e códigos",
    tag: "understand",
    language: "pt",
    createdAt: "2024-01-15T14:30:00.000Z",
    createdBy: "Ana Silva",
    questionBanks: ["Prova anual", "Intelectus"],
    categories: ["Redação", "Linguagens e códigos"],
    active: true,
  },
  {
    id: "2",
    code: "Q-2024-002",
    title: "Resolva a equação quadrática e indique o conjunto solução.",
    theme: "Matemática aplicada",
    tag: "apply",
    language: "pt",
    createdAt: "2024-02-03T09:15:00.000Z",
    createdBy: "Bruno Costa",
    questionBanks: ["Intelectus"],
    categories: ["Matemática"],
    active: false,
  },
  {
    id: "3",
    code: "Q-2024-003",
    title: "Defina os termos apresentados no primeiro parágrafo do excerto.",
    theme: "Leitura e interpretação",
    tag: "remember",
    language: "pt",
    createdAt: "2024-02-20T11:00:00.000Z",
    createdBy: "Ana Silva",
    questionBanks: ["Prova anual"],
    categories: ["Linguagens e códigos"],
    active: true,
  },
  {
    id: "4",
    code: "Q-2024-004",
    title:
      "Compare os dois gráficos e explique a relação entre as variáveis.",
    theme: "Ciências da natureza",
    tag: "analyze",
    language: "en",
    createdAt: "2024-03-01T16:45:00.000Z",
    createdBy: "Carla Mendes",
    questionBanks: ["Intelectus"],
    categories: ["Ciências da natureza", "Atualidades"],
    active: true,
  },
  {
    id: "5",
    code: "Q-2024-005",
    title: "Qual critério você usaria para julgar a qualidade do argumento?",
    theme: "Redação",
    tag: "evaluate",
    language: "pt",
    createdAt: "2024-03-10T08:20:00.000Z",
    createdBy: "Daniel Oliveira",
    questionBanks: ["Prova anual", "Intelectus"],
    categories: ["Redação"],
    active: false,
  },
  {
    id: "6",
    code: "Q-2024-006",
    title: "Proponha uma solução alternativa ao problema descrito no enunciado.",
    theme: "Matemática aplicada",
    tag: "create",
    language: "pt",
    createdAt: "2024-03-18T13:10:00.000Z",
    createdBy: "Bruno Costa",
    questionBanks: ["Prova anual", "Intelectus"],
    categories: ["Matemática", "Ciências da natureza"],
    active: true,
  },
  {
    id: "7",
    code: "Q-2024-007",
    title: "Identify the main verb tense used in the passage.",
    theme: "Inglês",
    tag: "remember",
    language: "en",
    createdAt: "2024-04-02T10:00:00.000Z",
    createdBy: "Elena Ferreira",
    questionBanks: ["Prova anual"],
    categories: ["Inglês"],
    active: true,
  },
  {
    id: "8",
    code: "Q-2024-008",
    title: "Interprete o mapa e responda: qual região apresenta maior densidade?",
    theme: "Ciências humanas",
    tag: "apply",
    language: "pt",
    createdAt: "2024-04-12T15:30:00.000Z",
    createdBy: "Carla Mendes",
    questionBanks: ["Intelectus"],
    categories: ["Ciências humanas", "Atualidades"],
    active: false,
  },
];

const MOCK_DELAY_MS = 400;

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function listQuestionsMock(): Promise<Question[]> {
  await delay(MOCK_DELAY_MS);
  return [...MOCK_QUESTIONS];
}
