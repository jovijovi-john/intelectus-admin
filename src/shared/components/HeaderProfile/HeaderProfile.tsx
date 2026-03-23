import { ChevronDown, User } from "lucide-react";

import { cn } from "@/shared/shadcn/lib/utils";

export type HeaderProfileProps = {
  username: string;
  role: string;
  avatarUrl: string | null;
  className?: string;
};

export function HeaderProfile({
  username,
  role,
  avatarUrl,
  className,
}: HeaderProfileProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex max-w-full items-center gap-3 rounded-md py-1 pl-1 pr-2 text-left outline-none transition-colors hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      aria-label={`Menu do usuário ${username}`}
    >
      <span className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt=""
            className="size-full object-cover"
          />
        ) : (
          <User className="size-5 text-muted-foreground" aria-hidden />
        )}
      </span>
      <span className="flex min-w-0 flex-col items-start">
        <span className="truncate font-semibold text-secondary">{username}</span>
        <span className="truncate text-sm text-muted-foreground">{role}</span>
      </span>
      <span
        className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-background"
        aria-hidden
      >
        <ChevronDown className="size-4 text-muted-foreground" />
      </span>
    </button>
  );
}
