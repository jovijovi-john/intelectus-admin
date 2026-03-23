import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

import { DataTableRowActions } from "@/shared/components/Table";

import { UserPlanBadge } from "./user-plan-badge";
import type { User } from "./user.types";

export type UsersColumnHandlers = {
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

function formatCpf(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length !== 11) return raw;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

function formatBirthDate(iso: string): string {
  const parts = iso.split("-");
  if (parts.length !== 3) return iso;
  const y = Number(parts[0]);
  const m = Number(parts[1]);
  const d = Number(parts[2]);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString("pt-BR");
}

export function useUsersColumns(
  handlers: UsersColumnHandlers,
): ColumnDef<User>[] {
  const { onEdit, onDelete } = handlers;
  return useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
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
