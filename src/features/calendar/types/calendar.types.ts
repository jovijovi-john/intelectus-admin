export type CalendarItemType = "simulado" | "questao";

export interface CalendarItem {
  id: string;
  type: CalendarItemType;
  label: string;
}

export type CalendarItemsByDate = Record<string, CalendarItem[]>;

export interface CalendarViewProps {
  month: Date;
  itemsByDate: CalendarItemsByDate;
  onMonthChange?: (month: Date) => void;
  onDayClick?: (date: Date) => void;
}
