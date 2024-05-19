import { Todo } from "./todo.interface";

export interface GetTodosResponse {
  todos: Array<Todo>;
}

export interface CreateTodoRequest {
  title: string;
}

export interface CreateTodoResponse {
  todo: Todo;
}

export interface UpdateTodoRequest {
  title?: string;
  completed?: boolean;
}

export interface UpdateTodoResponse {
  todo: Todo;
}
