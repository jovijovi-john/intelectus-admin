import { UserFiltersBar } from "@/features/users/components/user-filters-bar";
import type { User } from "@/features/users/user.types";
import {
  applyUserFilters,
  cloneUserListFilters,
  deriveUserFilterOptions,
} from "@/features/users/user-filters";
import {
  defaultUserListFilters,
  type UserListFilters,
} from "@/features/users/user-filters.types";
import { useUsersColumns } from "@/features/users/users.columns";
import { useUsers } from "@/features/users/use-users";
import { AppDialog } from "@/shared/components/app-dialog";
import { ListPageHeader } from "@/shared/components/list-page-header";
import { DataTable } from "@/shared/components/Table";
import { Button } from "@/shared/shadcn/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useCallback, useId, useMemo, useState } from "react";

export const Route = createFileRoute("/_shell/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isPending, isError, error, refetch } = useUsers();
  const [createOpen, setCreateOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState<UserListFilters>(() => ({
    ...defaultUserListFilters,
  }));
  const [appliedFilters, setAppliedFilters] = useState<UserListFilters>(() => ({
    ...defaultUserListFilters,
  }));

  const filterPanelId = useId();

  const list = data ?? [];
  const filterOptions = useMemo(() => deriveUserFilterOptions(list), [list]);
  const filteredUsers = useMemo(
    () => applyUserFilters(list, appliedFilters),
    [list, appliedFilters]
  );

  const showSuccessBody = !isPending && !isError && data !== undefined;

  function handleToggleFilters() {
    setFiltersOpen((open) => {
      if (!open) {
        setDraftFilters(cloneUserListFilters(appliedFilters));
      }
      return !open;
    });
  }

  function handleSearch() {
    setAppliedFilters(cloneUserListFilters(draftFilters));
  }

  function handleClearFilters() {
    const cleared = { ...defaultUserListFilters };
    setDraftFilters(cloneUserListFilters(cleared));
    setAppliedFilters(cloneUserListFilters(cleared));
  }

  return (
    <div className="space-y-4 p-8">
      <ListPageHeader
        title="Usuários"
        action={
          <Button type="button" onClick={() => setCreateOpen(true)}>
            <Plus className="size-4" aria-hidden />
            Adicionar
          </Button>
        }
      />
      <AppDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        title="Novo usuário"
      />
      {isPending ? (
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="h-4 w-40 animate-pulse rounded bg-zinc-200" />
          <ul className="mt-4 space-y-2">
            <li className="h-10 animate-pulse rounded bg-zinc-100" />
            <li className="h-10 animate-pulse rounded bg-zinc-100" />
            <li className="h-10 animate-pulse rounded bg-zinc-100" />
          </ul>
        </div>
      ) : null}
      {isError ? (
        <div
          className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-900"
          role="alert"
        >
          <p className="font-medium">Não foi possível carregar os usuários.</p>
          <p className="mt-1 text-sm text-red-800">
            {error instanceof Error ? error.message : "Erro desconhecido."}
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-4"
            onClick={() => void refetch()}
          >
            Tentar novamente
          </Button>
        </div>
      ) : null}
      {showSuccessBody ? (
        <>
          <UserFiltersBar
            draftFilters={draftFilters}
            onDraftChange={setDraftFilters}
            appliedFilters={appliedFilters}
            options={filterOptions}
            open={filtersOpen}
            onToggleOpen={handleToggleFilters}
            panelId={filterPanelId}
            onSearch={handleSearch}
            onClear={handleClearFilters}
          />
          {!list.length ? (
            <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-12 text-center text-zinc-600">
              <p>Nenhum usuário encontrado.</p>
            </div>
          ) : null}
          {list.length > 0 && filteredUsers.length === 0 ? (
            <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-12 text-center text-zinc-600">
              <p>Nenhum usuário corresponde aos filtros selecionados.</p>
            </div>
          ) : null}
          {list.length > 0 && filteredUsers.length > 0 ? (
            <UsersTable users={filteredUsers} />
          ) : null}
        </>
      ) : null}
    </div>
  );
}

function UsersTable({ users }: { users: User[] }) {
  const onEdit = useCallback((_user: User) => {}, []);

  const onDelete = useCallback((_user: User) => {}, []);

  const columns = useUsersColumns({ onEdit, onDelete });
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return <DataTable table={table} />;
}
