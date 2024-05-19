import { Todo } from '@tsmc-it/todo/domain';

export interface GetTodosResponse {
  todos: Array<Todo>;
}

export interface CreateTodoResponse {
  todo: Todo;
}

export interface UpdateTodoResponse {
  todo: Todo;
}
