import type { ReactNode } from "react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  message: string;
  icon?: ReactNode;
}

export function EmptyState({ message, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-subtle text-ink-faint">
        {icon ?? <Inbox size={20} />}
      </div>
      <p className="text-sm text-ink-muted">{message}</p>
    </div>
  );
}
