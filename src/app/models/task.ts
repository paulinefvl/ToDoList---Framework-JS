export interface Task {
  id: string;        // uuid
  title: string;     // min 3
  description?: string;
  dueDate?: string;  // ISO YYYY-MM-DD
  done: boolean;     // default false
  createdAt: string;
  updatedAt: string;
}
