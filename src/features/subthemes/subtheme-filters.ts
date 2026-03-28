import type { Theme } from "@/features/themes/theme.types";
import type { Subtheme } from "./subtheme.types";
import type { SubthemeFilterOptions, SubthemeListFilters } from "./subtheme-filters.types";

function includesInsensitive(haystack: string, needle: string): boolean {
  if (!needle.trim()) return true;
  return haystack.toLowerCase().includes(needle.trim().toLowerCase());
}

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b, "pt-BR"));
}

function inQuestionCountRange(
  count: number,
  min: number | null,
  max: number | null,
): boolean {
  if (min !== null && count < min) return false;
  if (max !== null && count > max) return false;
  return true;
}

/** Aplica filtros no cliente sobre a lista de subtemas. */
export function applySubthemeFilters(
  subthemes: Subtheme[],
  filters: SubthemeListFilters,
): Subtheme[] {
  return subthemes.filter((s) => {
    if (!includesInsensitive(s.name, filters.name)) return false;
    if (!includesInsensitive(s.description, filters.description)) return false;

    if (filters.themeId !== null && s.themeId !== filters.themeId) {
      return false;
    }

    if (filters.categories.length > 0) {
      const hasAny = filters.categories.some((c) => s.categories.includes(c));
      if (!hasAny) return false;
    }

    if (filters.active === "yes" && !s.active) return false;
    if (filters.active === "no" && s.active) return false;

    if (
      !inQuestionCountRange(
        s.questionCount,
        filters.questionsMin,
        filters.questionsMax,
      )
    ) {
      return false;
    }

    return true;
  });
}

/**
 * Opções derivadas: categorias dos subtemas; temas pai ordenados por nome
 * (usa a lista completa de temas para o filtro por pai).
 */
export function deriveSubthemeFilterOptions(
  subthemes: Subtheme[],
  themes: Theme[],
): SubthemeFilterOptions {
  const categories: string[] = [];
  for (const s of subthemes) {
    categories.push(...s.categories);
  }
  const parentThemes = [...themes]
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"))
    .map((t) => ({ id: t.id, name: t.name }));

  return {
    categories: uniqueSorted(categories),
    parentThemes,
  };
}

export function hasActiveFilters(filters: SubthemeListFilters): boolean {
  return (
    filters.name.trim() !== "" ||
    filters.description.trim() !== "" ||
    filters.categories.length > 0 ||
    filters.themeId !== null ||
    filters.active !== "all" ||
    filters.questionsMin !== null ||
    filters.questionsMax !== null
  );
}

export function cloneSubthemeListFilters(
  filters: SubthemeListFilters,
): SubthemeListFilters {
  return { ...filters, categories: [...filters.categories] };
}

export function countActiveFilterCriteria(filters: SubthemeListFilters): number {
  let n = 0;
  if (filters.name.trim() !== "") n += 1;
  if (filters.description.trim() !== "") n += 1;
  if (filters.categories.length > 0) n += 1;
  if (filters.themeId !== null) n += 1;
  if (filters.active !== "all") n += 1;
  if (filters.questionsMin !== null || filters.questionsMax !== null) n += 1;
  return n;
}
