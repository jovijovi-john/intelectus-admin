import type { Category } from "@/features/categories/category.types";

/** Níveis de residência em anestesiologia — usar `name` em vínculos (questões, simulados, temas). */
export const RESIDENCY_CATEGORIES: Category[] = [
  {
    id: "tea-tsa",
    name: "TEA/TSA",
    description:
      "Temas de acesso e seleção: base fisiológica e farmacológica para ingresso na especialidade.",
  },
  {
    id: "r1",
    name: "R1",
    description:
      "Primeiro ano: fundamentos clínicos, monitorização e procedimentos de rotina sob supervisão.",
  },
  {
    id: "r2",
    name: "R2",
    description:
      "Segundo ano: cenários mais complexos, subspecialidades e gestão do perioperatório.",
  },
  {
    id: "r3",
    name: "R3",
    description:
      "Terceiro ano: consolidação, liderança de equipe e preparação para prática autônoma.",
  },
];

/** Bancos de questões — mesmos rótulos em mocks de questões, simulados e dashboard. */
export const QUESTION_BANK_LABELS = [
  "Banco Intelectus — anestesiologia",
  "Prova anual SBA (revisão)",
  "Banco institucional — casos clínicos",
] as const;

/**
 * Temas inspirados na taxonomia SBA (Pontos 8–14 e subitens).
 * `categories` usa os mesmos valores que `Category.name`.
 */
export const ANESTHESIOLOGY_THEME_SEEDS: {
  id: number;
  name: string;
  description: string;
  categories: string[];
}[] = [
  {
    id: 1,
    name: "Ponto 8 — SNC e sistema nervoso autônomo",
    description:
      "SBA 8.x — Neurofisiologia aplicada à anestesia, reflexos e modulação autonômica.",
    categories: ["TEA/TSA", "R1", "R2"],
  },
  {
    id: 2,
    name: "Ponto 9 — Cardiocirculatório: débito e hemodinâmica",
    description:
      "SBA 9.4 — Débito cardíaco, pré-carga, pós-carga e adaptação ao estresse cirúrgico.",
    categories: ["R1", "R2", "R3"],
  },
  {
    id: 3,
    name: "Ponto 9.8 — Inotrópicos e vasopressores",
    description:
      "SBA 9.8 — Escolha e monitorização de fármacos vasoativos no perioperatório.",
    categories: ["R2", "R3"],
  },
  {
    id: 4,
    name: "Ponto 10 — Mecânica e ventilação pulmonar",
    description:
      "SBA 10.2–10.3 — Mecânica respiratória, volumes, complacência e ventilação mecânica.",
    categories: ["R1", "R2"],
  },
  {
    id: 5,
    name: "Ponto 10.10 — Farmacologia de agentes respiratórios",
    description:
      "SBA 10.10 — Broncodilatadores, oxigenoterapia e óxido nítrico inalatório.",
    categories: ["R1", "R3"],
  },
  {
    id: 6,
    name: "Ponto 11 — Farmacologia geral em anestesia",
    description:
      "SBA 11.x — Farmacocinética e farmacodinâmica aplicadas ao paciente cirúrgico.",
    categories: ["TEA/TSA", "R1"],
  },
  {
    id: 7,
    name: "Ponto 12 — Anestésicos venosos e opioides",
    description:
      "SBA 12.2.1 — Propofol, dexmedetomidina, opioides e contexto de infusão alvo.",
    categories: ["R1", "R2", "R3"],
  },
  {
    id: 8,
    name: "Ponto 13 — Anestésicos inalatórios e CAM (MAC)",
    description:
      "SBA 13.4–13.6 — Concentração alveolar mínima, potência e efeito segundo gás.",
    categories: ["R2", "R3"],
  },
  {
    id: 9,
    name: "Ponto 14 — Anestésicos locais e bloqueios",
    description:
      "SBA 14.x — Farmacologia local, toxicidade e técnicas de bloqueio de nervos periféricos.",
    categories: ["R1", "R2"],
  },
];
