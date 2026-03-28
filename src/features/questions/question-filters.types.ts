import type { QuestionBloomTag, QuestionLanguage } from "./question.types";

/** Filtro tri-state para o campo `active` da questão. */
export type QuestionActiveFilter = "all" | "yes" | "no";

export type QuestionListFilters = {
  /** Substring em `code` (case-insensitive). */
  code: string;
  /** Substring em `title` / enunciado (case-insensitive). */
  title: string;
  theme: string | null;
  tag: QuestionBloomTag | null;
  language: QuestionLanguage | null;
  /** Um dos nomes em `questionBanks`. */
  questionBank: string | null;
  createdBy: string | null;
  /** Categorias selecionadas; semântica OR em relação a `Question.categories`. */
  categories: string[];
  active: QuestionActiveFilter;
};

export const defaultQuestionListFilters: QuestionListFilters = {
  code: "",
  title: "",
  theme: null,
  tag: null,
  language: null,
  questionBank: null,
  createdBy: null,
  categories: [],
  active: "all",
};

export type QuestionFilterOptions = {
  themes: string[];
  tags: QuestionBloomTag[];
  languages: QuestionLanguage[];
  questionBanks: string[];
  createdBy: string[];
  categories: string[];
};
