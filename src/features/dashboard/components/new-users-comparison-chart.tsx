import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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

import type { NewUsersByPlanPoint } from "../types";
import { ChartShell } from "./chart-shell";

type NewUsersComparisonChartProps = {
  data: NewUsersByPlanPoint[];
};

export function NewUsersComparisonChart({ data }: NewUsersComparisonChartProps) {
  if (data.length === 0) {
    return (
      <Card className="border-zinc-200/80 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Novos usuários na plataforma</CardTitle>
          <CardDescription>
            Comparativo mensal entre cadastros Free e Premium.
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
      <CardHeader>
        <CardTitle className="text-lg">Novos usuários na plataforma</CardTitle>
        <CardDescription>
          Comparativo mensal entre cadastros Free e Premium.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartShell>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="short"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
              <Tooltip
                contentStyle={{
                  borderRadius: "0.5rem",
                  border: "1px solid var(--border)",
                  fontSize: "0.875rem",
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: "0.875rem" }}
                formatter={(value) =>
                  value === "free" ? "Free" : "Premium"
                }
              />
              <Bar
                dataKey="free"
                name="free"
                stackId="users"
                fill="var(--chart-2)"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="premium"
                name="premium"
                stackId="users"
                fill="var(--chart-1)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartShell>
      </CardContent>
    </Card>
  );
}
