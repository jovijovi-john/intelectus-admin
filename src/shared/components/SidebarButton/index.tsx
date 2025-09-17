import { Link } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import type { ComponentPropsWithoutRef, ComponentType, SVGProps } from "react";

type SidebarButtonProps = {
  title: string;
  className?: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
} & ComponentPropsWithoutRef<typeof Link>;

export default function SidebarButton({
  Icon,
  title,
  to,
  className,
  ...linkProps
}: SidebarButtonProps) {
  return (
    <Link
      to={to}
      className={`flex pl-4 pr-4 [&.active]:font-bold border-l-4 border-transparent [&.active]:border-secondary group ${className}`}
      {...linkProps}
    >
      <div className="flex items-center gap-x-4 py-4 px-8 rounded-lg group-[.active]:bg-secondary group-[.active]:text-white h-full w-full ml-8">
        <Icon className="shrink-0 w-6 h-6" />
        <span className="shrink-0">{title}</span>
      </div>
    </Link>
  );
}
