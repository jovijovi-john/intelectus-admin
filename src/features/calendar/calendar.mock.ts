import type {
  CalendarMonthApiItem,
  CalendarMonthApiParams,
  CalendarMonthApiResponse,
} from "@/features/calendar/calendar.api.types";

const MOCK_DELAY_MS = 2000;

const MONTHLY_TEMPLATES: Omit<CalendarMonthApiItem, "date">[] = [
  { id: "sim-1", type: "simulado", label: "Simulado SBA — bloco cardio e vasoativos" },
  { id: "q-1", type: "questao", label: "Lista: 20 questões — mecânica respiratória" },
  { id: "q-2", type: "questao", label: "Revisão: anestésicos inalatórios e CAM" },
  { id: "sim-2", type: "simulado", label: "Simulado integrado — SNC e monitorização" },
  { id: "q-3", type: "questao", label: "Lista: farmacologia de opioides e TIVA" },
  { id: "q-4", type: "questao", label: "Questões: anestésicos locais e bloqueios" },
  { id: "sim-3", type: "simulado", label: "Simulado TEA/TSA — farmacologia geral" },
];

const DAYS = [3, 7, 7, 12, 12, 12, 19];

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

function toIsoDate(year: number, month: number, day: number) {
  const monthPart = `${month}`.padStart(2, "0");
  const dayPart = `${day}`.padStart(2, "0");
  return `${year}-${monthPart}-${dayPart}T10:00:00.000Z`;
}

export async function listCalendarMonthMock({
  year,
  month,
}: CalendarMonthApiParams): Promise<CalendarMonthApiResponse> {
  await delay(MOCK_DELAY_MS);

  const items = MONTHLY_TEMPLATES.map((item, index) => ({
    ...item,
    date: toIsoDate(year, month, DAYS[index]),
  }));

  return {
    year,
    month,
    items,
  };
}
