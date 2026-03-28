import { CalendarTag } from "@/features/calendar/components/calendar-tag";
import { cn } from "@/shared/shadcn/lib/utils";

import type { CalendarItem } from "@/features/calendar/types/calendar.types";

interface MonthDayCellProps {
  dayNumber: number;
  items: CalendarItem[];
  isOutsideMonth?: boolean;
  isToday?: boolean;
}

export function MonthDayCell({
  dayNumber,
  items,
  isOutsideMonth = false,
  isToday = false,
}: MonthDayCellProps) {
  const visibleItems = items.slice(0, 2);
  const hiddenCount = Math.max(items.length - visibleItems.length, 0);

  return (
    <div
      className={cn(
        "relative flex h-full min-h-24 flex-col gap-1 p-1 transition-colors group-hover:bg-emerald-50/80",
        isOutsideMonth
          ? "bg-emerald-50 bg-[repeating-linear-gradient(150deg,rgba(16,185,129,0.18)_0px,rgba(16,185,129,0.18)_1px,transparent_1px,transparent_18px)]"
          : "bg-white",
        isToday && "bg-emerald-100/80 ring-1 ring-inset ring-emerald-300",
      )}
    >
      <span
        className={cn(
          "absolute top-1 right-1 rounded px-1 text-xs font-semibold",
          isOutsideMonth ? "text-emerald-400" : "text-emerald-900",
          isToday && "bg-emerald-600 text-white",
        )}
      >
        {dayNumber}
      </span>

      <div className="mt-5 space-y-1">
        {visibleItems.map((item) => (
          <CalendarTag key={item.id} item={item} />
        ))}

        {hiddenCount > 0 && (
          <span className="block px-1 text-[10px] font-medium text-emerald-700">
            +{hiddenCount} item(ns)
          </span>
        )}
      </div>
    </div>
  );
}
