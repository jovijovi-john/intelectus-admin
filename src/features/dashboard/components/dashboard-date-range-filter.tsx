import {
  endOfMonth,
  format,
  max,
  startOfMonth,
  subDays,
  subMonths,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { DateRange as DayPickerRange } from "react-day-picker";

import { Button } from "@/shared/shadcn/components/ui/button";
import { Calendar } from "@/shared/shadcn/components/ui/calendar";
import { Label } from "@/shared/shadcn/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/shadcn/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/shadcn/components/ui/select";
import { cn } from "@/shared/shadcn/lib/utils";

import type { DashboardDateRange } from "../types";

type PresetId =
  | "year2026"
  | "q1_2026"
  | "last30"
  | "last7"
  | "month_now"
  | "custom";

type PresetIdNoCustom = Exclude<PresetId, "custom">;

type DashboardDateRangeFilterProps = {
  value: DashboardDateRange;
  onChange: (range: DashboardDateRange) => void;
  className?: string;
};

function rangeFromPreset(id: PresetIdNoCustom, now: Date): DashboardDateRange {
  switch (id) {
    case "year2026":
      return { from: new Date(2026, 0, 1), to: new Date(2026, 11, 31) };
    case "q1_2026":
      return {
        from: new Date(2026, 0, 1),
        to: endOfMonth(new Date(2026, 2, 1)),
      };
    case "last7":
      return { from: subDays(now, 6), to: now };
    case "last30":
      return { from: subDays(now, 29), to: now };
    case "month_now":
      return { from: startOfMonth(now), to: endOfMonth(now) };
    default:
      return { from: new Date(2026, 0, 1), to: new Date(2026, 11, 31) };
  }
}

function detectPreset(range: DashboardDateRange): PresetId {
  const y = range.from.getFullYear();
  if (
    y === 2026 &&
    range.from.getMonth() === 0 &&
    range.from.getDate() === 1 &&
    range.to.getFullYear() === 2026 &&
    range.to.getMonth() === 11 &&
    range.to.getDate() === 31
  ) {
    return "year2026";
  }
  return "custom";
}

const RANGE_LABEL = "Período dos dados do dashboard";

/** Limites do calendário (ano/mês/dia via dropdowns do DayPicker). */
const CALENDAR_START_MONTH = new Date(2018, 0, 1);
const CALENDAR_END_MONTH = new Date(2040, 11, 1);

const NUMBER_OF_MONTHS = 2;

/** Com `numberOfMonths` = 2, o último mês que pode ser o primeiro visível sem estourar `endMonth`. */
function maxFirstVisibleMonth(endMonthNav: Date): Date {
  return subMonths(startOfMonth(endMonthNav), NUMBER_OF_MONTHS - 1);
}

/**
 * Menor primeiro mês visível permitido quando já existe data inicial do intervalo:
 * o par [M, M+1] deve ter M+1 >= mês de `from` (o segundo painel não fica antes do início).
 */
function minFirstVisibleMonth(rangeFrom: Date): Date {
  return max([
    CALENDAR_START_MONTH,
    subMonths(startOfMonth(rangeFrom), 1),
  ]);
}

export function DashboardDateRangeFilter({
  value,
  onChange,
  className,
}: DashboardDateRangeFilterProps) {
  const [preset, setPreset] = useState<PresetId>(() => detectPreset(value));
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarRange, setCalendarRange] = useState<DayPickerRange | undefined>(
    { from: value.from, to: value.to }
  );

  /** Mês inicial do primeiro painel (controlado) — alinhado ao intervalo e aos limites de navegação. */
  const [calendarMonth, setCalendarMonth] = useState(() =>
    startOfMonth(value.from)
  );

  /** Com popover fechado, espelha o intervalo aplicado; com aberto, mantém o rascunho. */
  useEffect(() => {
    if (calendarOpen) return;
    setCalendarRange({ from: value.from, to: value.to });
    setCalendarMonth(startOfMonth(value.from));
  }, [value.from, value.to, calendarOpen]);

  const navigationStartMonth = useMemo(() => {
    if (!calendarRange?.from) return CALENDAR_START_MONTH;
    return minFirstVisibleMonth(calendarRange.from);
  }, [calendarRange?.from]);

  const navigationEndMonth = CALENDAR_END_MONTH;

  const maxFirstMonth = useMemo(
    () => maxFirstVisibleMonth(CALENDAR_END_MONTH),
    []
  );

  useEffect(() => {
    setCalendarMonth((prev) => {
      let next = startOfMonth(prev);
      if (next < navigationStartMonth) next = navigationStartMonth;
      if (next > maxFirstMonth) next = maxFirstMonth;
      return next;
    });
  }, [navigationStartMonth, maxFirstMonth]);

  const handleCalendarMonthChange = useCallback(
    (m: Date) => {
      let next = startOfMonth(m);
      if (next < navigationStartMonth) next = navigationStartMonth;
      if (next > maxFirstMonth) next = maxFirstMonth;
      setCalendarMonth(next);
    },
    [navigationStartMonth, maxFirstMonth]
  );

  const now = new Date();

  const applyPreset = (id: PresetId) => {
    if (id === "custom") {
      setPreset("custom");
      setCalendarRange({ from: value.from, to: value.to });
      setCalendarMonth(startOfMonth(value.from));
      setCalendarOpen(true);
      return;
    }
    setCalendarOpen(false);
    setPreset(id);
    const next = rangeFromPreset(id, now);
    onChange(next);
    setCalendarRange({ from: next.from, to: next.to });
  };

  const handleCalendarSelect = (r: DayPickerRange | undefined) => {
    setCalendarRange(r);
  };

  const applyCustomRange = () => {
    if (!calendarRange?.from || !calendarRange?.to) return;
    onChange({ from: calendarRange.from, to: calendarRange.to });
    setPreset("custom");
    setCalendarOpen(false);
  };

  const summary = `${format(value.from, "dd/MM/yyyy", { locale: ptBR })} – ${format(value.to, "dd/MM/yyyy", { locale: ptBR })}`;

  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end",
        className
      )}
    >
      <div className="space-y-2">
        <Label htmlFor="dashboard-range-preset">{RANGE_LABEL}</Label>
        <Select
          value={preset}
          onValueChange={(v) => applyPreset(v as PresetId)}
        >
          <SelectTrigger
            id="dashboard-range-preset"
            size="default"
            className="min-w-[240px]"
            aria-label={RANGE_LABEL}
          >
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="year2026">Ano 2026 (completo)</SelectItem>
            <SelectItem value="q1_2026">1º trimestre 2026</SelectItem>
            <SelectItem value="last7">Últimos 7 dias</SelectItem>
            <SelectItem value="last30">Últimos 30 dias</SelectItem>
            <SelectItem value="month_now">Mês atual</SelectItem>
            <SelectItem value="custom">Intervalo personalizado…</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {preset === "custom" ? (
        <Popover
          open={calendarOpen}
          onOpenChange={(open) => {
            setCalendarOpen(open);
            if (open) {
              setCalendarRange({ from: value.from, to: value.to });
              setCalendarMonth(startOfMonth(value.from));
            }
          }}
        >
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="justify-start gap-2 font-normal sm:min-w-[260px]"
              aria-label="Abrir calendário para escolher intervalo de datas"
              aria-expanded={calendarOpen}
            >
              <CalendarIcon className="size-4 opacity-70" aria-hidden />
              <span className="tabular-nums">{summary}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="flex flex-col">
              <Calendar
                mode="range"
                captionLayout="dropdown"
                startMonth={navigationStartMonth}
                endMonth={navigationEndMonth}
                month={calendarMonth}
                onMonthChange={handleCalendarMonthChange}
                selected={calendarRange}
                onSelect={handleCalendarSelect}
                numberOfMonths={NUMBER_OF_MONTHS}
                locale={ptBR}
              />
              <div className="flex justify-end gap-2 border-t border-border p-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setCalendarOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  size="sm"
                  disabled={!calendarRange?.from || !calendarRange?.to}
                  onClick={applyCustomRange}
                >
                  Atualizar
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <div
          className="flex min-h-10 items-center rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs sm:min-w-[260px]"
          aria-label={`Período aplicado: ${summary}`}
        >
          <span className="tabular-nums text-muted-foreground">{summary}</span>
        </div>
      )}
    </div>
  );
}
