import type { Quiz } from "@/features/quizzes/quiz.types";
import { useQuizzesColumns } from "@/features/quizzes/quizzes.columns";
import { useQuizzes } from "@/features/quizzes/use-quizzes";
import { DataTable } from "@/shared/components/Table";
import { Button } from "@/shared/shadcn/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useCallback } from "react";

export const Route = createFileRoute("/quizzes/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isPending, isError, error, refetch } = useQuizzes();

  if (isPending) {
    return (
      <div className="space-y-4 p-8">
        <h1 className="text-2xl font-semibold text-zinc-900">Simulados</h1>
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="h-4 w-40 animate-pulse rounded bg-zinc-200" />
          <ul className="mt-4 space-y-2">
            <li className="h-10 animate-pulse rounded bg-zinc-100" />
            <li className="h-10 animate-pulse rounded bg-zinc-100" />
            <li className="h-10 animate-pulse rounded bg-zinc-100" />
          </ul>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4 p-8">
        <h1 className="text-2xl font-semibold text-zinc-900">Simulados</h1>
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
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="space-y-4 p-8">
        <h1 className="text-2xl font-semibold text-zinc-900">Simulados</h1>
        <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-12 text-center text-zinc-600">
          <p>Nenhum simulado encontrado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-8">
      <h1 className="text-2xl font-semibold text-zinc-900">Simulados</h1>
      <QuizzesTable quizzes={data} />
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
