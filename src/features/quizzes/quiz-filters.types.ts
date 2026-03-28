/** Filtro tri-state para o campo `active` do simulado. */
export type QuizActiveFilter = "all" | "yes" | "no";

/** Datas `YYYY-MM-DD` para `<input type="date">`; intervalo inclusivo na data local de `createdAt`. */
export type QuizListFilters = {
  /** Substring em `title` (case-insensitive). */
  title: string;
  /** Substring em `description` (case-insensitive). */
  description: string;
  /** Um dos nomes em `questionBanks` do simulado (deve incluir). */
  questionBank: string | null;
  createdBy: string | null;
  /** Início do intervalo de criação (inclusivo), ou `null` = sem limite inferior. */
  createdFrom: string | null;
  /** Fim do intervalo de criação (inclusivo), ou `null` = sem limite superior. */
  createdTo: string | null;
  /** Temas selecionados; semântica OR em relação a `Quiz.themes`. */
  themes: string[];
  /** Categorias selecionadas; semântica OR em relação a `Quiz.categories`. */
  categories: string[];
  active: QuizActiveFilter;
};

export const defaultQuizListFilters: QuizListFilters = {
  title: "",
  description: "",
  questionBank: null,
  createdBy: null,
  createdFrom: null,
  createdTo: null,
  themes: [],
  categories: [],
  active: "all",
};

export type QuizFilterOptions = {
  questionBanks: string[];
  createdBy: string[];
  themes: string[];
  categories: string[];
};
