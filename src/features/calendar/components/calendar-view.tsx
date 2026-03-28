import { ShadcnMonthCalendarAdapter } from "@/features/calendar/adapters/shadcn-month-calendar.adapter";

import type { CalendarViewProps } from "@/features/calendar/types/calendar.types";

export function CalendarView(props: CalendarViewProps) {
  return <ShadcnMonthCalendarAdapter {...props} />;
}
