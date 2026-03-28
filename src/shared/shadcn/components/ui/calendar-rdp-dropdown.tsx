import * as SelectPrimitive from "@radix-ui/react-select";
import * as React from "react";
import { Dropdown, UI } from "react-day-picker";
import type { ComponentProps } from "react";

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/shadcn/components/ui/select";
import { cn } from "@/shared/shadcn/lib/utils";

export type RdpShadcnDropdownProps = ComponentProps<typeof Dropdown>;

/**
 * Substitui o &lt;select&gt; nativo do react-day-picker por Radix Select (shadcn),
 * permitindo lista estilizada (padding, paleta, foco) dentro do popover do calendário.
 */
export function RdpShadcnDropdown({
  options,
  className,
  classNames,
  components: _components,
  value,
  onChange,
  disabled,
  "aria-label": ariaLabel,
  style,
  name,
  id,
  required,
  form,
}: RdpShadcnDropdownProps) {
  const strValue =
    value !== undefined && value !== null ? String(value) : undefined;

  /** `className` vem de `rdp-months_dropdown` ou `rdp-years_dropdown` — larguras mínimas distintas. */
  const isYearDropdown = (className ?? "").includes("years_dropdown");
  const rootMinWidth = isYearDropdown ? "min-w-[5rem]" : "min-w-[10rem]";

  const handleValueChange = (next: string) => {
    const synthetic = {
      target: { value: next },
      currentTarget: { value: next },
    } as React.ChangeEvent<HTMLSelectElement>;
    onChange?.(synthetic);
  };

  return (
    <span
      className={cn(
        "rdp-dropdown_root inline-flex shrink-0 border-0 bg-transparent p-0 shadow-none",
        rootMinWidth,
        classNames[UI.DropdownRoot],
        "!border-0 !bg-transparent !p-0 !shadow-none"
      )}
      data-disabled={disabled || undefined}
      style={style}
    >
      <Select
        value={strValue}
        onValueChange={handleValueChange}
        disabled={disabled}
        name={name}
        required={required}
        form={form}
      >
        <SelectTrigger
          id={id}
          aria-label={ariaLabel}
          data-rdp-shadcn-dropdown=""
          className={cn(
            "rdp-dropdown-trigger",
            "!h-auto min-h-10 w-full justify-between gap-2 py-2.5 pr-2 pl-3",
            rootMinWidth,
            "border border-input bg-background text-sm font-medium text-foreground shadow-xs",
            "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
            "[&_[data-slot=select-value]]:line-clamp-none [&_[data-slot=select-value]]:overflow-visible",
            "whitespace-nowrap",
            className
          )}
        >
          <SelectValue placeholder="—" />
        </SelectTrigger>
        <CalendarSelectContent>
          {options?.map((opt) => (
            <SelectItem
              key={opt.value}
              value={String(opt.value)}
              disabled={opt.disabled}
              className="cursor-pointer py-2.5 pr-8 pl-3 text-sm data-[highlighted]:bg-accent/80"
            >
              {opt.label}
            </SelectItem>
          ))}
        </CalendarSelectContent>
      </Select>
    </span>
  );
}

/** Conteúdo do select com viewport rolável (lista longa de anos) e z-index acima do popover do calendário. */
function CalendarSelectContent({
  children,
  className,
  position = "popper",
  align = "start",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content-calendar"
        className={cn(
          "bg-popover text-popover-foreground z-[100] max-h-[min(280px,var(--radix-select-content-available-height))] min-w-[var(--radix-select-trigger-width)] origin-[var(--radix-select-content-transform-origin)] overflow-hidden rounded-md border shadow-md",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        align={align}
        sideOffset={4}
        {...props}
      >
        <SelectPrimitive.Viewport className="max-h-60 w-full scroll-py-1 p-1">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}
