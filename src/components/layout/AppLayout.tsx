import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { useIsMobile } from "@/hooks/useIsMobile";

export function AppLayout() {
  const isMobile = useIsMobile();
  const [manuallyCollapsed, setManuallyCollapsed] = useState(false);

  // Colapsado si el usuario lo decidió manualmente, O si estamos en mobile.
  const collapsed = manuallyCollapsed || isMobile;

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={collapsed} onToggle={() => setManuallyCollapsed((prev) => !prev)} />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
