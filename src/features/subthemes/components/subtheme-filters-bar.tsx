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
} from "../subtheme-filters";
import type { SubthemeFilterOptions, SubthemeListFilters } from "../subtheme-filters.types";

export type SubthemeFiltersBarProps = {
  draftFilters: SubthemeListFilters;
  onDraftChange: (filters: SubthemeListFilters) => void;
  appliedFilters: SubthemeListFilters;
  options: SubthemeFilterOptions;
  open: boolean;
  onToggleOpen: () => void;
  panelId: string;
  onSearch: () => void;
  onClear: () => void;
  disabled?: boolean;
};

export function SubthemeFiltersBar({
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
}: SubthemeFiltersBarProps) {
  const toggleId = useId();
  const appliedCount = countActiveFilterCriteria(appliedFilters);
  const showClear =
    hasActiveFilters(draftFilters) || hasActiveFilters(appliedFilters);

  function patch(partial: Partial<SubthemeListFilters>) {
    onDraftChange({ ...draftFilters, ...partial });
  }

  const parentThemeOptions = options.parentThemes.map((t) => ({
    value: String(t.id),
    label: t.name,
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
                <Label htmlFor="subtheme-filter-name">Nome</Label>
                <Input
                  id="subtheme-filter-name"
                  value={draftFilters.name}
                  onChange={(e) => patch({ name: e.target.value })}
                  placeholder="Buscar por nome…"
                  disabled={disabled}
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2 xl:col-span-2">
                <Label htmlFor="subtheme-filter-description">Descrição</Label>
                <Input
                  id="subtheme-filter-description"
                  value={draftFilters.description}
                  onChange={(e) => patch({ description: e.target.value })}
                  placeholder="Buscar na descrição…"
                  disabled={disabled}
                  autoComplete="off"
                />
              </div>
              <SearchableCombobox
                label="Tema"
                options={parentThemeOptions}
                value={
                  draftFilters.themeId === null
                    ? null
                    : String(draftFilters.themeId)
                }
                onChange={(v) =>
                  patch({
                    themeId: v === null ? null : Number(v),
                  })
                }
                disabled={disabled}
                emptyText="Nenhum tema encontrado."
              />
              <div className="grid grid-cols-3 gap-4 md:col-span-2 xl:col-span-3">
                <div className="flex min-w-0 flex-col gap-1.5">
                  <Label htmlFor="subtheme-filter-active">Ativo</Label>
                  <Select
                    value={draftFilters.active}
                    onValueChange={(v) =>
                      patch({
                        active: v as SubthemeListFilters["active"],
                      })
                    }
                    disabled={disabled}
                  >
                    <SelectTrigger
                      id="subtheme-filter-active"
                      className="w-full"
                    >
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
                  <Label htmlFor="subtheme-filter-qty-min">
                    Qtd. questões (mín.)
                  </Label>
                  <Input
                    id="subtheme-filter-qty-min"
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
                  <Label htmlFor="subtheme-filter-qty-max">
                    Qtd. questões (máx.)
                  </Label>
                  <Input
                    id="subtheme-filter-qty-max"
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
