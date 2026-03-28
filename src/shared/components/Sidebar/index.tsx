import { memo } from "react";
import { BrandLogo } from "../BrandLogo";
import SidebarIcons from "../SidebarIcons";

function Sidebar() {
  return (
    <aside className="fixed bg-white inset-y-0 left-0 z-40 flex h-dvh w-[min(100vw,300px)] shrink-0 flex-col overflow-hidden border-r border-border py-4">
      <header className="shrink-0 border-b border-border px-5 pb-8 pt-4 mb-8">
        <BrandLogo />
      </header>

      <SidebarIcons />
    </aside>
  );
}

export default memo(Sidebar);
