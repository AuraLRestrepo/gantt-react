import { cn } from "@/lib/cn";

interface AvatarProps {
  initials: string;
  color: string;
  size?: "sm" | "md";
  title?: string;
}

export function Avatar({ initials, color, size = "md", title }: AvatarProps) {
  return (
    <div
      title={title}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-semibold text-white",
        size === "sm" ? "h-6 w-6 text-[10px]" : "h-8 w-8 text-xs"
      )}
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}
