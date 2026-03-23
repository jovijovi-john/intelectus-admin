import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

import { ActiveBadge } from "@/shared/components/ActiveBadge";
import { DataTableRowActions } from "@/shared/components/table";

import { QuestionBloomBadge } from "./question-bloom-badge";
import type { Question, QuestionLanguage } from "./question.types";

export type QuestionsColumnHandlers = {
  onEdit: (question: Question) => void;
  onDelete: (question: Question) => void;
};

function formatLanguage(code: QuestionLanguage): string {
  const labels: Record<QuestionLanguage, string> = {
    pt: "Português",
    en: "Inglês",
  };
  return labels[code];
}

export function useQuestionsColumns(
  handlers: QuestionsColumnHandlers,
): ColumnDef<Question>[] {
  const { onEdit, onDelete } = handlers;
  return useMemo(
    () => [
      { accessorKey: "code", header: "Código" },
      {
        accessorKey: "title",
        header: () => <span className="block w-full text-left">Enunciado</span>,
        cell: ({ getValue }) => (
          <p className="max-w-40 text-left text-sm text-zinc-800 line-clamp-2">
            {String(getValue() ?? "")}
          </p>
        ),
      },
      { accessorKey: "theme", header: "Tema" },
      {
        accessorKey: "tag",
        header: "Tag",
        cell: ({ row }) => <QuestionBloomBadge tag={row.original.tag} />,
      },
      {
        accessorKey: "language",
        header: "Idioma",
        cell: ({ row }) => formatLanguage(row.original.language),
      },
      { accessorKey: "createdBy", header: "Criado por" },
      {
        id: "questionBanks",
        header: "Bancos",
        cell: ({ row }) => (
          <p className="min-w-48 max-w-md text-center text-zinc-800">
            {row.original.questionBanks.join(", ")}
          </p>
        ),
      },
      {
        accessorKey: "categories",
        header: "Categorias",
        cell: ({ row }) => (
          <p className="max-w-xs text-center text-zinc-800 line-clamp-2">
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
