import type { Theme } from "@/features/themes/theme.types";

/** Filtro tri-state para o campo `active` do subtema. */
export type SubthemeActiveFilter = "all" | "yes" | "no";

export type SubthemeListFilters = {
  name: string;
  description: string;
  categories: string[];
  /** `null` = qualquer tema pai. */
  themeId: number | null;
  active: SubthemeActiveFilter;
  questionsMin: number | null;
  questionsMax: number | null;
};

export const defaultSubthemeListFilters: SubthemeListFilters = {
  name: "",
  description: "",
  categories: [],
  themeId: null,
  active: "all",
  questionsMin: null,
  questionsMax: null,
};

export type SubthemeFilterOptions = {
  categories: string[];
  /** Temas pai para o combobox (a partir da lista de temas carregada). */
  parentThemes: Pick<Theme, "id" | "name">[];
};
