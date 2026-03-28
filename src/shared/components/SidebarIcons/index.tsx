import { SidebarProfileNav } from "@/features/profile/components/sidebar-profile-nav";
import SidebarButton from "../SidebarButton";
import {
  CalendarDays,
  ChartNoAxesCombined,
  Contact,
  FileText,
  Layers,
  Library,
  ListCheck,
  Tags,
  User,
} from "lucide-react";

export default function SidebarIcons() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-y-4 w-full overflow-y-auto overflow-x-hidden">
      <SidebarButton
        Icon={ChartNoAxesCombined}
        to="/dashboard"
        title="Dashboard"
      />
      <SidebarButton Icon={FileText} to="/questions" title="Questões" />
      <SidebarButton Icon={ListCheck} to="/quizzes" title="Simulados" />
      <SidebarButton Icon={CalendarDays} to="/calendar" title="Calendário" />
      <SidebarButton
        Icon={Library}
        to="/question-bank"
        title="Banco de questões"
      />
      <SidebarButton Icon={Tags} to="/themes" title="Temas" />
      <SidebarButton Icon={Layers} to="/subthemes" title="Subtemas" />
      <SidebarButton Icon={Contact} to="/categorys" title="Categorias" />
      <SidebarButton Icon={User} to="/users" title="Usuários" />

      <SidebarProfileNav />
    </div>
  );
}
