import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

import { ActiveBadge } from "@/shared/components/ActiveBadge";
import { DataTableRowActions } from "@/shared/components/Table";

import type { Theme } from "./theme.types";

export type ThemesColumnHandlers = {
  onEdit: (theme: Theme) => void;
  onDelete: (theme: Theme) => void;
};

export function useThemesColumns(
  handlers: ThemesColumnHandlers,
): ColumnDef<Theme>[] {
  const { onEdit, onDelete } = handlers;
  return useMemo(
    () => [
      { accessorKey: "name", header: "Nome" },
      {
        accessorKey: "description",
        header: "Descrição",
        cell: ({ getValue }) => (
          <p className="mx-auto line-clamp-4 max-w-md break-words text-center text-zinc-800">
            {String(getValue() ?? "")}
          </p>
        ),
      },
      {
        id: "categories",
        header: "Categorias",
        cell: ({ row }) => row.original.categories.join(", "),
      },
      {
        id: "questionCount",
        header: () => <span className="tabular-nums">Qtd. questões</span>,
        cell: ({ row }) => (
          <span className="tabular-nums text-zinc-800">
            {row.original.questionCount}
          </span>
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
