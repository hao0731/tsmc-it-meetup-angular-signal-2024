export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface TodoSummary {
  completeTodoIds: Array<string>;
  unCompleteTodoIds: Array<string>;
}
