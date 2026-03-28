import type { QuestionBloomTag } from "@/features/questions/question.types";
import { QUESTION_BANK_LABELS } from "@/shared/data/anesthesiology-catalog";

import type {
  DashboardKpiSource,
  DashboardRecentStudent,
  MonthlyQuestionsPoint,
  NewUsersByPlanPoint,
  QuestionHitMissRow,
  ThemeHitMissRow,
  TopQuestionRow,
  TrendingThemeRow,
} from "../types";

/** Referência: ~30 dias para escala linear dos KPIs. */
export const MOCK_KPI_REFERENCE_DAYS = 30;

export const dashboardKpiSources: DashboardKpiSource[] = [
  {
    id: "quizzes",
    label: "Simulados cadastrados",
    baseValue: 142,
    changePercent: 6.2,
    format: "default",
  },
  {
    id: "questions",
    label: "Questões cadastradas",
    baseValue: 8540,
    changePercent: 3.1,
    format: "compact",
  },
  {
    id: "users-free",
    label: "Usuários Free",
    baseValue: 12480,
    changePercent: 8.5,
    format: "compact",
  },
  {
    id: "users-premium",
    label: "Usuários Premium",
    baseValue: 3209,
    changePercent: -1.2,
    format: "compact",
  },
];

export const questionsAnsweredByMonth: MonthlyQuestionsPoint[] = [
  { month: "Janeiro", short: "Jan", total: 4200, periodStart: "2026-01-01" },
  { month: "Fevereiro", short: "Fev", total: 3800, periodStart: "2026-02-01" },
  { month: "Março", short: "Mar", total: 5100, periodStart: "2026-03-01" },
  { month: "Abril", short: "Abr", total: 4900, periodStart: "2026-04-01" },
  { month: "Maio", short: "Mai", total: 6200, periodStart: "2026-05-01" },
  { month: "Junho", short: "Jun", total: 5800, periodStart: "2026-06-01" },
  { month: "Julho", short: "Jul", total: 7100, periodStart: "2026-07-01" },
  { month: "Agosto", short: "Ago", total: 6900, periodStart: "2026-08-01" },
  { month: "Setembro", short: "Set", total: 7400, periodStart: "2026-09-01" },
  { month: "Outubro", short: "Out", total: 8200, periodStart: "2026-10-01" },
  { month: "Novembro", short: "Nov", total: 7800, periodStart: "2026-11-01" },
  { month: "Dezembro", short: "Dez", total: 8600, periodStart: "2026-12-01" },
];

export const newUsersByPlanMonthly: NewUsersByPlanPoint[] = [
  { month: "Jan", short: "Jan", free: 320, premium: 85, periodStart: "2026-01-01" },
  { month: "Fev", short: "Fev", free: 280, premium: 72, periodStart: "2026-02-01" },
  { month: "Mar", short: "Mar", free: 410, premium: 98, periodStart: "2026-03-01" },
  { month: "Abr", short: "Abr", free: 390, premium: 91, periodStart: "2026-04-01" },
  { month: "Mai", short: "Mai", free: 450, premium: 110, periodStart: "2026-05-01" },
  { month: "Jun", short: "Jun", free: 420, premium: 105, periodStart: "2026-06-01" },
  { month: "Jul", short: "Jul", free: 480, premium: 128, periodStart: "2026-07-01" },
  { month: "Ago", short: "Ago", free: 460, premium: 120, periodStart: "2026-08-01" },
  { month: "Set", short: "Set", free: 510, premium: 135, periodStart: "2026-09-01" },
  { month: "Out", short: "Out", free: 530, premium: 142, periodStart: "2026-10-01" },
  { month: "Nov", short: "Nov", free: 490, premium: 130, periodStart: "2026-11-01" },
  { month: "Dez", short: "Dez", free: 550, premium: 148, periodStart: "2026-12-01" },
];

export const topPerformingQuestions: TopQuestionRow[] = [
  {
    id: "1",
    title:
      "Explique o papel do sistema nervoso autônomo na resposta hemodinâmica à laringoscopia.",
    answerCount: 12400,
  },
  {
    id: "2",
    title: "Calcule o débito cardíaco a partir de FC e volume sistólico em um caso hipotético pós-operatório.",
    answerCount: 9820,
  },
  {
    id: "3",
    title:
      "Compare complacência estática e dinâmica em ventilação mecânica com baixo Vt.",
    answerCount: 8750,
  },
  {
    id: "4",
    title: "Proponha um esquema de TIVA com propofol e remifentanil para cirurgia de curta duração.",
    answerCount: 7430,
  },
  {
    id: "5",
    title:
      "Interprete sinais precoces de toxicidade por anestésico local após bloqueio de plexo.",
    answerCount: 6980,
  },
];

export const trendingThemes: TrendingThemeRow[] = [
  { id: "t1", name: "Ponto 13 — inalatórios e CAM (MAC)", trendScore: 94 },
  { id: "t2", name: "Ponto 12 — anestésicos venosos e opioides", trendScore: 88 },
  { id: "t3", name: "Ponto 10 — mecânica e ventilação pulmonar", trendScore: 76 },
  { id: "t4", name: "Ponto 9 — cardiocirculatório", trendScore: 71 },
  { id: "t5", name: "Ponto 14 — anestésicos locais e bloqueios", trendScore: 65 },
];

/** Total de referência para distribuição Bloom (soma das fatias). */
export const MOCK_QUESTIONS_TOTAL_BLOOM = 5000;

/** Contagem de questões por nível Bloom (soma = MOCK_QUESTIONS_TOTAL_BLOOM). */
export const questionsBloomDistributionBase: {
  tag: QuestionBloomTag;
  count: number;
}[] = [
  { tag: "remember", count: 1200 },
  { tag: "understand", count: 900 },
  { tag: "apply", count: 950 },
  { tag: "analyze", count: 800 },
  { tag: "evaluate", count: 650 },
  { tag: "create", count: 500 },
];

/**
 * Distribuição de usuários Premium por estágio de residência (soma ≈ base KPI premium).
 */
export const premiumUsersByCategoryBase: {
  id: string;
  name: string;
  count: number;
}[] = [
  { id: "pc1", name: "TEA/TSA", count: 420 },
  { id: "pc2", name: "R1", count: 980 },
  { id: "pc3", name: "R2", count: 1150 },
  { id: "pc4", name: "R3", count: 659 },
];

const [BANK_QB1, BANK_QB2, BANK_QB3] = QUESTION_BANK_LABELS;

/** Contagem de questões por banco de origem (escala com o período). */
export const questionsByQuestionBankBase: {
  id: string;
  name: string;
  count: number;
}[] = [
  { id: "qb1", name: BANK_QB1, count: 3800 },
  { id: "qb2", name: BANK_QB2, count: 2800 },
  { id: "qb3", name: BANK_QB3, count: 1940 },
];

/**
 * Indicadores de assinatura / receita (escala com o período selecionado).
 * `monthlyRevenueActivePlans` = soma estimada das mensalidades dos planos ativos (BRL).
 */
export const subscriptionInsightsBase = {
  premiumNonRenewedCount: 142,
  premiumCancelledCount: 87,
  monthlyRevenueActivePlans: 487_920.5,
} as const;

/** Base para gráficos de acertos/erros por questão. */
export const questionHitMissBase: QuestionHitMissRow[] = [
  {
    id: "q1",
    title:
      "Explique o papel do sistema nervoso autônomo na resposta hemodinâmica à laringoscopia.",
    correctCount: 9800,
    wrongCount: 1200,
  },
  {
    id: "q2",
    title: "Calcule o débito cardíaco a partir de FC e volume sistólico em um caso hipotético pós-operatório.",
    correctCount: 7200,
    wrongCount: 2100,
  },
  {
    id: "q3",
    title:
      "Compare complacência estática e dinâmica em ventilação mecânica com baixo Vt.",
    correctCount: 8100,
    wrongCount: 950,
  },
  {
    id: "q4",
    title: "Proponha um esquema de TIVA com propofol e remifentanil para cirurgia de curta duração.",
    correctCount: 5600,
    wrongCount: 1800,
  },
  {
    id: "q5",
    title:
      "Interprete sinais precoces de toxicidade por anestésico local após bloqueio de plexo.",
    correctCount: 6100,
    wrongCount: 2400,
  },
];

/** Base para gráficos de acertos/erros por tema. */
export const themeHitMissBase: ThemeHitMissRow[] = [
  {
    id: "th1",
    name: "Ponto 13 — Anestésicos inalatórios e CAM (MAC)",
    correctCount: 45200,
    wrongCount: 8900,
  },
  {
    id: "th2",
    name: "Ponto 12 — Anestésicos venosos e opioides",
    correctCount: 32100,
    wrongCount: 10200,
  },
  {
    id: "th3",
    name: "Ponto 10 — Mecânica e ventilação pulmonar",
    correctCount: 28900,
    wrongCount: 5600,
  },
  {
    id: "th4",
    name: "Ponto 9 — Cardiocirculatório: débito e hemodinâmica",
    correctCount: 19800,
    wrongCount: 7200,
  },
  {
    id: "th5",
    name: "Ponto 14 — Anestésicos locais e bloqueios",
    correctCount: 25600,
    wrongCount: 9100,
  },
];

export const recentStudents: DashboardRecentStudent[] = [
  {
    id: "s1",
    name: "Dra. Ana Costa",
    email: "ana.costa@email.com",
    plan: "pro",
    registeredAt: "2026-03-26",
    category: "R2",
  },
  {
    id: "s2",
    name: "Dr. Bruno Lima",
    email: "bruno.lima@email.com",
    plan: "free",
    registeredAt: "2026-03-25",
    category: "R1",
  },
  {
    id: "s3",
    name: "Dra. Carla Mendes",
    email: "carla.m@email.com",
    plan: "pro",
    registeredAt: "2026-03-24",
    category: "R3",
  },
  {
    id: "s4",
    name: "Dr. Diego Souza",
    email: "diego.s@email.com",
    plan: "free",
    registeredAt: "2026-03-23",
    category: "TEA/TSA",
  },
  {
    id: "s5",
    name: "Dra. Elena Rodrigues",
    email: "elena.r@email.com",
    plan: "pro",
    registeredAt: "2026-03-22",
    category: "R1",
  },
  {
    id: "s6",
    name: "Dr. Felipe Rocha",
    email: "felipe.r@email.com",
    plan: "free",
    registeredAt: "2026-03-21",
    category: "R2",
  },
  {
    id: "s7",
    name: "Dra. Gabriela Nunes",
    email: "gabi.nunes@email.com",
    plan: "pro",
    registeredAt: "2026-02-15",
    category: "R3",
  },
  {
    id: "s8",
    name: "Dr. Henrique Alves",
    email: "henrique.a@email.com",
    plan: "free",
    registeredAt: "2026-01-10",
    category: "TEA/TSA",
  },
];
