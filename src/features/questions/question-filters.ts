import type { Question } from "./question.types";
import type {
  QuestionFilterOptions,
  QuestionListFilters,
} from "./question-filters.types";

function includesInsensitive(haystack: string, needle: string): boolean {
  if (!needle.trim()) return true;
  return haystack.toLowerCase().includes(needle.trim().toLowerCase());
}

/** Aplica filtros no cliente sobre a lista de questões. */
export function applyQuestionFilters(
  questions: Question[],
  filters: QuestionListFilters
): Question[] {
  return questions.filter((q) => {
    if (!includesInsensitive(q.code, filters.code)) return false;
    if (!includesInsensitive(q.title, filters.title)) return false;

    if (filters.theme !== null && q.theme !== filters.theme) return false;
    if (filters.tag !== null && q.tag !== filters.tag) return false;
    if (filters.language !== null && q.language !== filters.language)
      return false;
    if (
      filters.questionBank !== null &&
      !q.questionBanks.includes(filters.questionBank)
    ) {
      return false;
    }
    if (filters.createdBy !== null && q.createdBy !== filters.createdBy) {
      return false;
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
export function deriveQuestionFilterOptions(
  questions: Question[]
): QuestionFilterOptions {
  const themes: string[] = [];
  const tags = new Set<Question["tag"]>();
  const languages = new Set<Question["language"]>();
  const banks: string[] = [];
  const creators: string[] = [];
  const categories: string[] = [];

  for (const q of questions) {
    themes.push(q.theme);
    tags.add(q.tag);
    languages.add(q.language);
    banks.push(...q.questionBanks);
    creators.push(q.createdBy);
    categories.push(...q.categories);
  }

  return {
    themes: uniqueSorted(themes),
    tags: [...tags].sort((a, b) => a.localeCompare(b)),
    languages: [...languages].sort(),
    questionBanks: uniqueSorted(banks),
    createdBy: uniqueSorted(creators),
    categories: uniqueSorted(categories),
  };
}

export function hasActiveFilters(filters: QuestionListFilters): boolean {
  return (
    filters.code.trim() !== "" ||
    filters.title.trim() !== "" ||
    filters.theme !== null ||
    filters.tag !== null ||
    filters.language !== null ||
    filters.questionBank !== null ||
    filters.createdBy !== null ||
    filters.categories.length > 0 ||
    filters.active !== "all"
  );
}

/** Cópia segura para aplicar rascunho em "Pesquisar" sem mutar arrays. */
export function cloneQuestionListFilters(
  filters: QuestionListFilters
): QuestionListFilters {
  return { ...filters, categories: [...filters.categories] };
}

/** Número aproximado de critérios ativos (para indicador no botão Filtrar). */
export function countActiveFilterCriteria(filters: QuestionListFilters): number {
  let n = 0;
  if (filters.code.trim() !== "") n += 1;
  if (filters.title.trim() !== "") n += 1;
  if (filters.theme !== null) n += 1;
  if (filters.tag !== null) n += 1;
  if (filters.language !== null) n += 1;
  if (filters.questionBank !== null) n += 1;
  if (filters.createdBy !== null) n += 1;
  if (filters.categories.length > 0) n += 1;
  if (filters.active !== "all") n += 1;
  return n;
}
