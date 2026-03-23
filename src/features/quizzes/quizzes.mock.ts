import type { Quiz } from "./quiz.types";

const MOCK_QUIZZES: Quiz[] = [
  {
    id: "1",
    title: "Simulado ENEM — 1ª edição",
    description:
      "Prova completa com tempo de 5h30, todas as áreas do conhecimento e redação.",
    createdAt: "2024-01-10T08:00:00.000Z",
    createdBy: "Ana Silva",
    questionBanks: ["Prova anual", "Intelectus"],
    categories: ["Redação", "Matemática", "Ciências da natureza"],
    active: true,
  },
  {
    id: "2",
    title: "Simulado foco: Matemática e suas tecnologias",
    description:
      "Questões objetivas com ênfase em funções, geometria e estatística.",
    createdAt: "2024-02-05T14:00:00.000Z",
    createdBy: "Bruno Costa",
    questionBanks: ["Intelectus"],
    categories: ["Matemática"],
    active: true,
  },
  {
    id: "3",
    title: "Simulado Ciências da natureza",
    description: "Biologia, química e física em formato ENEM.",
    createdAt: "2024-02-28T11:30:00.000Z",
    createdBy: "Carla Mendes",
    questionBanks: ["Prova anual"],
    categories: ["Ciências da natureza"],
    active: false,
  },
  {
    id: "4",
    title: "Simulado Linguagens — segunda língua",
    description: "Inglês e Espanhol com interpretação de texto.",
    createdAt: "2024-03-15T09:45:00.000Z",
    createdBy: "Elena Ferreira",
    questionBanks: ["Prova anual", "Intelectus"],
    categories: ["Linguagens e códigos", "Inglês", "Espanhol"],
    active: true,
  },
  {
    id: "5",
    title: "Simulado Ciências humanas integrado",
    description: "História, geografia, filosofia e sociologia.",
    createdAt: "2024-04-01T16:00:00.000Z",
    createdBy: "Daniel Oliveira",
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

export async function listQuizzesMock(): Promise<Quiz[]> {
  await delay(MOCK_DELAY_MS);
  return [...MOCK_QUIZZES];
}
