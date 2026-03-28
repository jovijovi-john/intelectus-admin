import type { Theme } from "./theme.types";
import type { ThemeFilterOptions, ThemeListFilters } from "./theme-filters.types";

function includesInsensitive(haystack: string, needle: string): boolean {
  if (!needle.trim()) return true;
  return haystack.toLowerCase().includes(needle.trim().toLowerCase());
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

/** Aplica filtros no cliente sobre a lista de temas. */
export function applyThemeFilters(
  themes: Theme[],
  filters: ThemeListFilters,
): Theme[] {
  return themes.filter((t) => {
    if (!includesInsensitive(t.name, filters.name)) return false;
    if (!includesInsensitive(t.description, filters.description)) return false;

    if (filters.categories.length > 0) {
      const hasAny = filters.categories.some((c) => t.categories.includes(c));
      if (!hasAny) return false;
    }

    if (filters.active === "yes" && !t.active) return false;
    if (filters.active === "no" && t.active) return false;

    if (
      !inQuestionCountRange(
        t.questionCount,
        filters.questionsMin,
        filters.questionsMax,
      )
    ) {
      return false;
    }

    return true;
  });
}

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b, "pt-BR"));
}

export function deriveThemeFilterOptions(themes: Theme[]): ThemeFilterOptions {
  const categories: string[] = [];
  for (const t of themes) {
    categories.push(...t.categories);
  }
  return {
    categories: uniqueSorted(categories),
  };
}

export function hasActiveFilters(filters: ThemeListFilters): boolean {
  return (
    filters.name.trim() !== "" ||
    filters.description.trim() !== "" ||
    filters.categories.length > 0 ||
    filters.active !== "all" ||
    filters.questionsMin !== null ||
    filters.questionsMax !== null
  );
}

export function cloneThemeListFilters(filters: ThemeListFilters): ThemeListFilters {
  return { ...filters, categories: [...filters.categories] };
}

export function countActiveFilterCriteria(filters: ThemeListFilters): number {
  let n = 0;
  if (filters.name.trim() !== "") n += 1;
  if (filters.description.trim() !== "") n += 1;
  if (filters.categories.length > 0) n += 1;
  if (filters.active !== "all") n += 1;
  if (filters.questionsMin !== null || filters.questionsMax !== null) n += 1;
  return n;
}
