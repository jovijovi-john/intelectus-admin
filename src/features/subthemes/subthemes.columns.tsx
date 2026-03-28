import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

import { ActiveBadge } from "@/shared/components/ActiveBadge";
import { DataTableRowActions } from "@/shared/components/Table";

import type { Subtheme } from "./subtheme.types";

export type SubthemesColumnHandlers = {
  themeNamesById: Map<number, string>;
  onEdit: (subtheme: Subtheme) => void;
  onDelete: (subtheme: Subtheme) => void;
};

export function useSubthemesColumns(
  handlers: SubthemesColumnHandlers,
): ColumnDef<Subtheme>[] {
  const { themeNamesById, onEdit, onDelete } = handlers;
  return useMemo(
    () => [
      {
        id: "parentTheme",
        header: "Tema",
        cell: ({ row }) => (
          <span className="text-zinc-800">
            {themeNamesById.get(row.original.themeId) ??
              `Tema #${row.original.themeId}`}
          </span>
        ),
      },
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
    [themeNamesById, onEdit, onDelete],
  );
}
