import { httpClient } from "@/shared/api/http-client";

import type {
  CalendarMonthApiParams,
  CalendarMonthApiResponse,
} from "@/features/calendar/calendar.api.types";

/** Real API: GET /api/calendar/{year}/{month} */
export async function listCalendarMonthHttp({
  year,
  month,
}: CalendarMonthApiParams): Promise<CalendarMonthApiResponse> {
  return httpClient.get<CalendarMonthApiResponse>(`/api/calendar/${year}/${month}`);
}
