import { DayButton, DayPicker, type DayButtonProps } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { MonthDayCell } from "@/features/calendar/components/month-day-cell";
import { toDateKey } from "@/features/calendar/utils/date-key";
import { cn } from "@/shared/shadcn/lib/utils";

import type { CalendarViewProps } from "@/features/calendar/types/calendar.types";

function createDayButton(
  itemsByDate: CalendarViewProps["itemsByDate"],
  onDayClick?: (date: Date) => void,
) {
  function DayButtonWithTags(props: DayButtonProps) {
    const dateKey = toDateKey(props.day.date);
    const items = itemsByDate[dateKey] ?? [];

    return (
      <DayButton
        {...props}
        className={cn(
          props.className,
          "group block h-full w-full cursor-pointer p-0 text-left align-top transition-colors hover:bg-emerald-50/70",
        )}
        onClick={(event) => {
          props.onClick?.(event);
          onDayClick?.(props.day.date);
        }}
      >
        <MonthDayCell
          dayNumber={props.day.date.getDate()}
          items={items}
          isOutsideMonth={props.day.outside}
          isToday={props.modifiers.today}
        />
      </DayButton>
    );
  }

  return DayButtonWithTags;
}

export function ShadcnMonthCalendarAdapter({
  month,
  itemsByDate,
  onMonthChange,
  onDayClick,
}: CalendarViewProps) {
  const monthLabel = new Intl.DateTimeFormat("pt-BR", { month: "long" })
    .format(month)
    .replace(/^\w/, (char) => char.toUpperCase());
  const selectedYear = month.getFullYear();
  const yearOptions = Array.from(
    { length: 21 },
    (_, index) => selectedYear - 10 + index,
  );

  const goToPreviousMonth = () => {
    onMonthChange?.(new Date(month.getFullYear(), month.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    onMonthChange?.(new Date(month.getFullYear(), month.getMonth() + 1, 1));
  };

  const goToYear = (year: number) => {
    onMonthChange?.(new Date(year, month.getMonth(), 1));
  };

  return (
    <div className="rounded-xl border border-emerald-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <span className="text-sm text-emerald-700">Hoje</span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Mês anterior"
            onClick={goToPreviousMonth}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-emerald-200 text-emerald-700 transition-colors hover:bg-emerald-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <strong className="min-w-48 text-center text-2xl font-semibold text-emerald-900">
            {monthLabel}
          </strong>

          <select
            value={selectedYear}
            aria-label="Selecionar ano"
            onChange={(event) => goToYear(Number(event.target.value))}
            className="h-9 rounded-md border border-emerald-200 bg-white px-2 text-sm font-medium text-emerald-800 outline-none transition-colors focus:ring-2 focus:ring-emerald-500/40"
          >
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <button
            type="button"
            aria-label="Próximo mês"
            onClick={goToNextMonth}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-emerald-200 text-emerald-700 transition-colors hover:bg-emerald-50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <span className="w-10" />
      </div>

      <DayPicker
        month={month}
        locale={ptBR}
        showOutsideDays
        hideNavigation
        onDayClick={(date) => onDayClick?.(date)}
        components={{
          DayButton: createDayButton(itemsByDate, onDayClick),
        }}
        className="w-full"
        classNames={{
          months: "w-full",
          month: "w-full space-y-0",
          caption: "hidden",
          month_caption: "hidden",
          caption_label: "hidden",
          month_grid: "w-full table-fixed border-collapse",
          weekdays: "border-b border-emerald-200 bg-emerald-100/60",
          weekday:
            "h-10 text-center text-xs font-semibold uppercase tracking-wide text-emerald-900",
          week: "border-b border-emerald-100",
          day: "h-28 border-r border-emerald-100 align-top last:border-r-0",
          day_button:
            "block h-full w-full cursor-pointer rounded-none border-0 p-0 text-left align-top focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-inset",
          outside: "bg-transparent",
          today: "bg-transparent",
          selected: "bg-transparent",
        }}
        formatters={{
          formatWeekdayName: (date) =>
            new Intl.DateTimeFormat("pt-BR", { weekday: "short" })
              .format(date)
              .replace(".", "")
              .slice(0, 3)
              .toUpperCase(),
        }}
      />
    </div>
  );
}
