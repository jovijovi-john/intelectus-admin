import { MoreVertical } from "lucide-react";
import { createColumnHelper } from "@tanstack/react-table";

import { UserPlanBadge } from "@/features/users/user-plan-badge";
import { Badge } from "@/shared/shadcn/components/ui/badge";
import { Button } from "@/shared/shadcn/components/ui/button";
import { cn } from "@/shared/shadcn/lib/utils";

import type { DashboardRecentStudent } from "../types";

const columnHelper = createColumnHelper<DashboardRecentStudent>();

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0]![0] ?? ""}${parts[parts.length - 1]![0] ?? ""}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export const recentStudentsColumns = [
    columnHelper.accessor("name", {
      header: "Aluno",
      cell: ({ row }) => {
        const { name } = row.original;
        return (
          <div className="flex min-h-11 items-center justify-center gap-3">
            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-full",
                "bg-primary/15 text-xs font-semibold text-primary"
              )}
              aria-hidden
            >
              {initials(name)}
            </div>
            <p className="max-w-[220px] truncate text-left font-semibold leading-tight text-zinc-900">
              {name}
            </p>
          </div>
        );
      },
    }),
    columnHelper.accessor("plan", {
      header: "Plano",
      cell: ({ getValue }) => <UserPlanBadge plan={getValue()} />,
    }),
    columnHelper.accessor("registeredAt", {
      header: "Cadastro",
      cell: ({ getValue }) => (
        <span className="tabular-nums">
          {dateFormatter.format(new Date(`${getValue()}T12:00:00`))}
        </span>
      ),
    }),
    columnHelper.accessor("email", {
      header: "E-mail",
      cell: ({ getValue }) => (
        <span className="max-w-[200px] truncate">{getValue()}</span>
      ),
    }),
    columnHelper.accessor("category", {
      header: "Categoria",
      cell: ({ getValue }) => (
        <Badge variant="outline" className="font-normal text-muted-foreground">
          {getValue()}
        </Badge>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "",
      cell: () => (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground"
          aria-label="Ações da linha"
        >
          <MoreVertical className="size-4" />
        </Button>
      ),
    }),
];
