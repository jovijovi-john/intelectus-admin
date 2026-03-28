import { useId } from "react";
import { ChevronDown } from "lucide-react";

import { CategoryMultiSelect } from "@/shared/components/category-multi-select";
import { SearchableCombobox } from "@/shared/components/searchable-combobox";
import { Badge } from "@/shared/shadcn/components/ui/badge";
import { Button } from "@/shared/shadcn/components/ui/button";
import { Input } from "@/shared/shadcn/components/ui/input";
import { Label } from "@/shared/shadcn/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/shadcn/components/ui/select";
import { cn } from "@/shared/shadcn/lib/utils";

import { BLOOM_LABEL } from "../question-bloom-badge";
import type { QuestionBloomTag, QuestionLanguage } from "../question.types";
import {
  countActiveFilterCriteria,
  hasActiveFilters,
} from "../question-filters";
import type {
  QuestionFilterOptions,
  QuestionListFilters,
} from "../question-filters.types";

function formatLanguage(code: QuestionLanguage): string {
  const labels: Record<QuestionLanguage, string> = {
    pt: "Português",
    en: "Inglês",
  };
  return labels[code];
}

export type QuestionFiltersBarProps = {
  draftFilters: QuestionListFilters;
  onDraftChange: (filters: QuestionListFilters) => void;
  appliedFilters: QuestionListFilters;
  options: QuestionFilterOptions;
  open: boolean;
  onToggleOpen: () => void;
  panelId: string;
  onSearch: () => void;
  onClear: () => void;
  disabled?: boolean;
};

export function QuestionFiltersBar({
  draftFilters,
  onDraftChange,
  appliedFilters,
  options,
  open,
  onToggleOpen,
  panelId,
  onSearch,
  onClear,
  disabled,
}: QuestionFiltersBarProps) {
  const toggleId = useId();
  const appliedCount = countActiveFilterCriteria(appliedFilters);
  const showClear =
    hasActiveFilters(draftFilters) || hasActiveFilters(appliedFilters);

  function patch(partial: Partial<QuestionListFilters>) {
    onDraftChange({ ...draftFilters, ...partial });
  }

  const themeOptions = options.themes.map((t) => ({ value: t, label: t }));
  const tagOptions: { value: string; label: string }[] = options.tags.map(
    (tag) => ({
      value: tag,
      label: BLOOM_LABEL[tag as QuestionBloomTag] ?? tag,
    })
  );
  const languageOptions = options.languages.map((l) => ({
    value: l,
    label: formatLanguage(l),
  }));
  const bankOptions = options.questionBanks.map((b) => ({
    value: b,
    label: b,
  }));
  const creatorOptions = options.createdBy.map((c) => ({
    value: c,
    label: c,
  }));

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          id={toggleId}
          type="button"
          variant="outline"
          className="gap-2"
          disabled={disabled}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggleOpen}
        >
          <span>Filtrar</span>
          {appliedCount > 0 ? (
            <Badge variant="secondary" className="h-5 min-w-5 px-1.5 font-normal tabular-nums">
              {appliedCount}
            </Badge>
          ) : null}
          <ChevronDown
            className={cn(
              "size-4 shrink-0 opacity-70 transition-transform duration-300",
              open && "rotate-180"
            )}
            aria-hidden
          />
        </Button>
      </div>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-in-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            id={panelId}
            role="region"
            aria-labelledby={toggleId}
            className="space-y-4 pt-4"
          >
            <p className="text-sm text-muted-foreground">
              Ajuste os critérios e clique em{" "}
              <span className="font-medium text-foreground">Pesquisar</span>{" "}
              para aplicar à lista.
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="q-filter-code">Código</Label>
                <Input
                  id="q-filter-code"
                  value={draftFilters.code}
                  onChange={(e) => patch({ code: e.target.value })}
                  placeholder="Buscar por código…"
                  disabled={disabled}
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2 xl:col-span-2">
                <Label htmlFor="q-filter-title">Enunciado</Label>
                <Input
                  id="q-filter-title"
                  value={draftFilters.title}
                  onChange={(e) => patch({ title: e.target.value })}
                  placeholder="Buscar no enunciado…"
                  disabled={disabled}
                  autoComplete="off"
                />
              </div>

              <SearchableCombobox
                label="Tema"
                options={themeOptions}
                value={draftFilters.theme}
                onChange={(v) => patch({ theme: v })}
                disabled={disabled}
                emptyText="Nenhum tema encontrado."
              />
              <SearchableCombobox
                label="Tag"
                options={tagOptions}
                value={draftFilters.tag}
                onChange={(v) =>
                  patch({
                    tag: v === null ? null : (v as QuestionBloomTag),
                  })
                }
                disabled={disabled}
                emptyText="Nenhuma tag encontrada."
              />
              <SearchableCombobox
                label="Idioma"
                options={languageOptions}
                value={draftFilters.language}
                onChange={(v) =>
                  patch({
                    language: v === null ? null : (v as QuestionLanguage),
                  })
                }
                disabled={disabled}
                emptyText="Nenhum idioma encontrado."
              />
              <SearchableCombobox
                label="Banco de questões"
                options={bankOptions}
                value={draftFilters.questionBank}
                onChange={(v) => patch({ questionBank: v })}
                disabled={disabled}
                emptyText="Nenhum banco encontrado."
              />
              <SearchableCombobox
                label="Criado por"
                options={creatorOptions}
                value={draftFilters.createdBy}
                onChange={(v) => patch({ createdBy: v })}
                disabled={disabled}
                emptyText="Nenhum autor encontrado."
              />

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="q-filter-active">Ativo</Label>
                <Select
                  value={draftFilters.active}
                  onValueChange={(v) =>
                    patch({
                      active: v as QuestionListFilters["active"],
                    })
                  }
                  disabled={disabled}
                >
                  <SelectTrigger id="q-filter-active" className="w-full">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="yes">Sim</SelectItem>
                    <SelectItem value="no">Não</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 xl:col-span-3">
                <CategoryMultiSelect
                  label="Categorias"
                  options={options.categories}
                  selected={draftFilters.categories}
                  onChange={(categories) => patch({ categories })}
                  disabled={disabled}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-zinc-200 pt-4">
              <Button
                type="button"
                disabled={disabled}
                onClick={() => {
                  onSearch();
                }}
              >
                Pesquisar
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={disabled || !showClear}
                onClick={onClear}
              >
                Limpar filtros
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
