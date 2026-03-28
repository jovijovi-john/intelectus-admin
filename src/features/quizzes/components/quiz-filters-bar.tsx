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

import {
  countActiveFilterCriteria,
  hasActiveFilters,
} from "../quiz-filters";
import type { QuizFilterOptions, QuizListFilters } from "../quiz-filters.types";

export type QuizFiltersBarProps = {
  draftFilters: QuizListFilters;
  onDraftChange: (filters: QuizListFilters) => void;
  appliedFilters: QuizListFilters;
  options: QuizFilterOptions;
  open: boolean;
  onToggleOpen: () => void;
  panelId: string;
  onSearch: () => void;
  onClear: () => void;
  disabled?: boolean;
};

export function QuizFiltersBar({
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
}: QuizFiltersBarProps) {
  const toggleId = useId();
  const dateFromId = useId();
  const dateToId = useId();
  const appliedCount = countActiveFilterCriteria(appliedFilters);
  const showClear =
    hasActiveFilters(draftFilters) || hasActiveFilters(appliedFilters);

  function patch(partial: Partial<QuizListFilters>) {
    onDraftChange({ ...draftFilters, ...partial });
  }

  const bankOptions = options.questionBanks.map((b) => ({
    value: b,
    label: b,
  }));
  const creatorOptions = options.createdBy.map((c) => ({
    value: c,
    label: c,
  }));

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
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
            <Badge
              variant="secondary"
              className="h-5 min-w-5 px-1.5 font-normal tabular-nums"
            >
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
        <div className="min-h-0 min-w-0 w-full overflow-hidden">
          <div
            id={panelId}
            role="region"
            aria-labelledby={toggleId}
            className="space-y-4 px-1 pt-4 sm:px-2"
          >
            <p className="text-sm text-muted-foreground">
              Ajuste os critérios e clique em{" "}
              <span className="font-medium text-foreground">Pesquisar</span>{" "}
              para aplicar à lista.
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="q-quiz-filter-title">Título</Label>
                <Input
                  id="q-quiz-filter-title"
                  value={draftFilters.title}
                  onChange={(e) => patch({ title: e.target.value })}
                  placeholder="Buscar por título…"
                  disabled={disabled}
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2 xl:col-span-2">
                <Label htmlFor="q-quiz-filter-description">Descrição</Label>
                <Input
                  id="q-quiz-filter-description"
                  value={draftFilters.description}
                  onChange={(e) => patch({ description: e.target.value })}
                  placeholder="Buscar na descrição…"
                  disabled={disabled}
                  autoComplete="off"
                />
              </div>

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
                <Label htmlFor="q-quiz-filter-active">Ativo</Label>
                <Select
                  value={draftFilters.active}
                  onValueChange={(v) =>
                    patch({
                      active: v as QuizListFilters["active"],
                    })
                  }
                  disabled={disabled}
                >
                  <SelectTrigger id="q-quiz-filter-active" className="w-full">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="yes">Sim</SelectItem>
                    <SelectItem value="no">Não</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor={dateFromId}>Criado a partir de</Label>
                <Input
                  id={dateFromId}
                  type="date"
                  value={draftFilters.createdFrom ?? ""}
                  onChange={(e) =>
                    patch({
                      createdFrom: e.target.value === "" ? null : e.target.value,
                    })
                  }
                  disabled={disabled}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={dateToId}>Criado até</Label>
                <Input
                  id={dateToId}
                  type="date"
                  value={draftFilters.createdTo ?? ""}
                  onChange={(e) =>
                    patch({
                      createdTo: e.target.value === "" ? null : e.target.value,
                    })
                  }
                  disabled={disabled}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 border-t border-zinc-200 pt-4 md:grid-cols-2">
              <CategoryMultiSelect
                label="Temas"
                options={options.themes}
                selected={draftFilters.themes}
                onChange={(themes) => patch({ themes })}
                disabled={disabled}
                selectPlaceholder="Selecionar temas…"
                searchPlaceholder="Buscar tema…"
                emptyText="Nenhum tema encontrado."
              />
              <CategoryMultiSelect
                label="Categorias"
                options={options.categories}
                selected={draftFilters.categories}
                onChange={(categories) => patch({ categories })}
                disabled={disabled}
              />
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
