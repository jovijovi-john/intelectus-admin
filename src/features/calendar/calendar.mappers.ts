import { toDateKey } from "@/features/calendar/utils/date-key";

import type { CalendarMonthApiResponse } from "@/features/calendar/calendar.api.types";
import type { CalendarItemsByDate } from "@/features/calendar/types/calendar.types";

function getDateKeyFromApiDate(apiDate: string) {
  const dateOnly = apiDate.split("T")[0];
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateOnly)) {
    return dateOnly;
  }
  return toDateKey(new Date(apiDate));
}

export function mapCalendarMonthResponseToItemsByDate(
  response: CalendarMonthApiResponse,
): CalendarItemsByDate {
  return response.items.reduce<CalendarItemsByDate>((acc, item) => {
    const key = getDateKeyFromApiDate(item.date);
    const current = acc[key] ?? [];

    acc[key] = [
      ...current,
      {
        id: item.id,
        type: item.type,
        label: item.label,
      },
    ];

    return acc;
  }, {});
}
