import { cn } from "@/shared/shadcn/lib/utils";

import type { UserPlan } from "./user.types";

export const PLAN_LABEL: Record<UserPlan, string> = {
  free: "Grátis",
  pro: "Pro",
};

const PLAN_CLASS: Record<UserPlan, string> = {
  free:
    "border border-plan-free-border bg-plan-free-bg text-plan-free-fg shadow-sm",
  pro:
    "border border-transparent bg-gradient-to-r from-plan-premium-from to-plan-premium-to text-plan-premium-fg shadow-sm ring-1 ring-white/20",
};

export function UserPlanBadge({ plan }: { plan: UserPlan }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-tight",
        PLAN_CLASS[plan]
      )}
    >
      {PLAN_LABEL[plan]}
    </span>
  );
}
