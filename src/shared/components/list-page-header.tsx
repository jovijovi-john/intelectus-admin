import type { ReactNode } from "react";

import { cn } from "@/shared/shadcn/lib/utils";

export type ListPageHeaderProps = {
  title: string;
  action?: ReactNode;
  className?: string;
};

export function ListPageHeader({ title, action, className }: ListPageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <h1 className="text-2xl font-semibold text-zinc-900">{title}</h1>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
