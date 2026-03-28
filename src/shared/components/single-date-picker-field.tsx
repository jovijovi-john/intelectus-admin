import { endOfDay, format, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useMemo, useState } from "react";
import type { Matcher } from "react-day-picker";

import { Button } from "@/shared/shadcn/components/ui/button";
import { Calendar } from "@/shared/shadcn/components/ui/calendar";
import { Label } from "@/shared/shadcn/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/shadcn/components/ui/popover";
import { cn } from "@/shared/shadcn/lib/utils";

export type SingleDatePickerFieldProps = {
  id: string;
  label: string;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  /** Primeiro dia permitido (inclusive). */
  minDate?: Date;
  /** Último dia permitido (inclusive). */
  maxDate?: Date;
  /** Navegação do calendário — primeiro mês disponível nos dropdowns. */
  startMonth?: Date;
  /** Navegação do calendário — último mês disponível nos dropdowns. */
  endMonth?: Date;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  placeholder?: string;
};

const DISPLAY_FORMAT = "dd/MM/yyyy";

export function SingleDatePickerField({
  id,
  label,
  value,
  onChange,
  minDate,
  maxDate,
  startMonth,
  endMonth,
  disabled = false,
  className,
  triggerClassName,
  placeholder = "Selecione",
}: SingleDatePickerFieldProps) {
  const [open, setOpen] = useState(false);

  const disabledMatchers = useMemo((): Matcher | Matcher[] | undefined => {
    const parts: Matcher[] = [];
    if (minDate) {
      parts.push({ before: startOfDay(minDate) });
    }
    if (maxDate) {
      parts.push({ after: endOfDay(maxDate) });
    }
    if (parts.length === 0) return undefined;
    return parts;
  }, [minDate, maxDate]);

  const summary = value
    ? format(value, DISPLAY_FORMAT, { locale: ptBR })
    : placeholder;

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            type="button"
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full min-w-[200px] justify-start gap-2 font-normal tabular-nums",
              !value && "text-muted-foreground",
              triggerClassName
            )}
            aria-expanded={open}
            aria-haspopup="dialog"
          >
            <CalendarIcon className="size-4 shrink-0 opacity-70" aria-hidden />
            <span>{summary}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            numberOfMonths={1}
            startMonth={startMonth}
            endMonth={endMonth}
            defaultMonth={value ?? minDate ?? maxDate ?? new Date()}
            selected={value}
            onSelect={(d) => {
              onChange(d);
              setOpen(false);
            }}
            disabled={disabledMatchers}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
