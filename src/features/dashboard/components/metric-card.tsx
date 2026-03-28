import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";

import { Badge } from "@/shared/shadcn/components/ui/badge";
import { Card, CardContent } from "@/shared/shadcn/components/ui/card";
import { cn } from "@/shared/shadcn/lib/utils";

import type { DashboardKpi } from "../types";

const metricIconSizes = {
  default: { wrap: "size-11", glyph: "size-5" },
  lg: { wrap: "size-14", glyph: "size-7" },
} as const;

type MetricCardProps = {
  kpi: DashboardKpi;
  icon: LucideIcon;
  iconClassName?: string;
  /** Ícone e área do ícone maiores (ex.: linha de assinatura/faturamento). */
  iconSize?: keyof typeof metricIconSizes;
};

function formatChange(pct: number): string {
  const sign = pct > 0 ? "+" : "";
  return `${sign}${pct.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`;
}

export function MetricCard({
  kpi,
  icon: Icon,
  iconClassName,
  iconSize = "default",
}: MetricCardProps) {
  const { changePercent, auxiliaryLabel, auxiliaryValue } = kpi;
  const positive = changePercent !== undefined && changePercent >= 0;
  const sizes = metricIconSizes[iconSize];

  return (
    <Card className="overflow-hidden border-zinc-200/80 shadow-sm">
      <CardContent className="flex items-start gap-4 p-5">
        <div
          className={cn(
            "flex shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary",
            sizes.wrap,
            iconClassName
          )}
        >
          <Icon className={cn(sizes.glyph)} aria-hidden />
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{kpi.label}</p>
          <div className="flex flex-wrap items-baseline gap-2">
            <p className="text-2xl font-bold tracking-tight text-foreground">
              {kpi.value}
            </p>
            {changePercent !== undefined && (
              <Badge
                variant={positive ? "success" : "danger"}
                className="gap-0.5 font-medium tabular-nums"
              >
                {positive ? (
                  <TrendingUp className="size-3" aria-hidden />
                ) : (
                  <TrendingDown className="size-3" aria-hidden />
                )}
                <span>vs mês anterior {formatChange(changePercent)}</span>
              </Badge>
            )}
            {auxiliaryLabel && auxiliaryValue !== undefined && (
              <span className="text-xs text-muted-foreground">
                {auxiliaryLabel}{" "}
                <span className="font-semibold text-primary">{auxiliaryValue}</span>
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
