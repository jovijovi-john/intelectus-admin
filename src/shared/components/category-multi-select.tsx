import { useId, useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { Badge } from "@/shared/shadcn/components/ui/badge";
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

export type CategoryMultiSelectProps = {
  label: string;
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
  disabled?: boolean;
  /** Texto do botão quando nada está selecionado. */
  selectPlaceholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
};

export function CategoryMultiSelect({
  label,
  options,
  selected,
  onChange,
  disabled,
  selectPlaceholder = "Selecionar categorias…",
  searchPlaceholder = "Buscar categoria…",
  emptyText = "Nenhuma categoria encontrada.",
}: CategoryMultiSelectProps) {
  const autoId = useId();
  const listId = `cat-multi-${autoId}`;
  const [popoverOpen, setPopoverOpen] = useState(false);

  function toggle(category: string) {
    if (selected.includes(category)) {
      onChange(selected.filter((c) => c !== category));
    } else {
      onChange([...selected, category]);
    }
  }

  function remove(category: string) {
    onChange(selected.filter((c) => c !== category));
  }

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={listId}>{label}</Label>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            id={listId}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={popoverOpen}
            disabled={disabled}
            className="h-9 w-full justify-between font-normal"
          >
            <span className="truncate">
              {selected.length === 0
                ? selectPlaceholder
                : `${selected.length} selecionada(s)`}
            </span>
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {options.map((cat) => (
                  <CommandItem
                    key={cat}
                    value={cat}
                    keywords={[cat]}
                    onSelect={() => toggle(cat)}
                  >
                    <Check
                      className={cn(
                        "mr-2 size-4 shrink-0",
                        selected.includes(cat) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {cat}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {selected.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {selected.map((cat) => (
            <Badge
              key={cat}
              variant="secondary"
              className="gap-1 pr-1 font-normal"
            >
              <span className="max-w-[12rem] truncate">{cat}</span>
              <button
                type="button"
                className="rounded-sm p-0.5 hover:bg-zinc-300/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => remove(cat)}
                aria-label={`Remover ${cat}`}
              >
                <X className="size-3.5" />
              </button>
            </Badge>
          ))}
        </div>
      ) : null}
    </div>
  );
}
