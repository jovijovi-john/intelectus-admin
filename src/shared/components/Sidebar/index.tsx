import SidebarIcons from "../SidebarIcons";

export default function Sidebar() {
  return (
    <aside className="flex flex-col h-full w-full max-w-[300px] pb-8">
      <h1 className="text-secondary py-8 font-semibold text-2xl text-center w-full border-b-2 mb-8 border-b-prim">
        Intelectus
      </h1>
      <SidebarIcons />
    </aside>
  );
}
