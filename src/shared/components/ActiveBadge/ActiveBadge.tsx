import { cn } from "@/shared/shadcn/lib/utils";

export function ActiveBadge({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
        active
          ? "border border-emerald-200 bg-emerald-100 text-emerald-900"
          : "border border-zinc-200 bg-zinc-100 text-zinc-600"
      )}
    >
      {active ? "Ativo" : "Inativo"}
    </span>
  );
}
