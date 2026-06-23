import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  GanttChartSquare,
  FolderKanban,
  Users,
  BarChart3,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/cn";

interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/gantt", label: "Gantt", icon: GanttChartSquare },
  { to: "/projects", label: "Proyectos", icon: FolderKanban },
  { to: "/resources", label: "Recursos", icon: Users },
  { to: "/reports", label: "Reportes", icon: BarChart3 },
  { to: "/settings", label: "Configuración", icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-screen shrink-0 flex-col bg-(--color-sidebar) transition-all duration-200",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Header / Brand */}
      <div
        className={cn(
          "flex h-16 shrink-0 items-center border-b border-sidebar-border px-4",
          collapsed ? "justify-center" : "gap-2.5"
        )}
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand text-sm font-bold text-white">
          G
        </div>
        {!collapsed && <span className="text-sm font-semibold text-white">GanttPro</span>}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                title={collapsed ? label : undefined}
                aria-label={label}
                className={({ isActive }) =>
                  cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    collapsed ? "justify-center" : "gap-3",
                    isActive
                      ? "bg-sidebar-active text-white"
                      : "text-sidebar-text hover:bg-sidebar-hover hover:text-white"
                  )
                }
              >
                <Icon size={18} className="shrink-0" />
                {!collapsed && <span>{label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Botón de colapso */}
      <div className="border-t border-sidebar-border p-3">
        <button
          onClick={onToggle}
          aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
          className={cn(
            "flex w-full items-center rounded-lg px-3 py-2 text-sm text-sidebar-text transition-colors hover:bg-sidebar-hover hover:text-white",
            collapsed ? "justify-center" : "gap-2"
          )}
        >
          {collapsed ? (
            <PanelLeftOpen size={18} className="shrink-0" />
          ) : (
            <>
              <PanelLeftClose size={18} className="shrink-0" />
              <span>Colapsar</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
