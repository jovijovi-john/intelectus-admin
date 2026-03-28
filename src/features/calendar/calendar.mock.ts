import type {
  CalendarMonthApiItem,
  CalendarMonthApiParams,
  CalendarMonthApiResponse,
} from "@/features/calendar/calendar.api.types";

const MOCK_DELAY_MS = 2000;

const MONTHLY_TEMPLATES: Omit<CalendarMonthApiItem, "date">[] = [
  { id: "sim-1", type: "simulado", label: "Simulado ENEM" },
  { id: "q-1", type: "questao", label: "20 questões de matemática" },
  { id: "q-2", type: "questao", label: "Revisão de português" },
  { id: "sim-2", type: "simulado", label: "Simulado Fuvest" },
  { id: "q-3", type: "questao", label: "Lista de física" },
  { id: "q-4", type: "questao", label: "Questões de química" },
  { id: "sim-3", type: "simulado", label: "Simulado Unicamp" },
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
