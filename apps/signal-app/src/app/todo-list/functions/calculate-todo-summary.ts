import { Todo, TodoSummary } from "../interfaces";

export const calculateTodoSummary = (todos: Array<Todo>, completedTodoIds: Array<string>): TodoSummary => {
  const initialSummary: TodoSummary = {
    completeTodoIds: [],
    unCompleteTodoIds: [],
  };

  return todos.reduce((summary, todo) => {
    const isCompleted = completedTodoIds.includes(todo.id);
    if (isCompleted) {
      summary.completeTodoIds.push(todo.id);
    } else {
      summary.unCompleteTodoIds.push(todo.id);
    }
    return summary;
  }, initialSummary);
};
