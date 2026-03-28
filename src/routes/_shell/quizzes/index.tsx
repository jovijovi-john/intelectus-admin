import { QuizFiltersBar } from "@/features/quizzes/components/quiz-filters-bar";
import type { Quiz } from "@/features/quizzes/quiz.types";
import {
  applyQuizFilters,
  cloneQuizListFilters,
  deriveQuizFilterOptions,
} from "@/features/quizzes/quiz-filters";
import {
  defaultQuizListFilters,
  type QuizListFilters,
} from "@/features/quizzes/quiz-filters.types";
import { useQuizzesColumns } from "@/features/quizzes/quizzes.columns";
import { useQuizzes } from "@/features/quizzes/use-quizzes";
import { AppDialog } from "@/shared/components/app-dialog";
import { ListPageHeader } from "@/shared/components/list-page-header";
import { DataTable } from "@/shared/components/Table";
import { Button } from "@/shared/shadcn/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useCallback, useId, useMemo, useState } from "react";

export const Route = createFileRoute("/_shell/quizzes/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isPending, isError, error, refetch } = useQuizzes();
  const [createOpen, setCreateOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState<QuizListFilters>(() => ({
    ...defaultQuizListFilters,
  }));
  const [appliedFilters, setAppliedFilters] = useState<QuizListFilters>(() => ({
    ...defaultQuizListFilters,
  }));

  const filterPanelId = useId();

  const list = data ?? [];
  const filterOptions = useMemo(
    () => deriveQuizFilterOptions(list),
    [list]
  );
  const filteredQuizzes = useMemo(
    () => applyQuizFilters(list, appliedFilters),
    [list, appliedFilters]
  );

  const showSuccessBody = !isPending && !isError && data !== undefined;

  function handleToggleFilters() {
    setFiltersOpen((open) => {
      if (!open) {
        setDraftFilters(cloneQuizListFilters(appliedFilters));
      }
      return !open;
    });
  }

  function handleSearch() {
    setAppliedFilters(cloneQuizListFilters(draftFilters));
  }

  function handleClearFilters() {
    const cleared = { ...defaultQuizListFilters };
    setDraftFilters(cloneQuizListFilters(cleared));
    setAppliedFilters(cloneQuizListFilters(cleared));
  }

  return (
    <div className="space-y-4 p-8">
      <ListPageHeader
        title="Simulados"
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
        title="Novo simulado"
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
          <p className="font-medium">Não foi possível carregar os simulados.</p>
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
          <QuizFiltersBar
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
              <p>Nenhum simulado encontrado.</p>
            </div>
          ) : null}
          {list.length > 0 && filteredQuizzes.length === 0 ? (
            <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-12 text-center text-zinc-600">
              <p>Nenhum simulado corresponde aos filtros selecionados.</p>
            </div>
          ) : null}
          {list.length > 0 && filteredQuizzes.length > 0 ? (
            <QuizzesTable quizzes={filteredQuizzes} />
          ) : null}
        </>
      ) : null}
    </div>
  );
}

function QuizzesTable({ quizzes }: { quizzes: Quiz[] }) {
  const onEdit = useCallback((_quiz: Quiz) => {}, []);

  const onDelete = useCallback((_quiz: Quiz) => {}, []);

  const columns = useQuizzesColumns({ onEdit, onDelete });
  const table = useReactTable({
    data: quizzes,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return <DataTable table={table} />;
}
