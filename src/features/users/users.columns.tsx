import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

import { DataTableRowActions } from "@/shared/components/Table";
import { formatBirthDate, formatCpf } from "@/shared/lib/format-brasil";

import { UserPlanBadge } from "./user-plan-badge";
import type { User } from "./user.types";

export type UsersColumnHandlers = {
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

export function useUsersColumns(
  handlers: UsersColumnHandlers,
): ColumnDef<User>[] {
  const { onEdit, onDelete } = handlers;
  return useMemo(
    () => [
      { accessorKey: "name", header: "Nome" },
      { accessorKey: "email", header: "E-mail" },
      {
        accessorKey: "plan",
        header: "Plano",
        cell: ({ row }) => <UserPlanBadge plan={row.original.plan} />,
      },
      {
        accessorKey: "cpf",
        header: "CPF",
        cell: ({ getValue }) => formatCpf(String(getValue())),
      },
      {
        accessorKey: "birthDate",
        header: "Data de nascimento",
        cell: ({ getValue }) => formatBirthDate(String(getValue())),
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
