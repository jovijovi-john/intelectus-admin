import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";
import { cn } from "@/shared/shadcn/lib/utils";

import type { TrendingThemeRow } from "../types";
import { ChartShell } from "./chart-shell";
import { DASHBOARD_HIGHLIGHT_CARD_CLASS } from "./dashboard-highlight-card";

type TrendingThemesChartProps = {
  data: TrendingThemeRow[];
};

export function TrendingThemesChart({ data }: TrendingThemesChartProps) {
  if (data.length === 0) {
    return (
      <Card className={cn(DASHBOARD_HIGHLIGHT_CARD_CLASS)}>
        <CardHeader>
          <CardTitle className="text-lg">Temas em alta</CardTitle>
          <CardDescription>
            Índice de tendência por área de conhecimento.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-center">
          <p
            className="rounded-lg border border-dashed border-zinc-200 bg-zinc-50/80 px-4 py-8 text-center text-sm text-muted-foreground"
            role="status"
          >
            Sem dados no período selecionado.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(DASHBOARD_HIGHLIGHT_CARD_CLASS)}>
      <CardHeader>
        <CardTitle className="text-lg">Temas em alta</CardTitle>
        <CardDescription>
          Índice de tendência por área de conhecimento.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col pl-2">
        <ChartShell className="min-h-[300px] flex-1">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
              />
              <YAxis
                domain={[0, 100]}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
                tickFormatter={(v) => `${v}`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "0.5rem",
                  border: "1px solid var(--border)",
                  fontSize: "0.875rem",
                }}
                formatter={(value) => [`${value ?? 0}`, "Índice"]}
              />
              <Bar
                dataKey="trendScore"
                fill="var(--chart-3)"
                radius={[4, 4, 0, 0]}
                maxBarSize={48}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartShell>
      </CardContent>
    </Card>
  );
}
