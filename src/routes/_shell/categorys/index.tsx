import type { Category } from "@/features/categories/category.types";
import { useCategoriesColumns } from "@/features/categories/categories.columns";
import { useCategories } from "@/features/categories/use-categories";
import { AppDialog } from "@/shared/components/app-dialog";
import { ListPageHeader } from "@/shared/components/list-page-header";
import { DataTable } from "@/shared/components/Table";
import { Button } from "@/shared/shadcn/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useCallback, useState } from "react";

export const Route = createFileRoute("/_shell/categorys/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isPending, isError, error, refetch } = useCategories();
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="space-y-4 p-8">
      <ListPageHeader
        title="Categorias"
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
        title="Nova categoria"
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
            Não foi possível carregar as categorias.
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
          <p>Nenhuma categoria encontrada.</p>
        </div>
      ) : null}
      {!isPending && !isError && data?.length ? (
        <CategoriesTable categories={data} />
      ) : null}
    </div>
  );
}

function CategoriesTable({ categories }: { categories: Category[] }) {
  const onEdit = useCallback((_category: Category) => {}, []);

  const onDelete = useCallback((_category: Category) => {}, []);

  const columns = useCategoriesColumns({ onEdit, onDelete });
  const table = useReactTable({
    data: categories,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return <DataTable table={table} />;
}
