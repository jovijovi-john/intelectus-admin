import type { Subtheme } from "./subtheme.types";

/** Subtemas de exemplo alinhados aos temas SBA (ids 1–9). */
const MOCK_SUBTHEMES: Subtheme[] = [
  {
    id: 101,
    themeId: 1,
    name: "Neuroanestesia e monitorização do SNC",
    description:
      "Reflexos, pressão intracraniana e efeitos de fármacos sobre fluxo cerebral.",
    categories: ["R2", "R3"],
    active: true,
    questionCount: 14,
  },
  {
    id: 102,
    themeId: 1,
    name: "Sistema autônomo e bloqueio simpático",
    description: "Bloqueios simpáticos e modulação do tônus autonômico perioperatório.",
    categories: ["R1", "R2"],
    active: true,
    questionCount: 9,
  },
  {
    id: 103,
    themeId: 2,
    name: "Curvas de débito e função ventricular",
    description: "Interpretação de curvas pressão-volume e resposta hemodinâmica.",
    categories: ["R2", "R3"],
    active: false,
    questionCount: 22,
  },
  {
    id: 104,
    themeId: 3,
    name: "Escolha de inotrópico no choque distributivo",
    description: "Critérios para noradrenalina, dobutamina e vasopressina.",
    categories: ["R3"],
    active: true,
    questionCount: 18,
  },
  {
    id: 105,
    themeId: 4,
    name: "Mecânica respiratória em ventilação controlada",
    description: "Driving pressure, PEEP e estratégias de proteção pulmonar.",
    categories: ["R1", "R2"],
    active: true,
    questionCount: 11,
  },
  {
    id: 106,
    themeId: 5,
    name: "Broncodilatadores e via inalatória",
    description: "Beta-2 agonistas, anticolinérgicos e óxido nítrico inalatório.",
    categories: ["R1", "R3"],
    active: false,
    questionCount: 7,
  },
  {
    id: 107,
    themeId: 6,
    name: "Farmacocinética em obesidade e insuficiência renal",
    description: "Ajuste de doses e contexto de meia-vida no perioperatório.",
    categories: ["TEA/TSA", "R1"],
    active: true,
    questionCount: 16,
  },
  {
    id: 108,
    themeId: 7,
    name: "Propofol TCI e remifentanil",
    description: "Infusão alvo-controlada e sinergismo com opioides.",
    categories: ["R2", "R3"],
    active: true,
    questionCount: 25,
  },
  {
    id: 109,
    themeId: 8,
    name: "MAC, potência e segundo gás",
    description: "Comparação entre agentes inalatórios e efeito MAC-sparing.",
    categories: ["R2", "R3"],
    active: false,
    questionCount: 13,
  },
  {
    id: 110,
    themeId: 9,
    name: "Bloqueios de plexo e toxicidade de locais",
    description: "Limites de dose, adjuvantes e tratamento de intoxicação.",
    categories: ["R1", "R2"],
    active: true,
    questionCount: 20,
  },
];

const MOCK_DELAY_MS = 400;

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function listSubthemesMock(): Promise<Subtheme[]> {
  await delay(MOCK_DELAY_MS);
  return [...MOCK_SUBTHEMES];
}
