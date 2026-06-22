import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

interface MetricCardProps {
  label: string;
  value: number;
  hint: string;
  icon: ReactNode;
  accent: string;
}

export function MetricCard({ label, value, hint, icon, accent }: MetricCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-(--color-ink-muted)">{label}</p>
          <p className="mt-2 text-3xl font-bold text-(--color-ink)">{value}</p>
        </div>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{
            backgroundColor: `${accent}1A`,
            color: accent,
          }}
        >
          {icon}
        </div>
      </div>
      <p className="mt-3 text-xs text-ink-faint">{hint}</p>
    </Card>
  );
}
