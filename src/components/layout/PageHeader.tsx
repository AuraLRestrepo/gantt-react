import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-(--color-surface) px-8 py-5">
      <div>
        <h1 className="text-xl font-semibold text-(--color-ink)">{title}</h1>
        {subtitle && <p className="mt-0.5 text-sm text-(--color-ink-muted)">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}
