export type TodoStatus = "todo" | "doing" | "done";

export interface TodoItem {
  id: string;
  title: string;
  status: TodoStatus;
}

export type TodoList = {
  [key in TodoStatus]?: TodoItem[];
};
