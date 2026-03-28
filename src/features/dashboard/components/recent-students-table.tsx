import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { DataTable } from "@/shared/components/Table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";

import type { DashboardRecentStudent } from "../types";
import { recentStudentsColumns } from "./recent-students.columns";

type RecentStudentsTableProps = {
  students: DashboardRecentStudent[];
  /** Mensagem quando a lista está vazia. */
  emptyLabel?: string;
};

export function RecentStudentsTable({
  students,
  emptyLabel = "Nenhum registro disponível.",
}: RecentStudentsTableProps) {
  const table = useReactTable({
    data: students,
    columns: recentStudentsColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="border-zinc-200/80 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Últimos alunos cadastrados</CardTitle>
        <CardDescription>
          Registros recentes na plataforma.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {students.length === 0 ? (
          <p
            className="rounded-lg border border-dashed border-zinc-200 bg-zinc-50/80 px-4 py-8 text-center text-sm text-muted-foreground"
            role="status"
          >
            {emptyLabel}
          </p>
        ) : (
          <DataTable table={table} />
        )}
      </CardContent>
    </Card>
  );
}
