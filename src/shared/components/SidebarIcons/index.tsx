import SidebarButton from "../SidebarButton";
import {
  CalendarDays,
  ChartNoAxesCombined,
  Contact,
  FileText,
  Library,
  ListCheck,
  Settings,
  Tags,
  User,
} from "lucide-react";

export default function SidebarIcons() {
  return (
    <div className="flex flex-col gap-y-4 h-full w-full">
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
      <SidebarButton Icon={Contact} to="/categorys" title="Categorias" />
      <SidebarButton Icon={User} to="/users" title="Usuários" />

      <SidebarButton
        Icon={Settings}
        to="/settings"
        title="Configurações"
        className="mt-auto"
      />
    </div>
  );
}
