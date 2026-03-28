import {
  Area,
  AreaChart,
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

import type { MonthlyQuestionsPoint } from "../types";
import { ChartShell } from "./chart-shell";

type QuestionsAnsweredChartProps = {
  data: MonthlyQuestionsPoint[];
};

export function QuestionsAnsweredChart({ data }: QuestionsAnsweredChartProps) {
  if (data.length === 0) {
    return (
      <Card className="border-zinc-200/80 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Questões respondidas ao longo do ano</CardTitle>
          <CardDescription>
            Visão geral do engajamento com resoluções por mês.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p
            className="rounded-lg border border-dashed border-zinc-200 bg-zinc-50/80 px-4 py-8 text-center text-sm text-muted-foreground"
            role="status"
          >
            Nenhum mês no intervalo selecionado. Ajuste o período nos filtros acima.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-zinc-200/80 shadow-sm">
      <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-4 space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg">Questões respondidas ao longo do ano</CardTitle>
          <CardDescription>
            Visão geral do engajamento com resoluções por mês.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartShell>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="fillQuestions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="short"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
                tickFormatter={(v) => `${Number(v) / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "0.5rem",
                  border: "1px solid var(--border)",
                  fontSize: "0.875rem",
                }}
                formatter={(value) => [
                  Number(value ?? 0).toLocaleString("pt-BR"),
                  "Respostas",
                ]}
                labelFormatter={(label) => {
                  const row = data.find((d) => d.short === label);
                  return row?.month ?? String(label);
                }}
              />
              <Area
                dataKey="total"
                type="monotone"
                fill="url(#fillQuestions)"
                stroke="var(--chart-1)"
                strokeWidth={2}
                dot={{ fill: "var(--chart-1)", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartShell>
      </CardContent>
    </Card>
  );
}
