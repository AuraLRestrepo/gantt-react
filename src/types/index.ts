export type TaskStatus = "pending" | "in-progress" | "completed" | "blocked";

export type TaskPriority = "low" | "medium" | "high";

export type ViewScale = "day" | "week" | "month";

export type DragMode = "move" | "resize-start" | "resize-end";

export interface Member {
  id: string;
  name: string;
  initials: string;
  role: string;
  avatarColor: string;
  email: string;
}

export interface Task {
  id: string;
  code: string;
  projectId: string;
  name: string;
  assignedId: string;
  description?: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: TaskStatus;
  priority: TaskPriority;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "archived";
  startDate: string;
  endDate: string;
  ownerId: string;
  memberIds: string[];
  color: string;
}

export interface DragInfo {
  mode: DragMode;
  deltaDays: number;
}
