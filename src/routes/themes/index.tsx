import type { Theme } from "@/features/themes/theme.types";
import { useThemesColumns } from "@/features/themes/themes.columns";
import { useThemes } from "@/features/themes/use-themes";
import { DataTable } from "@/shared/components/table";
import { Button } from "@/shared/shadcn/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useCallback } from "react";

export const Route = createFileRoute("/themes/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isPending, isError, error, refetch } = useThemes();

  if (isPending) {
    return (
      <div className="p-8 space-y-4">
        <h1 className="text-2xl font-semibold text-zinc-900">Temas</h1>
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
      <div className="p-8 space-y-4">
        <h1 className="text-2xl font-semibold text-zinc-900">Temas</h1>
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
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="p-8 space-y-4">
        <h1 className="text-2xl font-semibold text-zinc-900">Temas</h1>
        <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-12 text-center text-zinc-600">
          <p>Nenhum tema encontrado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-semibold text-zinc-900">Temas</h1>
      <ThemesTable themes={data} />
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
