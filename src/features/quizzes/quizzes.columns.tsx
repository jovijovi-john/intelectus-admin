import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

import { ActiveBadge } from "@/shared/components/ActiveBadge";
import { DataTableRowActions } from "@/shared/components/Table";

import type { Quiz } from "./quiz.types";

export type QuizzesColumnHandlers = {
  onEdit: (quiz: Quiz) => void;
  onDelete: (quiz: Quiz) => void;
};

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export function useQuizzesColumns(
  handlers: QuizzesColumnHandlers,
): ColumnDef<Quiz>[] {
  const { onEdit, onDelete } = handlers;
  return useMemo(
    () => [
      { accessorKey: "title", header: "Título" },
      {
        accessorKey: "description",
        header: "Descrição",
        cell: ({ getValue }) => (
          <p className="max-w-40 text-left text-sm text-zinc-800 line-clamp-2">
            {String(getValue() ?? "")}
          </p>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Criado em",
        cell: ({ getValue }) => formatDateTime(String(getValue())),
      },
      { accessorKey: "createdBy", header: "Criado por" },
      {
        id: "questionBanks",
        header: "Bancos",
        cell: ({ row }) => (
          <p className="min-w-48 max-w-md text-left text-zinc-800">
            {row.original.questionBanks.join(", ")}
          </p>
        ),
      },
      {
        accessorKey: "categories",
        header: "Categorias",
        cell: ({ row }) => (
          <p className="max-w-xs text-left text-zinc-800 line-clamp-2">
            {row.original.categories.join(", ")}
          </p>
        ),
      },
      {
        id: "active",
        header: "Ativo",
        cell: ({ row }) => <ActiveBadge active={row.original.active} />,
      },
      {
        id: "actions",
        header: () => <span className="block w-full text-center">Ações</span>,
        cell: ({ row }) => (
          <DataTableRowActions
            onEdit={() => onEdit(row.original)}
            onDelete={() => onDelete(row.original)}
          />
        ),
      },
    ],
    [onEdit, onDelete],
  );
}
