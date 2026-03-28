import { QUESTION_BANK_LABELS } from "@/shared/data/anesthesiology-catalog";

import type { Quiz } from "./quiz.types";

const [BANK_INTELLECTUS, BANK_SBA, BANK_INSTITUCIONAL] = QUESTION_BANK_LABELS;

const MOCK_QUIZZES: Quiz[] = [
  {
    id: "1",
    title: "Simulado SBA — bloco cardiocirculatório e vasoativos",
    description:
      "Questões objetivas sobre débito cardíaco, hemodinâmica e uso de inotrópicos e vasopressores (Pontos 9 e 9.8).",
    createdAt: "2026-01-10T08:00:00.000Z",
    createdBy: "Dra. Ana Silva",
    questionBanks: [BANK_SBA, BANK_INTELLECTUS],
    themes: [
      "Ponto 9 — Cardiocirculatório: débito e hemodinâmica",
      "Ponto 9.8 — Inotrópicos e vasopressores",
    ],
    categories: ["R2", "R3"],
    active: true,
  },
  {
    id: "2",
    title: "Simulado: mecânica respiratória e farmacologia pulmonar",
    description:
      "Ênfase em ventilação, complacência e agentes broncodilatadores (Ponto 10).",
    createdAt: "2026-02-05T14:00:00.000Z",
    createdBy: "Dr. Bruno Costa",
    questionBanks: [BANK_INTELLECTUS],
    themes: ["Ponto 10 — Mecânica e ventilação pulmonar"],
    categories: ["R1", "R2"],
    active: true,
  },
  {
    id: "3",
    title: "Simulado TEA/TSA — bases farmacológicas",
    description:
      "Farmacologia geral aplicada à anestesia e introdução a anestésicos venosos (Pontos 11 e 12).",
    createdAt: "2026-02-28T11:30:00.000Z",
    createdBy: "Dra. Carla Mendes",
    questionBanks: [BANK_SBA],
    themes: [
      "Ponto 11 — Farmacologia geral",
      "Ponto 12 — Anestésicos venosos e opioides",
    ],
    categories: ["TEA/TSA", "R1"],
    active: false,
  },
  {
    id: "4",
    title: "Simulado inalatórios, MAC e anestésicos locais",
    description:
      "Cobertura dos Pontos 13 e 14: agentes inalatórios, CAM e toxicidade de locais.",
    createdAt: "2026-03-15T09:45:00.000Z",
    createdBy: "Dra. Elena Ferreira",
    questionBanks: [BANK_INTELLECTUS, BANK_INSTITUCIONAL],
    themes: [
      "Ponto 13 — Anestésicos inalatórios e CAM (MAC)",
      "Ponto 14 — Anestésicos locais e bloqueios",
    ],
    categories: ["R2", "R3"],
    active: true,
  },
  {
    id: "5",
    title: "Simulado integrado — SNC, autônomo e monitorização",
    description:
      "Revisão do Ponto 8 e integração com cenários clínicos de instabilidade hemodinâmica.",
    createdAt: "2026-04-01T16:00:00.000Z",
    createdBy: "Dr. Daniel Oliveira",
    questionBanks: [BANK_INSTITUCIONAL],
    themes: [
      "Ponto 8 — SNC e sistema nervoso autônomo",
      "Ponto 9 — Cardiocirculatório: débito e hemodinâmica",
    ],
    categories: ["R1", "R2", "TEA/TSA"],
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
