/** Filtro tri-state para o campo `active` do tema. */
export type ThemeActiveFilter = "all" | "yes" | "no";

export type ThemeListFilters = {
  /** Substring em `name` (case-insensitive). */
  name: string;
  /** Substring em `description` (case-insensitive). */
  description: string;
  /** Categorias selecionadas; semântica OR em relação a `Theme.categories`. */
  categories: string[];
  active: ThemeActiveFilter;
  /** Limite inferior inclusivo em `questionCount`; `null` = sem mínimo. */
  questionsMin: number | null;
  /** Limite superior inclusivo em `questionCount`; `null` = sem máximo. */
  questionsMax: number | null;
};

export const defaultThemeListFilters: ThemeListFilters = {
  name: "",
  description: "",
  categories: [],
  active: "all",
  questionsMin: null,
  questionsMax: null,
};

export type ThemeFilterOptions = {
  categories: string[];
};
