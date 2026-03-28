import { Link } from "@tanstack/react-router";
import type { ComponentPropsWithoutRef, ComponentType, SVGProps } from "react";

type SidebarButtonProps = {
  title: string;
  className?: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Miniatura circular (ex.: foto do perfil); se ausente, usa `Icon`. */
  thumbnailUrl?: string | null;
} & ComponentPropsWithoutRef<typeof Link>;

export default function SidebarButton({
  Icon,
  title,
  to,
  className,
  thumbnailUrl,
  ...linkProps
}: SidebarButtonProps) {
  const showThumb = Boolean(thumbnailUrl?.trim());

  return (
    <Link
      to={to}
      className={`flex pl-4 pr-4 [&.active]:font-bold border-l-4 border-transparent [&.active]:border-secondary group ${className}`}
      {...linkProps}
    >
      <div className="flex items-center gap-x-4 py-4 px-8 rounded-lg group-[.active]:bg-secondary group-[.active]:text-white h-full w-full">
        {showThumb ? (
          <img
            src={thumbnailUrl!}
            alt=""
            className="size-9 shrink-0 rounded-full object-cover ring-1 ring-zinc-200 group-[.active]:ring-white/40"
          />
        ) : (
          <Icon className="h-6 w-6 shrink-0" />
        )}
        <span className="shrink-0">{title}</span>
      </div>
    </Link>
  );
}
