import { BLOOM_LABEL } from "@/features/questions/question-bloom-badge";
import type { QuestionBloomTag } from "@/features/questions/question.types";

import type {
  BloomPieSlice,
  DashboardDateRange,
  DashboardKpi,
  DashboardKpiSource,
  MonthlyQuestionsPoint,
  NewUsersByPlanPoint,
  PremiumCategoryPieSlice,
  QuestionBankPieSlice,
  QuestionHitMissRow,
  ThemeHitMissRow,
  TopQuestionRow,
  TrendingThemeRow,
} from "../types";

import {
  MOCK_KPI_REFERENCE_DAYS,
  dashboardKpiSources,
  subscriptionInsightsBase,
} from "./dashboard.mock";

/** Período inicial padrão (dados de 2026). */
export function getDefaultDashboardRange(): DashboardDateRange {
  return {
    from: new Date(2026, 0, 1),
    to: new Date(2026, 11, 31),
  };
}

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function endOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}

/** Dias inclusivos entre from e to (UTC-safe para datas de calendário). */
export function inclusiveDaysInRange(from: Date, to: Date): number {
  const a = startOfDay(from).getTime();
  const b = startOfDay(to).getTime();
  return Math.max(1, Math.round((b - a) / 86400000) + 1);
}

/** Fator de escala em relação ao período de referência (~30 dias). */
export function rangeScaleFactor(from: Date, to: Date): number {
  const days = inclusiveDaysInRange(from, to);
  return Math.max(0.15, Math.min(3, days / MOCK_KPI_REFERENCE_DAYS));
}

function endOfMonth(periodStartIso: string): Date {
  const [y, m] = periodStartIso.split("-").map(Number);
  const lastDay = new Date(y!, m!, 0);
  return endOfDay(lastDay);
}

function monthOverlapsRange(
  periodStartIso: string,
  from: Date,
  to: Date
): boolean {
  const monthStart = startOfDay(new Date(`${periodStartIso}T12:00:00`));
  const monthEnd = endOfMonth(periodStartIso);
  const rangeStart = startOfDay(from);
  const rangeEnd = endOfDay(to);
  return monthStart <= rangeEnd && monthEnd >= rangeStart;
}

export function filterMonthlyQuestionsSeries(
  series: MonthlyQuestionsPoint[],
  range: DashboardDateRange
): MonthlyQuestionsPoint[] {
  return series.filter((p) =>
    monthOverlapsRange(p.periodStart, range.from, range.to)
  );
}

export function filterNewUsersSeries(
  series: NewUsersByPlanPoint[],
  range: DashboardDateRange
): NewUsersByPlanPoint[] {
  return series.filter((p) =>
    monthOverlapsRange(p.periodStart, range.from, range.to)
  );
}

function formatKpiValue(n: number, format: DashboardKpiSource["format"]): string {
  if (format === "compact") {
    return n.toLocaleString("pt-BR", { maximumFractionDigits: 0 });
  }
  return String(Math.round(n));
}

export function buildKpisForRange(range: DashboardDateRange): DashboardKpi[] {
  const factor = rangeScaleFactor(range.from, range.to);
  return dashboardKpiSources.map((src) => {
    const scaled = Math.max(1, Math.round(src.baseValue * factor));
    return {
      id: src.id,
      label: src.label,
      value: formatKpiValue(scaled, src.format ?? "default"),
      changePercent: src.changePercent,
      auxiliaryLabel: src.auxiliaryLabel,
      auxiliaryValue: src.auxiliaryValue,
    };
  });
}

function formatBrl(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** Cards abaixo de Bloom/Premium: churn e faturamento estimado. */
export function buildSubscriptionInsightsForRange(
  range: DashboardDateRange
): DashboardKpi[] {
  const factor = rangeScaleFactor(range.from, range.to);
  const nonRenewed = Math.max(
    0,
    Math.round(subscriptionInsightsBase.premiumNonRenewedCount * factor)
  );
  const cancelled = Math.max(
    0,
    Math.round(subscriptionInsightsBase.premiumCancelledCount * factor)
  );
  const revenue = Math.max(
    0,
    subscriptionInsightsBase.monthlyRevenueActivePlans * factor
  );

  return [
    {
      id: "premium-non-renewed",
      label: "Pro encerrados sem renovação",
      value: nonRenewed.toLocaleString("pt-BR"),
    },
    {
      id: "premium-cancelled",
      label: "Cancelamentos Pro",
      value: cancelled.toLocaleString("pt-BR"),
    },
    {
      id: "monthly-revenue-active",
      label: "Faturamento do período",
      value: formatBrl(revenue),
    },
  ];
}

export function scaleTopQuestions(
  rows: TopQuestionRow[],
  range: DashboardDateRange
): TopQuestionRow[] {
  const factor = rangeScaleFactor(range.from, range.to);
  return rows.map((r) => ({
    ...r,
    answerCount: Math.max(1, Math.round(r.answerCount * factor)),
  }));
}

export function scaleTrendingThemes(
  rows: TrendingThemeRow[],
  _range: DashboardDateRange
): TrendingThemeRow[] {
  return rows.map((r) => ({ ...r }));
}

export function scaleHitMissRows<T extends QuestionHitMissRow | ThemeHitMissRow>(
  rows: T[],
  range: DashboardDateRange
): T[] {
  const factor = rangeScaleFactor(range.from, range.to);
  return rows.map((r) => ({
    ...r,
    correctCount: Math.max(1, Math.round(r.correctCount * factor)),
    wrongCount: Math.max(1, Math.round(r.wrongCount * factor)),
  })) as T[];
}

export function topQuestionsByCorrect(rows: QuestionHitMissRow[]): QuestionHitMissRow[] {
  return [...rows].sort((a, b) => b.correctCount - a.correctCount);
}

export function topQuestionsByWrong(rows: QuestionHitMissRow[]): QuestionHitMissRow[] {
  return [...rows].sort((a, b) => b.wrongCount - a.wrongCount);
}

export function topThemesByCorrect(rows: ThemeHitMissRow[]): ThemeHitMissRow[] {
  return [...rows].sort((a, b) => b.correctCount - a.correctCount);
}

export function topThemesByWrong(rows: ThemeHitMissRow[]): ThemeHitMissRow[] {
  return [...rows].sort((a, b) => b.wrongCount - a.wrongCount);
}

/** Paleta compartilhada dos donuts (tokens em `index.css`: --chart-pie-1 … --chart-pie-8). */
const DASHBOARD_PIE_PALETTE = [
  "var(--chart-pie-1)",
  "var(--chart-pie-2)",
  "var(--chart-pie-3)",
  "var(--chart-pie-4)",
  "var(--chart-pie-5)",
  "var(--chart-pie-6)",
  "var(--chart-pie-7)",
  "var(--chart-pie-8)",
] as const;

function pieFillAt(index: number): string {
  const n = DASHBOARD_PIE_PALETTE.length;
  const i = ((index % n) + n) % n;
  return DASHBOARD_PIE_PALETTE[i]!;
}

/** Distribuição de questões por Bloom, escalada pelo período. */
export function buildBloomPieSlices(
  base: { tag: QuestionBloomTag; count: number }[],
  range: DashboardDateRange
): BloomPieSlice[] {
  const factor = rangeScaleFactor(range.from, range.to);
  return base.map((b, i) => ({
    tag: b.tag,
    name: BLOOM_LABEL[b.tag],
    value: Math.max(1, Math.round(b.count * factor)),
    fill: pieFillAt(i),
  }));
}

/** Distribuição de usuários Premium por categoria. */
export function buildPremiumCategoryPieSlices(
  base: { id: string; name: string; count: number }[],
  range: DashboardDateRange
): PremiumCategoryPieSlice[] {
  const factor = rangeScaleFactor(range.from, range.to);
  return base.map((b, i) => ({
    id: b.id,
    name: b.name,
    value: Math.max(1, Math.round(b.count * factor)),
    fill: pieFillAt(i),
  }));
}

/** Distribuição de questões por banco de origem. */
export function buildQuestionBankPieSlices(
  base: { id: string; name: string; count: number }[],
  range: DashboardDateRange
): QuestionBankPieSlice[] {
  const factor = rangeScaleFactor(range.from, range.to);
  return base.map((b, i) => ({
    id: b.id,
    name: b.name,
    value: Math.max(1, Math.round(b.count * factor)),
    fill: pieFillAt(i),
  }));
}
