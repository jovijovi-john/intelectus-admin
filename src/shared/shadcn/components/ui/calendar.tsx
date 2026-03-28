import * as React from "react";
import { DayPicker, UI, type ClassNames } from "react-day-picker";

import { cn } from "@/shared/shadcn/lib/utils";

import { RdpShadcnDropdown } from "./calendar-rdp-dropdown";

import "react-day-picker/style.css";

/** Variáveis do react-day-picker alinhadas à paleta (--primary / --ring em index.css). */
const rdpThemeStyle = {
  "--rdp-accent-color": "var(--primary)",
  "--rdp-accent-background-color":
    "color-mix(in srgb, var(--primary) 12%, transparent)",
  "--rdp-today-color": "var(--primary)",
  "--rdp-dropdown-gap": "0.5rem",
  "--rdp-months-gap": "1.5rem",
} as React.CSSProperties;

function mergeClassNames(
  user: Partial<ClassNames> | undefined
): Partial<ClassNames> {
  return {
    ...user,
    [UI.Root]: cn(
      "rdp-root",
      "[[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
      user?.[UI.Root]
    ),
    [UI.Dropdowns]: cn(
      "rdp-dropdowns inline-flex flex-wrap items-center gap-2 sm:gap-3",
      user?.[UI.Dropdowns]
    ),
    [UI.DropdownRoot]: cn(
      "rdp-dropdown_root rounded-md border border-input bg-background shadow-xs",
      user?.[UI.DropdownRoot]
    ),
    [UI.CaptionLabel]: cn(
      "rdp-caption_label px-3 py-2 pr-8 text-sm font-medium text-foreground",
      user?.[UI.CaptionLabel]
    ),
    [UI.DayButton]: cn(
      "rdp-day_button rounded-full transition-[box-shadow,colors] duration-150",
      user?.[UI.DayButton]
    ),
    [UI.MonthCaption]: cn(
      "rdp-month_caption items-center",
      user?.[UI.MonthCaption]
    ),
    /** Espaço à esquerda do chevron &lt; (o pacote usa inset-inline-start: 0 colado na borda). */
    [UI.PreviousMonthButton]: cn(
      "rdp-button_previous inset-inline-start-2",
      user?.[UI.PreviousMonthButton]
    ),
  };
}

function Calendar({
  className,
  classNames: userClassNames,
  style,
  components: userComponents,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      className={cn(
        "group/calendar p-3 [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        className
      )}
      classNames={mergeClassNames(userClassNames)}
      components={{
        ...userComponents,
        Dropdown: userComponents?.Dropdown ?? RdpShadcnDropdown,
      }}
      style={{ ...rdpThemeStyle, ...style }}
      {...props}
    />
  );
}

export { Calendar };
