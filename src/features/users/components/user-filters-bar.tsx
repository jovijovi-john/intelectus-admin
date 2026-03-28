import { useId } from "react";
import { ChevronDown } from "lucide-react";

import { SearchableCombobox } from "@/shared/components/searchable-combobox";
import { Badge } from "@/shared/shadcn/components/ui/badge";
import { Button } from "@/shared/shadcn/components/ui/button";
import { Input } from "@/shared/shadcn/components/ui/input";
import { Label } from "@/shared/shadcn/components/ui/label";
import { cn } from "@/shared/shadcn/lib/utils";

import {
  countActiveFilterCriteria,
  hasActiveFilters,
} from "../user-filters";
import {
  USER_PLAN_ORDER,
  type UserFilterOptions,
  type UserListFilters,
} from "../user-filters.types";
import { PLAN_LABEL } from "../user-plan-badge";
import type { UserPlan } from "../user.types";

export type UserFiltersBarProps = {
  draftFilters: UserListFilters;
  onDraftChange: (filters: UserListFilters) => void;
  appliedFilters: UserListFilters;
  options: UserFilterOptions;
  open: boolean;
  onToggleOpen: () => void;
  panelId: string;
  onSearch: () => void;
  onClear: () => void;
  disabled?: boolean;
};

export function UserFiltersBar({
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
}: UserFiltersBarProps) {
  const toggleId = useId();
  const appliedCount = countActiveFilterCriteria(appliedFilters);
  const showClear =
    hasActiveFilters(draftFilters) || hasActiveFilters(appliedFilters);

  function patch(partial: Partial<UserListFilters>) {
    onDraftChange({ ...draftFilters, ...partial });
  }

  const planOptions = USER_PLAN_ORDER.map((p) => ({
    value: p,
    label: PLAN_LABEL[p],
  }));

  const yearOptions = options.birthYears.map((y) => ({
    value: String(y),
    label: String(y),
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
                <Label htmlFor="u-filter-name">Nome</Label>
                <Input
                  id="u-filter-name"
                  value={draftFilters.name}
                  onChange={(e) => patch({ name: e.target.value })}
                  placeholder="Buscar por nome…"
                  disabled={disabled}
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="u-filter-email">E-mail</Label>
                <Input
                  id="u-filter-email"
                  type="email"
                  value={draftFilters.email}
                  onChange={(e) => patch({ email: e.target.value })}
                  placeholder="Buscar por e-mail…"
                  disabled={disabled}
                  autoComplete="off"
                />
              </div>
              <SearchableCombobox
                label="Plano"
                options={planOptions}
                value={draftFilters.plan}
                onChange={(v) =>
                  patch({
                    plan: v === null ? null : (v as UserPlan),
                  })
                }
                disabled={disabled}
                emptyText="Nenhum plano encontrado."
              />
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="u-filter-cpf">CPF</Label>
                <Input
                  id="u-filter-cpf"
                  value={draftFilters.cpf}
                  onChange={(e) => patch({ cpf: e.target.value })}
                  placeholder="Buscar por CPF…"
                  disabled={disabled}
                  autoComplete="off"
                />
              </div>
              <SearchableCombobox
                label="Ano de nascimento"
                options={yearOptions}
                value={
                  draftFilters.birthYear === null
                    ? null
                    : String(draftFilters.birthYear)
                }
                onChange={(v) =>
                  patch({
                    birthYear: v === null ? null : Number(v),
                  })
                }
                disabled={disabled}
                emptyText="Nenhum ano encontrado."
                anyLabel="Qualquer ano"
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
