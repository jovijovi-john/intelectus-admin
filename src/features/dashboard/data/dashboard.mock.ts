import type { QuestionBloomTag } from "@/features/questions/question.types";

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
    title: "Funções do 1º grau — interpretação de gráfico",
    answerCount: 12400,
  },
  {
    id: "2",
    title: "Leis de Newton — exercícios combinados",
    answerCount: 9820,
  },
  {
    id: "3",
    title: "Célula eucariótica — organelas",
    answerCount: 8750,
  },
  {
    id: "4",
    title: "Revolução Francesa — causas e consequências",
    answerCount: 7430,
  },
  { id: "5", title: "Frações algébricas — simplificação", answerCount: 6980 },
];

export const trendingThemes: TrendingThemeRow[] = [
  { id: "t1", name: "Matemática", trendScore: 94 },
  { id: "t2", name: "Física", trendScore: 88 },
  { id: "t3", name: "Biologia", trendScore: 76 },
  { id: "t4", name: "História", trendScore: 71 },
  { id: "t5", name: "Química orgânica", trendScore: 65 },
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
 * Distribuição de usuários Premium por categoria de interesse (soma ≈ base KPI premium).
 */
export const premiumUsersByCategoryBase: {
  id: string;
  name: string;
  count: number;
}[] = [
  { id: "pc1", name: "Medicina", count: 980 },
  { id: "pc2", name: "Tecnologia", count: 720 },
  { id: "pc3", name: "Engenharia", count: 610 },
  { id: "pc4", name: "Direito", count: 340 },
  { id: "pc5", name: "Outras áreas", count: 559 },
];

/** Contagem de questões por banco de origem (escala com o período). */
export const questionsByQuestionBankBase: {
  id: string;
  name: string;
  count: number;
}[] = [
  { id: "qb1", name: "Prova anual", count: 2200 },
  { id: "qb2", name: "Intelectus", count: 3800 },
  { id: "qb3", name: "Outro banco de questões", count: 1400 },
  { id: "qb4", name: "Banco aleatório", count: 900 },
  { id: "qb5", name: "Banco de questões", count: 1700 },
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
    title: "Funções do 1º grau — interpretação de gráfico",
    correctCount: 9800,
    wrongCount: 1200,
  },
  {
    id: "q2",
    title: "Leis de Newton — exercícios combinados",
    correctCount: 7200,
    wrongCount: 2100,
  },
  {
    id: "q3",
    title: "Célula eucariótica — organelas",
    correctCount: 8100,
    wrongCount: 950,
  },
  {
    id: "q4",
    title: "Revolução Francesa — causas e consequências",
    correctCount: 5600,
    wrongCount: 1800,
  },
  {
    id: "q5",
    title: "Frações algébricas — simplificação",
    correctCount: 6100,
    wrongCount: 2400,
  },
];

/** Base para gráficos de acertos/erros por tema. */
export const themeHitMissBase: ThemeHitMissRow[] = [
  { id: "th1", name: "Matemática", correctCount: 45200, wrongCount: 8900 },
  { id: "th2", name: "Física", correctCount: 32100, wrongCount: 10200 },
  { id: "th3", name: "Biologia", correctCount: 28900, wrongCount: 5600 },
  { id: "th4", name: "História", correctCount: 19800, wrongCount: 7200 },
  { id: "th5", name: "Química", correctCount: 25600, wrongCount: 9100 },
];

export const recentStudents: DashboardRecentStudent[] = [
  {
    id: "s1",
    name: "Ana Costa",
    email: "ana.costa@email.com",
    plan: "pro",
    registeredAt: "2026-03-26",
    category: "Medicina",
  },
  {
    id: "s2",
    name: "Bruno Lima",
    email: "bruno.lima@email.com",
    plan: "free",
    registeredAt: "2026-03-25",
    category: "Tecnologia",
  },
  {
    id: "s3",
    name: "Carla Mendes",
    email: "carla.m@email.com",
    plan: "pro",
    registeredAt: "2026-03-24",
    category: "Engenharia",
  },
  {
    id: "s4",
    name: "Diego Souza",
    email: "diego.s@email.com",
    plan: "free",
    registeredAt: "2026-03-23",
    category: "Direito",
  },
  {
    id: "s5",
    name: "Elena Rodrigues",
    email: "elena.r@email.com",
    plan: "pro",
    registeredAt: "2026-03-22",
    category: "Medicina",
  },
  {
    id: "s6",
    name: "Felipe Rocha",
    email: "felipe.r@email.com",
    plan: "free",
    registeredAt: "2026-03-21",
    category: "Administração",
  },
  {
    id: "s7",
    name: "Gabriela Nunes",
    email: "gabi.nunes@email.com",
    plan: "pro",
    registeredAt: "2026-02-15",
    category: "Enfermagem",
  },
  {
    id: "s8",
    name: "Henrique Alves",
    email: "henrique.a@email.com",
    plan: "free",
    registeredAt: "2026-01-10",
    category: "Tecnologia",
  },
];
