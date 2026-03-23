export type QuestionBloomTag =
  | "remember"
  | "understand"
  | "apply"
  | "analyze"
  | "evaluate"
  | "create";

export type QuestionLanguage = "pt" | "en";

export interface Question {
  id: string;
  code: string;
  title: string;
  theme: string;
  tag: QuestionBloomTag;
  language: QuestionLanguage;
  /** ISO 8601 */
  createdAt: string;
  createdBy: string;
  /** Nomes dos bancos de questões (ex.: Prova anual, Intelectus) */
  questionBanks: string[];
  categories: string[];
  active: boolean;
}
