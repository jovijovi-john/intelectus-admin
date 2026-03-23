import { cn } from "@/shared/shadcn/lib/utils";

import type { UserPlan } from "./user.types";

const PLAN_LABEL: Record<UserPlan, string> = {
  free: "Grátis",
  pro: "Pro",
};

const PLAN_CLASS: Record<UserPlan, string> = {
  free: "border border-border bg-muted text-muted-foreground",
  pro: "border border-primary/20 bg-primary/10 text-primary",
};

export function UserPlanBadge({ plan }: { plan: UserPlan }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
        PLAN_CLASS[plan]
      )}
    >
      {PLAN_LABEL[plan]}
    </span>
  );
}
