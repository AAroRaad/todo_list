import React from "react";

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface TaskListProps {
  title: string;
  date: Date;
}

export interface AllTasksProps {
  date: Date;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
}

export interface Task extends CreateTaskRequest {
  _id?: string;
  is_completed?: boolean;
}

export interface CreateTaskResponse {
  message: string;
  data: Task;
}

export interface TaskState {
  tasks: Task[];
  selectedTask: TaskDetails | null;
  fetchTasksLoading: boolean;
  showTaskLoading: boolean;
  error: string | null;
}

export const initialState: TaskState = {
  tasks: [],
  selectedTask: null,
  fetchTasksLoading: false,
  showTaskLoading: false,
  error: null,
};

export interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string, isCompleted: boolean) => void;
  onDelete: (id: string) => Promise<void>;
  onShow: (id: string) => Promise<void>;
}

export interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
  date: Date;
}

export interface TaskDetailsModalProps {
  open: boolean;
  onClose: () => void;
  task: TaskDetails | null;
  isLoading: boolean;
  error: string | null;
}

export interface TaskDetails {
  _id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  is_completed: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
