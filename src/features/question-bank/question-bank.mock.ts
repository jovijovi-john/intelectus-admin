import { QUESTION_BANK_LABELS } from "@/shared/data/anesthesiology-catalog";

import type { QuestionBankItem } from "./question-bank.types";

const [BANK_INTELLECTUS, BANK_SBA, BANK_INSTITUCIONAL] = QUESTION_BANK_LABELS;

const MOCK_QUESTION_BANK: QuestionBankItem[] = [
  {
    nome: BANK_INTELLECTUS,
    description:
      "Curadoria Intelectus com itens alinhados à taxonomia SBA (Pontos 8–14), com ênfase em farmacologia perioperatória e cenários de sala cirúrgica.",
    referenceYear: 2026,
    startYear: 2022,
    finishYear: 2026,
  },
  {
    nome: BANK_SBA,
    description:
      "Banco voltado à prova anual de revisão SBA: questões comentadas por tema (cardio, respiratório, anestésicos IV e inalatórios).",
    referenceYear: 2025,
    startYear: 2019,
    finishYear: 2025,
  },
  {
    nome: BANK_INSTITUCIONAL,
    description:
      "Casos clínicos institucionais (TEA e residência): vias aéreas difíceis, choque, bloqueios regionais e segurança do paciente.",
    referenceYear: 2026,
    startYear: 2024,
    finishYear: 2026,
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
