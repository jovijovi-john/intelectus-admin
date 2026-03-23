import type { ReactNode } from "react";

import { Button } from "@/shared/shadcn/components/ui/button";
import { cn } from "@/shared/shadcn/lib/utils";

type DataTableEditButtonProps = {
  onClick: () => void;
  label?: ReactNode;
  className?: string;
};

export function DataTableEditButton({
  onClick,
  label = "Editar",
  className,
}: DataTableEditButtonProps) {
  return (
    <Button
      type="button"
      variant="default"
      size="sm"
      className={cn(
        "h-8 border-0 bg-amber-500 px-3 text-white shadow-xs hover:bg-amber-600 focus-visible:ring-amber-500/40",
        className
      )}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

type DataTableDeleteButtonProps = {
  onClick: () => void;
  label?: ReactNode;
  className?: string;
};

export function DataTableDeleteButton({
  onClick,
  label = "Excluir",
  className,
}: DataTableDeleteButtonProps) {
  return (
    <Button
      type="button"
      variant="destructive"
      size="sm"
      className={cn(
        "h-8 border-0 bg-red-600 px-3 text-white shadow-xs hover:bg-red-700 focus-visible:ring-red-500/40",
        className
      )}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
