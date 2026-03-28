import { isMockApi } from "@/shared/config/api-mode";

import type {
  CalendarMonthApiParams,
  CalendarMonthApiResponse,
} from "@/features/calendar/calendar.api.types";
import { listCalendarMonthHttp } from "@/features/calendar/calendar.http";
import { listCalendarMonthMock } from "@/features/calendar/calendar.mock";

export async function listCalendarMonth(
  params: CalendarMonthApiParams,
): Promise<CalendarMonthApiResponse> {
  if (isMockApi()) {
    return listCalendarMonthMock(params);
  }

  return listCalendarMonthHttp(params);
}
