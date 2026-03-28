import type { QuestionBloomTag } from "@/features/questions/question.types";
import type { UserPlan } from "@/features/users/user.types";

/** Intervalo inclusive usado nos filtros do dashboard. */
export type DashboardDateRange = {
  from: Date;
  to: Date;
};

/** KPI exibido no topo do dashboard. */
export type DashboardKpi = {
  id: string;
  label: string;
  value: string;
  /** Variação percentual vs mês anterior; ausente quando não aplicável (ex.: ratio). */
  changePercent?: number;
  auxiliaryLabel?: string;
  auxiliaryValue?: string;
};

/** Valor numérico base para KPI antes de formatação e escala por período. */
export type DashboardKpiSource = {
  id: string;
  label: string;
  baseValue: number;
  changePercent?: number;
  auxiliaryLabel?: string;
  auxiliaryValue?: string;
  /** Sufixo opcional no número formatado (ex.: milhar). */
  format?: "default" | "compact";
};

export type MonthlyQuestionsPoint = {
  month: string;
  short: string;
  total: number;
  /** Primeiro dia do mês (ISO) para filtro por intervalo. */
  periodStart: string;
};

export type NewUsersByPlanPoint = {
  month: string;
  short: string;
  free: number;
  premium: number;
  periodStart: string;
};

export type TopQuestionRow = {
  id: string;
  title: string;
  answerCount: number;
};

export type TrendingThemeRow = {
  id: string;
  name: string;
  trendScore: number;
};

/** Ranking de questão por acertos ou erros no período. */
export type QuestionHitMissRow = {
  id: string;
  title: string;
  correctCount: number;
  wrongCount: number;
};

/** Agregado por tema para acertos/erros. */
export type ThemeHitMissRow = {
  id: string;
  name: string;
  correctCount: number;
  wrongCount: number;
};

/** Fatia para gráfico de pizza — questões por nível Bloom. */
export type BloomPieSlice = {
  tag: QuestionBloomTag;
  name: string;
  value: number;
  fill: string;
};

/** Fatia — usuários Premium por categoria de interesse. */
export type PremiumCategoryPieSlice = {
  id: string;
  name: string;
  value: number;
  fill: string;
};

/** Fatia — questões por banco de origem. */
export type QuestionBankPieSlice = {
  id: string;
  name: string;
  value: number;
  fill: string;
};

export type DashboardRecentStudent = {
  id: string;
  name: string;
  email: string;
  plan: UserPlan;
  /** ISO YYYY-MM-DD */
  registeredAt: string;
  category: string;
};
