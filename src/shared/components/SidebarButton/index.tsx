import { Link } from "@tanstack/react-router";

type SidebarButtonProps = {
  title: string;
  url: string;
  className?: string;
};

export default function SidebarButton({
  title,
  url,
  className,
}: SidebarButtonProps) {
  return (
    <Link to={url} className={`[&.active]:font-bold ${className}`}>
      {title}
    </Link>
  );
}
