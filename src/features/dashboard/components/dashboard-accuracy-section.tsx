import type { QuestionHitMissRow, ThemeHitMissRow } from "../types";
import {
  topQuestionsByCorrect,
  topQuestionsByWrong,
  topThemesByCorrect,
  topThemesByWrong,
} from "../data/dashboard.selectors";
import {
  DashboardHorizontalBarChart,
  type HorizontalBarDatum,
} from "./dashboard-horizontal-bar-chart";

function truncateLabel(text: string, max = 34): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1)}…`;
}

function questionRowsToBars(
  rows: QuestionHitMissRow[],
  key: "correctCount" | "wrongCount"
): HorizontalBarDatum[] {
  return rows.map((r) => ({
    id: r.id,
    label: truncateLabel(r.title),
    value: r[key],
  }));
}

function themeRowsToBars(
  rows: ThemeHitMissRow[],
  key: "correctCount" | "wrongCount"
): HorizontalBarDatum[] {
  return rows.map((r) => ({
    id: r.id,
    label: truncateLabel(r.name, 20),
    value: r[key],
  }));
}

type DashboardAccuracySectionProps = {
  questionRows: QuestionHitMissRow[];
  themeRows: ThemeHitMissRow[];
};

export function DashboardAccuracySection({
  questionRows,
  themeRows,
}: DashboardAccuracySectionProps) {
  const qCorrect = questionRowsToBars(
    topQuestionsByCorrect(questionRows),
    "correctCount"
  );
  const qWrong = questionRowsToBars(topQuestionsByWrong(questionRows), "wrongCount");
  const tCorrect = themeRowsToBars(topThemesByCorrect(themeRows), "correctCount");
  const tWrong = themeRowsToBars(topThemesByWrong(themeRows), "wrongCount");

  return (
    <section
      className="grid gap-6 md:grid-cols-2"
      aria-label="Desempenho: acertos e erros"
    >
      <DashboardHorizontalBarChart
        title="Questões com mais acertos"
        description="Ranking por quantidade de respostas corretas no período."
        data={qCorrect}
        barColor="var(--chart-4)"
        valueAxisLabel="Acertos"
      />
      <DashboardHorizontalBarChart
        title="Questões com mais erros"
        description="Ranking por quantidade de respostas incorretas no período."
        data={qWrong}
        barColor="var(--chart-5)"
        valueAxisLabel="Erros"
      />
      <DashboardHorizontalBarChart
        title="Temas com mais acertos"
        description="Volume agregado de acertos por tema."
        data={tCorrect}
        barColor="var(--chart-3)"
        valueAxisLabel="Acertos"
      />
      <DashboardHorizontalBarChart
        title="Temas com mais erros"
        description="Volume agregado de erros por tema."
        data={tWrong}
        barColor="var(--destructive)"
        valueAxisLabel="Erros"
      />
    </section>
  );
}
