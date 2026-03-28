import { useId, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/shared/shadcn/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/shadcn/components/ui/command";
import { Label } from "@/shared/shadcn/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/shadcn/components/ui/popover";
import { cn } from "@/shared/shadcn/lib/utils";

export type SearchableComboboxOption = {
  value: string;
  label: string;
};

export type SearchableComboboxProps = {
  id?: string;
  label: string;
  options: SearchableComboboxOption[];
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  emptyText?: string;
  anyLabel?: string;
  className?: string;
  disabled?: boolean;
};

export function SearchableCombobox({
  id,
  label,
  options,
  value,
  onChange,
  placeholder = "Selecionar…",
  emptyText = "Nenhum resultado.",
  anyLabel = "Qualquer",
  className,
  disabled,
}: SearchableComboboxProps) {
  const autoId = useId();
  const listId = id ?? `combo-${autoId}`;
  const [open, setOpen] = useState(false);

  const selected = options.find((o) => o.value === value);
  const labelText = value === null ? anyLabel : (selected?.label ?? placeholder);

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={listId}>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={listId}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className="h-9 w-full justify-between font-normal"
          >
            <span className="truncate">{labelText}</span>
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <Command>
            <CommandInput placeholder="Buscar…" />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  value="__any__"
                  keywords={[anyLabel, "qualquer", "todos"]}
                  onSelect={() => {
                    onChange(null);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4 shrink-0",
                      value === null ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {anyLabel}
                </CommandItem>
                {options.map((opt) => (
                  <CommandItem
                    key={opt.value}
                    value={opt.value}
                    keywords={[opt.label, opt.value]}
                    onSelect={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 size-4 shrink-0",
                        value === opt.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {opt.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
