import type { PieLabelRenderProps, TooltipContentProps } from "recharts";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";
import { cn } from "@/shared/shadcn/lib/utils";

import type { QuestionBankPieSlice } from "../types";
import { DASHBOARD_HIGHLIGHT_CARD_CLASS } from "./dashboard-highlight-card";

type QuestionBanksPieChartProps = {
  data: QuestionBankPieSlice[];
};

function formatPercent(value: number, total: number): string {
  if (total <= 0) return "0%";
  const pct = (value / total) * 100;
  return `${pct.toLocaleString("pt-BR", { maximumFractionDigits: 1, minimumFractionDigits: 0 })}%`;
}

function slicePercentLabel({ percent }: PieLabelRenderProps) {
  if (percent == null || percent < 0.04) return null;
  const pct = percent * 100;
  return `${pct.toLocaleString("pt-BR", { maximumFractionDigits: 1, minimumFractionDigits: 0 })}%`;
}

function BankTooltip({
  active,
  payload,
  total,
}: TooltipContentProps & { total: number }) {
  if (!active || !payload?.length) return null;
  const item = payload[0] as { value?: number; name?: string };
  const v = Number(item?.value ?? 0);
  const name = String(item?.name ?? "");
  return (
    <div className="rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs shadow-md">
      <p className="font-medium text-foreground">{name}</p>
      <p className="tabular-nums text-muted-foreground">
        {v.toLocaleString("pt-BR")} questões ({formatPercent(v, total)})
      </p>
    </div>
  );
}

export function QuestionBanksPieChart({ data }: QuestionBanksPieChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  if (data.length === 0) {
    return (
      <Card className={cn(DASHBOARD_HIGHLIGHT_CARD_CLASS)}>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Por banco de questões</CardTitle>
          <CardDescription>Distribuição do acervo por origem.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 items-center justify-center">
          <p className="text-center text-sm text-muted-foreground" role="status">
            Sem dados para o período.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(DASHBOARD_HIGHLIGHT_CARD_CLASS)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Por banco de questões</CardTitle>
        <CardDescription>
          Distribuição do acervo por origem do banco. Escala com o período selecionado.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        <div className="relative mx-auto h-[220px] w-full max-w-[280px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={72}
                paddingAngle={2}
                stroke="var(--background)"
                strokeWidth={2}
                label={slicePercentLabel}
                labelLine={{ stroke: "hsl(var(--border))", strokeWidth: 1 }}
              >
                {data.map((entry) => (
                  <Cell key={entry.id} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                content={(props) => <BankTooltip {...props} total={total} />}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-xl font-bold tabular-nums text-foreground sm:text-2xl">
                {total.toLocaleString("pt-BR")}
              </p>
              <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                questões
              </p>
            </div>
          </div>
        </div>
        <ul
          className="mt-auto space-y-1.5 text-xs"
          aria-label="Detalhe por banco de questões"
        >
          {data.map((d) => (
            <li
              key={d.id}
              className="flex items-center justify-between gap-2 rounded-md py-0.5"
            >
              <span className="flex min-w-0 items-center gap-2">
                <span
                  className="size-2 shrink-0 rounded-full"
                  style={{ backgroundColor: d.fill }}
                  aria-hidden
                />
                <span className="truncate text-foreground">{d.name}</span>
              </span>
              <span className="flex shrink-0 items-baseline gap-1.5 tabular-nums">
                <span className="text-muted-foreground">
                  {d.value.toLocaleString("pt-BR")}
                </span>
                <span className="text-[11px] font-medium text-foreground">
                  {formatPercent(d.value, total)}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
