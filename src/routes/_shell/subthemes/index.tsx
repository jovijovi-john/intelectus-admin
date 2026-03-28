import { SubthemeFiltersBar } from "@/features/subthemes/components/subtheme-filters-bar";
import type { Subtheme } from "@/features/subthemes/subtheme.types";
import {
  applySubthemeFilters,
  cloneSubthemeListFilters,
  deriveSubthemeFilterOptions,
} from "@/features/subthemes/subtheme-filters";
import {
  defaultSubthemeListFilters,
  type SubthemeListFilters,
} from "@/features/subthemes/subtheme-filters.types";
import { useSubthemesColumns } from "@/features/subthemes/subthemes.columns";
import { useSubthemes } from "@/features/subthemes/use-subthemes";
import { useThemes } from "@/features/themes/use-themes";
import { AppDialog } from "@/shared/components/app-dialog";
import { ListPageHeader } from "@/shared/components/list-page-header";
import { DataTable } from "@/shared/components/Table";
import { Button } from "@/shared/shadcn/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useCallback, useId, useMemo, useState } from "react";

export const Route = createFileRoute("/_shell/subthemes/")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    data: subthemesData,
    isPending: subthemesPending,
    isError: subthemesError,
    error: subthemesErr,
    refetch: refetchSubthemes,
  } = useSubthemes();
  const {
    data: themesData,
    isPending: themesPending,
    isError: themesError,
    error: themesErr,
    refetch: refetchThemes,
  } = useThemes();

  const [createOpen, setCreateOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState<SubthemeListFilters>(() => ({
    ...defaultSubthemeListFilters,
  }));
  const [appliedFilters, setAppliedFilters] = useState<SubthemeListFilters>(
    () => ({
      ...defaultSubthemeListFilters,
    })
  );

  const filterPanelId = useId();

  const themesList = themesData ?? [];
  const subthemesList = subthemesData ?? [];

  const themeNamesById = useMemo(() => {
    const m = new Map<number, string>();
    for (const t of themesList) {
      m.set(t.id, t.name);
    }
    return m;
  }, [themesList]);

  const filterOptions = useMemo(
    () => deriveSubthemeFilterOptions(subthemesList, themesList),
    [subthemesList, themesList]
  );

  const filteredSubthemes = useMemo(
    () => applySubthemeFilters(subthemesList, appliedFilters),
    [subthemesList, appliedFilters]
  );

  const isPending = subthemesPending || themesPending;
  const isError = subthemesError || themesError;
  const error = subthemesErr ?? themesErr;

  const showSuccessBody =
    !isPending && !isError && subthemesData !== undefined && themesData !== undefined;

  function handleToggleFilters() {
    setFiltersOpen((open) => {
      if (!open) {
        setDraftFilters(cloneSubthemeListFilters(appliedFilters));
      }
      return !open;
    });
  }

  function handleSearch() {
    setAppliedFilters(cloneSubthemeListFilters(draftFilters));
  }

  function handleClearFilters() {
    const cleared = { ...defaultSubthemeListFilters };
    setDraftFilters(cloneSubthemeListFilters(cleared));
    setAppliedFilters(cloneSubthemeListFilters(cleared));
  }

  function handleRefetch() {
    void refetchSubthemes();
    void refetchThemes();
  }

  return (
    <div className="space-y-4 p-8">
      <ListPageHeader
        title="Subtemas"
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
        title="Novo subtema"
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
          <p className="font-medium">
            Não foi possível carregar subtemas ou temas.
          </p>
          <p className="mt-1 text-sm text-red-800">
            {error instanceof Error ? error.message : "Erro desconhecido."}
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-4"
            onClick={() => void handleRefetch()}
          >
            Tentar novamente
          </Button>
        </div>
      ) : null}
      {showSuccessBody ? (
        <>
          <SubthemeFiltersBar
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
          {!subthemesList.length ? (
            <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-12 text-center text-zinc-600">
              <p>Nenhum subtema encontrado.</p>
            </div>
          ) : null}
          {subthemesList.length > 0 && filteredSubthemes.length === 0 ? (
            <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-12 text-center text-zinc-600">
              <p>Nenhum subtema corresponde aos filtros selecionados.</p>
            </div>
          ) : null}
          {subthemesList.length > 0 && filteredSubthemes.length > 0 ? (
            <SubthemesTable
              subthemes={filteredSubthemes}
              themeNamesById={themeNamesById}
            />
          ) : null}
        </>
      ) : null}
    </div>
  );
}

function SubthemesTable({
  subthemes,
  themeNamesById,
}: {
  subthemes: Subtheme[];
  themeNamesById: Map<number, string>;
}) {
  const onEdit = useCallback((_sub: Subtheme) => {}, []);

  const onDelete = useCallback((_sub: Subtheme) => {}, []);

  const columns = useSubthemesColumns({
    themeNamesById,
    onEdit,
    onDelete,
  });
  const table = useReactTable({
    data: subthemes,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return <DataTable table={table} />;
}
