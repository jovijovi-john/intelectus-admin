import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
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

import type { TopQuestionRow } from "../types";
import { ChartShell } from "./chart-shell";
import { DASHBOARD_HIGHLIGHT_CARD_CLASS } from "./dashboard-highlight-card";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

type TopQuestionsChartProps = {
  data: TopQuestionRow[];
};

export function TopQuestionsChart({ data }: TopQuestionsChartProps) {
  const chartData = data.map((row) => ({
    ...row,
    /** Título truncado para o eixo Y */
    label:
      row.title.length > 36 ? `${row.title.slice(0, 34)}…` : row.title,
  }));

  if (data.length === 0) {
    return (
      <Card className={cn(DASHBOARD_HIGHLIGHT_CARD_CLASS)}>
        <CardHeader>
          <CardTitle className="text-lg">Top questões</CardTitle>
          <CardDescription>
            Questões com mais resoluções no período.
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
        <CardTitle className="text-lg">Top questões</CardTitle>
        <CardDescription>
          Questões com mais resoluções no período.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col pl-2">
        <ChartShell className="min-h-[300px] flex-1">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 4, right: 16, left: 8, bottom: 4 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis
                type="category"
                dataKey="label"
                width={120}
                tickLine={false}
                axisLine={false}
                fontSize={11}
                tick={{ fill: "var(--muted-foreground)" }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "0.5rem",
                  border: "1px solid var(--border)",
                  fontSize: "0.875rem",
                  /** Sobrescreve o `whiteSpace: nowrap` padrão do Recharts para textos longos. */
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  maxWidth: "min(320px, calc(100vw - 2rem))",
                }}
                labelStyle={{
                  marginBottom: 6,
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                }}
                formatter={(value) => [
                  Number(value ?? 0).toLocaleString("pt-BR"),
                  "Respostas",
                ]}
                labelFormatter={(_label, payload) =>
                  (payload?.[0]?.payload as TopQuestionRow | undefined)
                    ?.title ?? ""
                }
              />
              <Bar dataKey="answerCount" radius={[0, 4, 4, 0]} maxBarSize={28}>
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartShell>
      </CardContent>
    </Card>
  );
}
