import { endOfMonth, startOfMonth, subDays } from "date-fns";

import type { DashboardDateRange } from "../types";

export type PresetId =
  | "year2026"
  | "q1_2026"
  | "last30"
  | "last7"
  | "month_now"
  | "custom";

export type PresetIdNoCustom = Exclude<PresetId, "custom">;

export function rangeFromPreset(
  id: PresetIdNoCustom,
  now: Date
): DashboardDateRange {
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

export function detectPreset(range: DashboardDateRange): PresetId {
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
