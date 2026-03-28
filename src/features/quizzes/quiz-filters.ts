import type { Quiz } from "./quiz.types";
import type { QuizFilterOptions, QuizListFilters } from "./quiz-filters.types";

function includesInsensitive(haystack: string, needle: string): boolean {
  if (!needle.trim()) return true;
  return haystack.toLowerCase().includes(needle.trim().toLowerCase());
}

/** Data local (YYYY-MM-DD) extraída de um ISO 8601, para comparar com inputs `type="date"`. */
function toYmdLocal(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function quizCreatedInRange(
  createdAtIso: string,
  from: string | null,
  to: string | null,
): boolean {
  if (from === null && to === null) return true;
  const ymd = toYmdLocal(createdAtIso);
  if (!ymd) return false;
  if (from !== null && ymd < from) return false;
  if (to !== null && ymd > to) return false;
  return true;
}

/** Aplica filtros no cliente sobre a lista de simulados. */
export function applyQuizFilters(
  quizzes: Quiz[],
  filters: QuizListFilters,
): Quiz[] {
  return quizzes.filter((q) => {
    if (!includesInsensitive(q.title, filters.title)) return false;
    if (!includesInsensitive(q.description, filters.description)) return false;

    if (
      filters.questionBank !== null &&
      !q.questionBanks.includes(filters.questionBank)
    ) {
      return false;
    }
    if (filters.createdBy !== null && q.createdBy !== filters.createdBy) {
      return false;
    }

    if (!quizCreatedInRange(q.createdAt, filters.createdFrom, filters.createdTo)) {
      return false;
    }

    if (filters.themes.length > 0) {
      const hasAny = filters.themes.some((t) => q.themes.includes(t));
      if (!hasAny) return false;
    }

    if (filters.categories.length > 0) {
      const hasAny = filters.categories.some((c) => q.categories.includes(c));
      if (!hasAny) return false;
    }

    if (filters.active === "yes" && !q.active) return false;
    if (filters.active === "no" && q.active) return false;

    return true;
  });
}

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b, "pt-BR"));
}

/** Opções para comboboxes/multiselect derivadas dos dados carregados. */
export function deriveQuizFilterOptions(quizzes: Quiz[]): QuizFilterOptions {
  const banks: string[] = [];
  const creators: string[] = [];
  const themes: string[] = [];
  const categories: string[] = [];

  for (const q of quizzes) {
    banks.push(...q.questionBanks);
    creators.push(q.createdBy);
    themes.push(...q.themes);
    categories.push(...q.categories);
  }

  return {
    questionBanks: uniqueSorted(banks),
    createdBy: uniqueSorted(creators),
    themes: uniqueSorted(themes),
    categories: uniqueSorted(categories),
  };
}

export function hasActiveFilters(filters: QuizListFilters): boolean {
  return (
    filters.title.trim() !== "" ||
    filters.description.trim() !== "" ||
    filters.questionBank !== null ||
    filters.createdBy !== null ||
    filters.createdFrom !== null ||
    filters.createdTo !== null ||
    filters.themes.length > 0 ||
    filters.categories.length > 0 ||
    filters.active !== "all"
  );
}

/** Cópia segura para aplicar rascunho em "Pesquisar" sem mutar arrays. */
export function cloneQuizListFilters(filters: QuizListFilters): QuizListFilters {
  return {
    ...filters,
    themes: [...filters.themes],
    categories: [...filters.categories],
  };
}

/** Número aproximado de critérios ativos (para indicador no botão Filtrar). */
export function countActiveFilterCriteria(filters: QuizListFilters): number {
  let n = 0;
  if (filters.title.trim() !== "") n += 1;
  if (filters.description.trim() !== "") n += 1;
  if (filters.questionBank !== null) n += 1;
  if (filters.createdBy !== null) n += 1;
  if (filters.createdFrom !== null || filters.createdTo !== null) n += 1;
  if (filters.themes.length > 0) n += 1;
  if (filters.categories.length > 0) n += 1;
  if (filters.active !== "all") n += 1;
  return n;
}
