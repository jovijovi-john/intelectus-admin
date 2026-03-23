import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

import { DataTableRowActions } from "@/shared/components/table";

import type { Category } from "./category.types";

export type CategoriesColumnHandlers = {
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
};

export function useCategoriesColumns(
  handlers: CategoriesColumnHandlers
): ColumnDef<Category>[] {
  const { onEdit, onDelete } = handlers;
  return useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Nome" },
      {
        accessorKey: "description",
        header: "Descrição",
        cell: ({ getValue }) => (
          <p className="mx-auto max-w-md break-words text-left text-zinc-800 line-clamp-3">
            {String(getValue() ?? "")}
          </p>
        ),
      },
      {
        id: "actions",
        header: () => (
          <span className="block w-full text-center">Ações</span>
        ),
        cell: ({ row }) => (
          <DataTableRowActions
            onEdit={() => onEdit(row.original)}
            onDelete={() => onDelete(row.original)}
          />
        ),
      },
    ],
    [onEdit, onDelete]
  );
}
