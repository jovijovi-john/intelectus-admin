import type { QuestionBankItem } from "@/features/question-bank/question-bank.types";
import { useQuestionBankColumns } from "@/features/question-bank/question-bank.columns";
import { useQuestionBank } from "@/features/question-bank/use-question-bank";
import { AppDialog } from "@/shared/components/app-dialog";
import { ListPageHeader } from "@/shared/components/list-page-header";
import { DataTable } from "@/shared/components/Table";
import { Button } from "@/shared/shadcn/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useCallback, useState } from "react";

export const Route = createFileRoute("/_shell/question-bank/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isPending, isError, error, refetch } = useQuestionBank();
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="space-y-4 p-8">
      <ListPageHeader
        title="Banco de questões"
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
        title="Novo item no banco"
      />
      {isPending ? (
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="h-4 w-56 animate-pulse rounded bg-zinc-200" />
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
            Não foi possível carregar o banco de questões.
          </p>
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
      {!isPending && !isError && !data?.length ? (
        <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-12 text-center text-zinc-600">
          <p>Nenhum item encontrado.</p>
        </div>
      ) : null}
      {!isPending && !isError && data?.length ? (
        <QuestionBankTable items={data} />
      ) : null}
    </div>
  );
}

function QuestionBankTable({ items }: { items: QuestionBankItem[] }) {
  const onEdit = useCallback((_item: QuestionBankItem) => {}, []);

  const onDelete = useCallback((_item: QuestionBankItem) => {}, []);

  const columns = useQuestionBankColumns({ onEdit, onDelete });
  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return <DataTable table={table} />;
}
