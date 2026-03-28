import { BookOpen, CalendarX, ClipboardList, Crown, UserX, Users, Wallet } from "lucide-react";
import { useMemo, useState } from "react";

import type { DashboardDateRange } from "../types";
import {
  newUsersByPlanMonthly,
  premiumUsersByCategoryBase,
  questionHitMissBase,
  questionsAnsweredByMonth,
  questionsBloomDistributionBase,
  questionsByQuestionBankBase,
  recentStudents,
  themeHitMissBase,
  topPerformingQuestions,
  trendingThemes,
} from "../data/dashboard.mock";
import {
  buildBloomPieSlices,
  buildKpisForRange,
  buildPremiumCategoryPieSlices,
  buildQuestionBankPieSlices,
  buildSubscriptionInsightsForRange,
  filterMonthlyQuestionsSeries,
  filterNewUsersSeries,
  getDefaultDashboardRange,
  scaleHitMissRows,
  scaleTopQuestions,
  scaleTrendingThemes,
} from "../data/dashboard.selectors";
import { DashboardAccuracySection } from "./dashboard-accuracy-section";
import { DashboardDateRangeFilter } from "./dashboard-date-range-filter";
import { MetricCard } from "./metric-card";
import { NewUsersComparisonChart } from "./new-users-comparison-chart";
import { PremiumCategoriesPieChart } from "./premium-categories-pie-chart";
import { QuestionBanksPieChart } from "./question-banks-pie-chart";
import { QuestionsAnsweredChart } from "./questions-answered-chart";
import { QuestionsBloomPieChart } from "./questions-bloom-pie-chart";
import { RecentStudentsTable } from "./recent-students-table";
import { TopQuestionsChart } from "./top-questions-chart";
import { TrendingThemesChart } from "./trending-themes-chart";

const kpiIcons = [
  { id: "quizzes", icon: ClipboardList },
  { id: "questions", icon: BookOpen },
  { id: "users-free", icon: Users },
  { id: "users-premium", icon: Crown },
] as const;

const subscriptionInsightIcons = [CalendarX, UserX, Wallet] as const;

export function DashboardPage() {
  const [range, setRange] = useState<DashboardDateRange>(getDefaultDashboardRange);

  const kpis = useMemo(() => buildKpisForRange(range), [range]);

  const questionsSeries = useMemo(
    () => filterMonthlyQuestionsSeries(questionsAnsweredByMonth, range),
    [range]
  );

  const newUsersSeries = useMemo(
    () => filterNewUsersSeries(newUsersByPlanMonthly, range),
    [range]
  );

  const topQuestions = useMemo(
    () => scaleTopQuestions(topPerformingQuestions, range),
    [range]
  );

  const themes = useMemo(
    () => scaleTrendingThemes(trendingThemes, range),
    [range]
  );

  const questionAccuracy = useMemo(
    () => scaleHitMissRows(questionHitMissBase, range),
    [range]
  );

  const themeAccuracy = useMemo(
    () => scaleHitMissRows(themeHitMissBase, range),
    [range]
  );

  const bloomPie = useMemo(
    () => buildBloomPieSlices(questionsBloomDistributionBase, range),
    [range]
  );

  const premiumCategoriesPie = useMemo(
    () => buildPremiumCategoryPieSlices(premiumUsersByCategoryBase, range),
    [range]
  );

  const questionBanksPie = useMemo(
    () => buildQuestionBankPieSlices(questionsByQuestionBankBase, range),
    [range]
  );

  const subscriptionInsights = useMemo(
    () => buildSubscriptionInsightsForRange(range),
    [range]
  );

  return (
    <div className="space-y-8 p-8">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Visão geral de métricas e engajamento. Os dados abaixo são mockados e
            reagem ao período selecionado.
          </p>
        </div>
        <DashboardDateRangeFilter value={range} onChange={setRange} className="lg:max-w-xl" />
      </header>

      <section
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        aria-label="Indicadores principais"
      >
        {kpis.map((kpi) => {
          const meta = kpiIcons.find((m) => m.id === kpi.id);
          const Icon = meta?.icon ?? ClipboardList;
          return <MetricCard key={kpi.id} kpi={kpi} icon={Icon} />;
        })}
      </section>

      <section aria-label="Questões respondidas">
        <QuestionsAnsweredChart data={questionsSeries} />
      </section>

      <section aria-label="Novos usuários por plano">
        <NewUsersComparisonChart data={newUsersSeries} />
      </section>

      <section
        className="grid gap-6 lg:grid-cols-12 lg:items-stretch"
        aria-label="Destaques de conteúdo e bancos"
      >
        <div className="flex min-h-0 lg:col-span-4">
          <TopQuestionsChart data={topQuestions} />
        </div>
        <div className="flex min-h-0 lg:col-span-4">
          <TrendingThemesChart data={themes} />
        </div>
        <div className="flex min-h-0 lg:col-span-4">
          <QuestionBanksPieChart data={questionBanksPie} />
        </div>
      </section>

      <section
        className="grid gap-6 lg:grid-cols-12 lg:items-stretch"
        aria-label="Bloom e Premium"
      >
        <div className="flex min-h-0 lg:col-span-6">
          <QuestionsBloomPieChart data={bloomPie} />
        </div>
        <div className="flex min-h-0 lg:col-span-6">
          <PremiumCategoriesPieChart data={premiumCategoriesPie} />
        </div>
      </section>

      <section
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        aria-label="Assinaturas Pro e faturamento"
      >
        {subscriptionInsights.map((kpi, index) => {
          const Icon = subscriptionInsightIcons[index] ?? ClipboardList;
          return (
            <MetricCard key={kpi.id} kpi={kpi} icon={Icon} iconSize="lg" />
          );
        })}
      </section>

      <section aria-label="Desempenho acertos e erros">
        <DashboardAccuracySection
          questionRows={questionAccuracy}
          themeRows={themeAccuracy}
        />
      </section>

      <section aria-label="Alunos recentes">
        <RecentStudentsTable students={recentStudents} />
      </section>
    </div>
  );
}
