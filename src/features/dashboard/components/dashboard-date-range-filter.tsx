import { format, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";

import { SingleDatePickerField } from "@/shared/components/single-date-picker-field";
import { Button } from "@/shared/shadcn/components/ui/button";
import { Label } from "@/shared/shadcn/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/shadcn/components/ui/select";
import { cn } from "@/shared/shadcn/lib/utils";

import {
  detectPreset,
  type PresetId,
  rangeFromPreset,
} from "../data/dashboard-date-range-presets";
import type { DashboardDateRange } from "../types";

type DashboardDateRangeFilterProps = {
  value: DashboardDateRange;
  onChange: (range: DashboardDateRange) => void;
  className?: string;
};

const RANGE_LABEL = "Período dos dados do dashboard";

const CALENDAR_START_MONTH = new Date(2018, 0, 1);
const CALENDAR_END_MONTH = new Date(2040, 11, 1);

export function DashboardDateRangeFilter({
  value,
  onChange,
  className,
}: DashboardDateRangeFilterProps) {
  const [preset, setPreset] = useState<PresetId>(() => detectPreset(value));
  const [draftFrom, setDraftFrom] = useState<Date | undefined>(
    () => value.from
  );
  const [draftTo, setDraftTo] = useState<Date | undefined>(() => value.to);

  const now = new Date();

  const applyPreset = (id: PresetId) => {
    if (id === "custom") {
      setPreset("custom");
      setDraftFrom(value.from);
      setDraftTo(value.to);
      return;
    }
    setPreset(id);
    const next = rangeFromPreset(id, now);
    onChange(next);
  };

  const applyCustomRange = () => {
    if (!draftFrom || !draftTo) return;
    let from = startOfDay(draftFrom);
    let to = startOfDay(draftTo);
    if (from > to) {
      const t = from;
      from = to;
      to = t;
    }
    onChange({ from, to });
    setDraftFrom(from);
    setDraftTo(to);
  };

  const summary = `${format(value.from, "dd/MM/yyyy", { locale: ptBR })} – ${format(value.to, "dd/MM/yyyy", { locale: ptBR })}`;

  return (
    <div
      className={cn(
        "flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end",
        className
      )}
    >
      <div className="min-w-0 shrink-0 space-y-2 sm:max-w-[min(100%,280px)]">
        <Label htmlFor="dashboard-range-preset">{RANGE_LABEL}</Label>
        <Select
          value={preset}
          onValueChange={(v) => applyPreset(v as PresetId)}
        >
          <SelectTrigger
            id="dashboard-range-preset"
            size="default"
            className="w-full min-w-[200px] sm:w-[min(100%,260px)]"
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
        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
          <SingleDatePickerField
            id="dashboard-range-from"
            label="Data de início"
            value={draftFrom}
            onChange={setDraftFrom}
            maxDate={draftTo}
            startMonth={CALENDAR_START_MONTH}
            endMonth={CALENDAR_END_MONTH}
            className="min-w-0 flex-1 sm:max-w-[220px]"
          />
          <SingleDatePickerField
            id="dashboard-range-to"
            label="Data de fim"
            value={draftTo}
            onChange={setDraftTo}
            minDate={draftFrom}
            startMonth={CALENDAR_START_MONTH}
            endMonth={CALENDAR_END_MONTH}
            className="min-w-0 flex-1 sm:max-w-[220px]"
          />
          <div className="flex w-full shrink-0 pb-0.5 sm:w-auto sm:items-end">
            <Button
              type="button"
              size="default"
              className="w-full sm:w-auto"
              disabled={!draftFrom || !draftTo}
              onClick={applyCustomRange}
              aria-label="Aplicar período personalizado ao dashboard"
            >
              Atualizar
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="flex min-h-10 min-w-0 flex-1 items-center rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs sm:min-w-[220px] sm:max-w-md"
          aria-label={`Período aplicado: ${summary}`}
        >
          <span className="tabular-nums text-muted-foreground">{summary}</span>
        </div>
      )}
    </div>
  );
}
