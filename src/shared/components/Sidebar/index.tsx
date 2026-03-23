import SidebarIcons from "../SidebarIcons";

export default function Sidebar() {
  return (
    <aside className="flex h-full min-h-0 w-full max-w-[300px] shrink-0 flex-col overflow-hidden border-r border-border pb-8 pt-8">
      <SidebarIcons />
    </aside>
  );
}
