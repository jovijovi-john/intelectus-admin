import { QUESTION_BANK_LABELS } from "@/shared/data/anesthesiology-catalog";

import type { Question } from "./question.types";

const [BANK_INTELLECTUS, BANK_SBA, BANK_INSTITUCIONAL] = QUESTION_BANK_LABELS;

const MOCK_QUESTIONS: Question[] = [
  {
    id: "1",
    code: "AN-2026-001",
    title:
      "Explique o papel do sistema nervoso autônomo na resposta hemodinâmica à laringoscopia.",
    theme: "Ponto 8 — SNC e sistema nervoso autônomo",
    tag: "understand",
    language: "pt",
    createdAt: "2026-01-15T14:30:00.000Z",
    createdBy: "Dra. Ana Silva",
    questionBanks: [BANK_INTELLECTUS, BANK_SBA],
    categories: ["R1", "R2"],
    active: true,
  },
  {
    id: "2",
    code: "AN-2026-002",
    title:
      "Calcule o débito cardíaco a partir de FC e volume sistólico em um caso hipotético pós-operatório.",
    theme: "Ponto 9 — Cardiocirculatório: débito e hemodinâmica",
    tag: "apply",
    language: "pt",
    createdAt: "2026-02-03T09:15:00.000Z",
    createdBy: "Dr. Bruno Costa",
    questionBanks: [BANK_INTELLECTUS],
    categories: ["R2"],
    active: false,
  },
  {
    id: "3",
    code: "AN-2026-003",
    title:
      "Liste os receptores principais alvos de noradrenalina em leito vascular sistêmico.",
    theme: "Ponto 9.8 — Inotrópicos e vasopressores",
    tag: "remember",
    language: "pt",
    createdAt: "2026-02-20T11:00:00.000Z",
    createdBy: "Dra. Ana Silva",
    questionBanks: [BANK_SBA],
    categories: ["R3"],
    active: true,
  },
  {
    id: "4",
    code: "AN-2026-004",
    title:
      "Compare complacência estática e dinâmica em ventilação mecânica com baixo Vt.",
    theme: "Ponto 10 — Mecânica e ventilação pulmonar",
    tag: "analyze",
    language: "en",
    createdAt: "2026-03-01T16:45:00.000Z",
    createdBy: "Dra. Carla Mendes",
    questionBanks: [BANK_INTELLECTUS],
    categories: ["R1", "R2"],
    active: true,
  },
  {
    id: "5",
    code: "AN-2026-005",
    title:
      "Qual critério você usaria para escalar broncodilatador em broncoespasmo intraoperatório?",
    theme: "Ponto 10.10 — Farmacologia de agentes respiratórios",
    tag: "evaluate",
    language: "pt",
    createdAt: "2026-03-10T08:20:00.000Z",
    createdBy: "Dr. Daniel Oliveira",
    questionBanks: [BANK_INSTITUCIONAL, BANK_INTELLECTUS],
    categories: ["R3"],
    active: false,
  },
  {
    id: "6",
    code: "AN-2026-006",
    title:
      "Proponha um esquema de TIVA com propofol e remifentanil para cirurgia de curta duração.",
    theme: "Ponto 12 — Anestésicos venosos e opioides",
    tag: "create",
    language: "pt",
    createdAt: "2026-03-18T13:10:00.000Z",
    createdBy: "Dr. Bruno Costa",
    questionBanks: [BANK_SBA, BANK_INTELLECTUS],
    categories: ["R2", "R3"],
    active: true,
  },
  {
    id: "7",
    code: "AN-2026-007",
    title:
      "Define MAC and describe one factor that decreases minimum alveolar concentration.",
    theme: "Ponto 13 — Anestésicos inalatórios e CAM (MAC)",
    tag: "remember",
    language: "en",
    createdAt: "2026-04-02T10:00:00.000Z",
    createdBy: "Dra. Elena Ferreira",
    questionBanks: [BANK_SBA],
    categories: ["R2"],
    active: true,
  },
  {
    id: "8",
    code: "AN-2026-008",
    title:
      "Interprete sinais precoces de toxicidade por anestésico local após bloqueio de plexo.",
    theme: "Ponto 14 — Anestésicos locais e bloqueios",
    tag: "apply",
    language: "pt",
    createdAt: "2026-04-12T15:30:00.000Z",
    createdBy: "Dra. Carla Mendes",
    questionBanks: [BANK_INSTITUCIONAL],
    categories: ["R1", "TEA/TSA"],
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
