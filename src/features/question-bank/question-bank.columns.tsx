import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

import { DataTableRowActions } from "@/shared/components/table";

import type { QuestionBankItem } from "./question-bank.types";

export type QuestionBankColumnHandlers = {
  onEdit: (item: QuestionBankItem) => void;
  onDelete: (item: QuestionBankItem) => void;
};

export function useQuestionBankColumns(
  handlers: QuestionBankColumnHandlers
): ColumnDef<QuestionBankItem>[] {
  const { onEdit, onDelete } = handlers;
  return useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
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
        accessorKey: "referenceYear",
        header: "Ano de referência",
      },
      {
        accessorKey: "startYear",
        header: "Ano inicial",
      },
      {
        accessorKey: "finishYear",
        header: "Ano final",
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
