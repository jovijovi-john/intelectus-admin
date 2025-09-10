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
    <Link
      to={url}
      className={`flex px-8 [&.active]:font-bold border-l-4 border-transparent [&.active]:border-secondary group ${className}`}
    >
      <div className="flex py-4 px-8 rounded-lg group-[.active]:bg-secondary group-[.active]:text-white h-full w-full ml-8">
        {title}
      </div>
    </Link>
  );
}
