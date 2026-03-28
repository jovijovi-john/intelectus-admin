import { cn } from "@/shared/shadcn/lib/utils";

import type { CalendarItem } from "@/features/calendar/types/calendar.types";

const typeStyles: Record<CalendarItem["type"], string> = {
  simulado: "bg-violet-100 text-violet-800",
  questao: "bg-emerald-100 text-emerald-800",
};

interface CalendarTagProps {
  item: CalendarItem;
}

export function CalendarTag({ item }: CalendarTagProps) {
  return (
    <span
      className={cn(
        "block truncate rounded px-1.5 py-0.5 text-[10px] font-medium",
        typeStyles[item.type],
      )}
      title={item.label}
    >
      {item.label}
    </span>
  );
}
