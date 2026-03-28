import type { ReactNode } from "react";

import { cn } from "@/shared/shadcn/lib/utils";

/** Container para gráficos Recharts alinhado ao padrão visual de charts (área responsiva + altura mínima). */
export function ChartShell({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line]:stroke-border/60 w-full min-h-[240px] sm:min-h-[280px]",
        className
      )}
    >
      {children}
    </div>
  );
}
