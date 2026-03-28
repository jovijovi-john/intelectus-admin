import { cn } from "@/shared/shadcn/lib/utils";

import type { QuestionBloomTag } from "./question.types";

export const BLOOM_LABEL: Record<QuestionBloomTag, string> = {
  remember: "Lembrar",
  understand: "Entender",
  apply: "Aplicar",
  analyze: "Analisar",
  evaluate: "Avaliar",
  create: "Criar",
};

const BLOOM_CLASS: Record<QuestionBloomTag, string> = {
  remember: "border border-slate-200 bg-slate-100 text-slate-800",
  understand: "border border-blue-200 bg-blue-100 text-blue-900",
  apply: "border border-emerald-200 bg-emerald-100 text-emerald-900",
  analyze: "border border-amber-200 bg-amber-100 text-amber-950",
  evaluate: "border border-violet-200 bg-violet-100 text-violet-900",
  create: "border border-rose-200 bg-rose-100 text-rose-900",
};

export function QuestionBloomBadge({ tag }: { tag: QuestionBloomTag }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
        BLOOM_CLASS[tag]
      )}
    >
      {BLOOM_LABEL[tag]}
    </span>
  );
}
