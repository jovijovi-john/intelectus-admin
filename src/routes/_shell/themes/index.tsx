import { ThemeFiltersBar } from "@/features/themes/components/theme-filters-bar";
import type { Theme } from "@/features/themes/theme.types";
import {
  applyThemeFilters,
  cloneThemeListFilters,
  deriveThemeFilterOptions,
} from "@/features/themes/theme-filters";
import {
  defaultThemeListFilters,
  type ThemeListFilters,
} from "@/features/themes/theme-filters.types";
import { useThemesColumns } from "@/features/themes/themes.columns";
import { useThemes } from "@/features/themes/use-themes";
import { AppDialog } from "@/shared/components/app-dialog";
import { ListPageHeader } from "@/shared/components/list-page-header";
import { DataTable } from "@/shared/components/Table";
import { Button } from "@/shared/shadcn/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useCallback, useId, useMemo, useState } from "react";

export const Route = createFileRoute("/_shell/themes/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isPending, isError, error, refetch } = useThemes();
  const [createOpen, setCreateOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState<ThemeListFilters>(() => ({
    ...defaultThemeListFilters,
  }));
  const [appliedFilters, setAppliedFilters] = useState<ThemeListFilters>(() => ({
    ...defaultThemeListFilters,
  }));

  const filterPanelId = useId();

  const list = data ?? [];
  const filterOptions = useMemo(
    () => deriveThemeFilterOptions(list),
    [list]
  );
  const filteredThemes = useMemo(
    () => applyThemeFilters(list, appliedFilters),
    [list, appliedFilters]
  );

  const showSuccessBody = !isPending && !isError && data !== undefined;

  function handleToggleFilters() {
    setFiltersOpen((open) => {
      if (!open) {
        setDraftFilters(cloneThemeListFilters(appliedFilters));
      }
      return !open;
    });
  }

  function handleSearch() {
    setAppliedFilters(cloneThemeListFilters(draftFilters));
  }

  function handleClearFilters() {
    const cleared = { ...defaultThemeListFilters };
    setDraftFilters(cloneThemeListFilters(cleared));
    setAppliedFilters(cloneThemeListFilters(cleared));
  }

  return (
    <div className="space-y-4 p-8">
      <ListPageHeader
        title="Temas"
        action={
          <Button type="button" onClick={() => setCreateOpen(true)}>
            <Plus className="size-4" aria-hidden />
            Adicionar
          </Button>
        }
      />
      <AppDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        title="Novo tema"
      />
      {isPending ? (
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="h-4 w-40 animate-pulse rounded bg-zinc-200" />
          <ul className="mt-4 space-y-2">
            <li className="h-10 animate-pulse rounded bg-zinc-100" />
            <li className="h-10 animate-pulse rounded bg-zinc-100" />
            <li className="h-10 animate-pulse rounded bg-zinc-100" />
          </ul>
        </div>
      ) : null}
      {isError ? (
        <div
          className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-900"
          role="alert"
        >
          <p className="font-medium">Não foi possível carregar os temas.</p>
          <p className="mt-1 text-sm text-red-800">
            {error instanceof Error ? error.message : "Erro desconhecido."}
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-4"
            onClick={() => void refetch()}
          >
            Tentar novamente
          </Button>
        </div>
      ) : null}
      {showSuccessBody ? (
        <>
          <ThemeFiltersBar
            draftFilters={draftFilters}
            onDraftChange={setDraftFilters}
            appliedFilters={appliedFilters}
            options={filterOptions}
            open={filtersOpen}
            onToggleOpen={handleToggleFilters}
            panelId={filterPanelId}
            onSearch={handleSearch}
            onClear={handleClearFilters}
          />
          {!list.length ? (
            <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-12 text-center text-zinc-600">
              <p>Nenhum tema encontrado.</p>
            </div>
          ) : null}
          {list.length > 0 && filteredThemes.length === 0 ? (
            <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-12 text-center text-zinc-600">
              <p>Nenhum tema corresponde aos filtros selecionados.</p>
            </div>
          ) : null}
          {list.length > 0 && filteredThemes.length > 0 ? (
            <ThemesTable themes={filteredThemes} />
          ) : null}
        </>
      ) : null}
    </div>
  );
}

function ThemesTable({ themes }: { themes: Theme[] }) {
  const onEdit = useCallback((_theme: Theme) => {}, []);

  const onDelete = useCallback((_theme: Theme) => {}, []);

  const columns = useThemesColumns({ onEdit, onDelete });
  const table = useReactTable({
    data: themes,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return <DataTable table={table} />;
}
