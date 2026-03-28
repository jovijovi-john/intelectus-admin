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

import { ChartShell } from "./chart-shell";

export type HorizontalBarDatum = {
  id: string;
  label: string;
  value: number;
};

type DashboardHorizontalBarChartProps = {
  title: string;
  description: string;
  data: HorizontalBarDatum[];
  /** Cor das barras (ex.: var(--chart-4)). */
  barColor: string;
  emptyMessage?: string;
  valueAxisLabel?: string;
};

export function DashboardHorizontalBarChart({
  title,
  description,
  data,
  barColor,
  emptyMessage = "Nenhum dado neste período.",
  valueAxisLabel = "Total",
}: DashboardHorizontalBarChartProps) {
  if (data.length === 0) {
    return (
      <Card className="border-zinc-200/80 shadow-sm transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p
            className="rounded-lg border border-dashed border-zinc-200 bg-zinc-50/80 px-4 py-8 text-center text-sm text-muted-foreground"
            role="status"
          >
            {emptyMessage}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-zinc-200/80 shadow-sm transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartShell className="min-h-[260px] sm:min-h-[300px]">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 4, right: 16, left: 8, bottom: 4 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis
                type="category"
                dataKey="label"
                width={118}
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
                  maxWidth: 300,
                }}
                formatter={(v) => [
                  Number(v ?? 0).toLocaleString("pt-BR"),
                  valueAxisLabel,
                ]}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={28}>
                {data.map((_, index) => (
                  <Cell key={data[index]!.id} fill={barColor} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartShell>
      </CardContent>
    </Card>
  );
}
