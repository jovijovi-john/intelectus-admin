import type { QuestionBankItem } from "./question-bank.types";

const MOCK_QUESTION_BANK: QuestionBankItem[] = [
  {
    id: 1,
    description:
      "Conjunto de questões focado em raciocínio lógico e interpretação de textos. Inclui itens de múltipla escolha com quatro alternativas e questões dissertativas curtas.",
    referenceYear: 2024,
    startYear: 2020,
    finishYear: 2024,
  },
  {
    id: 2,
    description:
      "Banco voltado a matemática básica e geometria. As questões cobrem álgebra, funções, probabilidade e análise combinatória em nível médio.",
    referenceYear: 2023,
    startYear: 2018,
    finishYear: 2023,
  },
  {
    id: 3,
    description: "Itens de física: cinemática, dinâmica, energia e ondas.",
    referenceYear: 2025,
    startYear: 2022,
    finishYear: 2025,
  },
];

const MOCK_DELAY_MS = 400;

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function listQuestionBankMock(): Promise<QuestionBankItem[]> {
  await delay(MOCK_DELAY_MS);
  return [...MOCK_QUESTION_BANK];
}
