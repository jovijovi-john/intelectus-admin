import type { CalendarItemType } from "@/features/calendar/types/calendar.types";

export interface CalendarMonthApiParams {
  year: number;
  month: number;
}

export interface CalendarMonthApiItem {
  id: string;
  date: string;
  type: CalendarItemType;
  label: string;
}

export interface CalendarMonthApiResponse {
  year: number;
  month: number;
  items: CalendarMonthApiItem[];
}
