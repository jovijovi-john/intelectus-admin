import { cn } from "@/shared/shadcn/lib/utils";

import {
  DataTableDeleteButton,
  DataTableEditButton,
} from "./data-table-action-buttons";

type DataTableRowActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
  editLabel?: string;
  deleteLabel?: string;
  className?: string;
};

export function DataTableRowActions({
  onEdit,
  onDelete,
  editLabel = "Editar",
  deleteLabel = "Excluir",
  className,
}: DataTableRowActionsProps) {
  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      <DataTableEditButton onClick={onEdit} label={editLabel} />
      <DataTableDeleteButton onClick={onDelete} label={deleteLabel} />
    </div>
  );
}
