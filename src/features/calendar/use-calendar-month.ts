import { useQuery } from "@tanstack/react-query";

import { calendarKeys } from "@/features/calendar/calendar.keys";
import { mapCalendarMonthResponseToItemsByDate } from "@/features/calendar/calendar.mappers";
import { listCalendarMonth } from "@/features/calendar/calendar.repository";

interface UseCalendarMonthParams {
  year: number;
  month: number;
}

export function useCalendarMonth({ year, month }: UseCalendarMonthParams) {
  return useQuery({
    queryKey: calendarKeys.month(year, month),
    queryFn: () => listCalendarMonth({ year, month }),
    select: mapCalendarMonthResponseToItemsByDate,
  });
}
