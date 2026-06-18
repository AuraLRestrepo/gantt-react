import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Card UI wrapper
interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn("rounded-xl border border-border bg-(--color-surface) shadow-sm", className)}
    >
      {children}
    </div>
  );
}
