import type { CalendarItemsByDate } from "@/features/calendar/types/calendar.types";
import { toDateKey } from "@/features/calendar/utils/date-key";

function createCurrentMonthDate(day: number) {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), day);
}

export const calendarMockItemsByDate: CalendarItemsByDate = {
  [toDateKey(createCurrentMonthDate(3))]: [
    { id: "sim-1", type: "simulado", label: "Simulado ENEM" },
  ],
  [toDateKey(createCurrentMonthDate(7))]: [
    { id: "q-1", type: "questao", label: "20 questões de matemática" },
    { id: "q-2", type: "questao", label: "Revisão de português" },
  ],
  [toDateKey(createCurrentMonthDate(12))]: [
    { id: "sim-2", type: "simulado", label: "Simulado Fuvest" },
    { id: "q-3", type: "questao", label: "Lista de física" },
    { id: "q-4", type: "questao", label: "Questões de química" },
  ],
  [toDateKey(createCurrentMonthDate(19))]: [
    { id: "sim-3", type: "simulado", label: "Simulado Unicamp" },
  ],
};
