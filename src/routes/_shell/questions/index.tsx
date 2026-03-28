import { QuestionFiltersBar } from "@/features/questions/components/question-filters-bar";
import type { Question } from "@/features/questions/question.types";
import {
  applyQuestionFilters,
  cloneQuestionListFilters,
  deriveQuestionFilterOptions,
} from "@/features/questions/question-filters";
import {
  defaultQuestionListFilters,
  type QuestionListFilters,
} from "@/features/questions/question-filters.types";
import { useQuestionsColumns } from "@/features/questions/questions.columns";
import { useQuestions } from "@/features/questions/use-questions";
import { AppDialog } from "@/shared/components/app-dialog";
import { ListPageHeader } from "@/shared/components/list-page-header";
import { DataTable } from "@/shared/components/Table";
import { Button } from "@/shared/shadcn/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useCallback, useId, useMemo, useState } from "react";

export const Route = createFileRoute("/_shell/questions/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isPending, isError, error, refetch } = useQuestions();
  const [createOpen, setCreateOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState<QuestionListFilters>(() => ({
    ...defaultQuestionListFilters,
  }));
  const [appliedFilters, setAppliedFilters] = useState<QuestionListFilters>(
    () => ({
      ...defaultQuestionListFilters,
    })
  );

  const filterPanelId = useId();

  const list = data ?? [];
  const filterOptions = useMemo(
    () => deriveQuestionFilterOptions(list),
    [list]
  );
  const filteredQuestions = useMemo(
    () => applyQuestionFilters(list, appliedFilters),
    [list, appliedFilters]
  );

  const showSuccessBody = !isPending && !isError && data !== undefined;

  function handleToggleFilters() {
    setFiltersOpen((open) => {
      if (!open) {
        setDraftFilters(cloneQuestionListFilters(appliedFilters));
      }
      return !open;
    });
  }

  function handleSearch() {
    setAppliedFilters(cloneQuestionListFilters(draftFilters));
  }

  function handleClearFilters() {
    const cleared = { ...defaultQuestionListFilters };
    setDraftFilters(cloneQuestionListFilters(cleared));
    setAppliedFilters(cloneQuestionListFilters(cleared));
  }

  return (
    <div className="space-y-4 p-8">
      <ListPageHeader
        title="Questões"
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
        title="Nova questão"
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
          <p className="font-medium">Não foi possível carregar as questões.</p>
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
          <QuestionFiltersBar
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
              <p>Nenhuma questão encontrada.</p>
            </div>
          ) : null}
          {list.length > 0 && filteredQuestions.length === 0 ? (
            <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-12 text-center text-zinc-600">
              <p>Nenhuma questão corresponde aos filtros selecionados.</p>
            </div>
          ) : null}
          {list.length > 0 && filteredQuestions.length > 0 ? (
            <QuestionsTable questions={filteredQuestions} />
          ) : null}
        </>
      ) : null}
    </div>
  );
}

function QuestionsTable({ questions }: { questions: Question[] }) {
  const onEdit = useCallback((_question: Question) => {}, []);

  const onDelete = useCallback((_question: Question) => {}, []);

  const columns = useQuestionsColumns({ onEdit, onDelete });
  const table = useReactTable({
    data: questions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return <DataTable table={table} />;
}
