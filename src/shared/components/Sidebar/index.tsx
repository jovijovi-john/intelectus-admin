import { Link } from "@tanstack/react-router";
import SidebarButton from "../SidebarButton";

export default function Sidebar() {
  return (
    <aside className="bg-red-500 w-[240px] flex flex-col h-full">
      <SidebarButton url="/dashboard" title="Dashboard" />
      <SidebarButton url="/sign-in" title="Sign-in" />
      <SidebarButton url="/sign-up" title="Sign-up" />
      <SidebarButton url="/questions" title="Questions" />
      <SidebarButton url="/quizzes" title="Quizzes" />
      <SidebarButton url="/users" title="Users" />
      <SidebarButton url="/settings" title="Settings" className="mt-auto" />
    </aside>
  );
}
