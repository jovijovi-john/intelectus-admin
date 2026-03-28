import { useId } from "react";
import { ChevronDown } from "lucide-react";

import { CategoryMultiSelect } from "@/shared/components/category-multi-select";
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
} from "../theme-filters";
import type {
  ThemeFilterOptions,
  ThemeListFilters,
} from "../theme-filters.types";

export type ThemeFiltersBarProps = {
  draftFilters: ThemeListFilters;
  onDraftChange: (filters: ThemeListFilters) => void;
  appliedFilters: ThemeListFilters;
  options: ThemeFilterOptions;
  open: boolean;
  onToggleOpen: () => void;
  panelId: string;
  onSearch: () => void;
  onClear: () => void;
  disabled?: boolean;
};

export function ThemeFiltersBar({
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
}: ThemeFiltersBarProps) {
  const toggleId = useId();
  const appliedCount = countActiveFilterCriteria(appliedFilters);
  const showClear =
    hasActiveFilters(draftFilters) || hasActiveFilters(appliedFilters);

  function patch(partial: Partial<ThemeListFilters>) {
    onDraftChange({ ...draftFilters, ...partial });
  }

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

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="theme-filter-name">Nome</Label>
                <Input
                  id="theme-filter-name"
                  value={draftFilters.name}
                  onChange={(e) => patch({ name: e.target.value })}
                  placeholder="Buscar por nome…"
                  disabled={disabled}
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="theme-filter-description">Descrição</Label>
                <Input
                  id="theme-filter-description"
                  value={draftFilters.description}
                  onChange={(e) => patch({ description: e.target.value })}
                  placeholder="Buscar na descrição…"
                  disabled={disabled}
                  autoComplete="off"
                />
              </div>
              <div className="grid grid-cols-3 gap-4 md:col-span-2">
                <div className="flex min-w-0 flex-col gap-1.5">
                  <Label htmlFor="theme-filter-active">Ativo</Label>
                  <Select
                    value={draftFilters.active}
                    onValueChange={(v) =>
                      patch({
                        active: v as ThemeListFilters["active"],
                      })
                    }
                    disabled={disabled}
                  >
                    <SelectTrigger id="theme-filter-active" className="w-full">
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="yes">Sim</SelectItem>
                      <SelectItem value="no">Não</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex min-w-0 flex-col gap-1.5">
                  <Label htmlFor="theme-filter-qty-min">
                    Qtd. questões (mín.)
                  </Label>
                  <Input
                    id="theme-filter-qty-min"
                    type="number"
                    min={0}
                    inputMode="numeric"
                    placeholder="Qualquer"
                    value={draftFilters.questionsMin ?? ""}
                    onChange={(e) => {
                      const raw = e.target.value;
                      if (raw === "") {
                        patch({ questionsMin: null });
                        return;
                      }
                      const n = Number(raw);
                      patch({
                        questionsMin: Number.isFinite(n)
                          ? Math.max(0, n)
                          : null,
                      });
                    }}
                    disabled={disabled}
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-1.5">
                  <Label htmlFor="theme-filter-qty-max">
                    Qtd. questões (máx.)
                  </Label>
                  <Input
                    id="theme-filter-qty-max"
                    type="number"
                    min={0}
                    inputMode="numeric"
                    placeholder="Qualquer"
                    value={draftFilters.questionsMax ?? ""}
                    onChange={(e) => {
                      const raw = e.target.value;
                      if (raw === "") {
                        patch({ questionsMax: null });
                        return;
                      }
                      const n = Number(raw);
                      patch({
                        questionsMax: Number.isFinite(n)
                          ? Math.max(0, n)
                          : null,
                      });
                    }}
                    disabled={disabled}
                  />
                </div>
              </div>
              <div className="md:col-span-2">
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
