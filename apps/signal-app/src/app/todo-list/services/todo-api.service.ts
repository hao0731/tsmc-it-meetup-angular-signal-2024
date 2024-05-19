import { Injectable } from '@angular/core';
import { defer, delay, map, of, throwError } from 'rxjs';
import { Todo } from '@tsmc-it/todo/domain';
import { CreateTodoRequest, CreateTodoResponse, GetTodosResponse, UpdateTodoResponse } from '@tsmc-it/todo/api';

@Injectable({ providedIn: 'root' })
export class TodoApiService {
  private todos: Array<Todo> = [
    {
      id: crypto.randomUUID(),
      title: 'Test',
      completed: false,
    }
  ];

  getTodos() {
    const mockApi$ = defer(() => {
      const response: GetTodosResponse = {
        todos: [...this.todos],
      };
      return of(response).pipe(delay(500));
    });

    return mockApi$.pipe(map(({ todos }) => todos));
  }

  createTodo(payload: CreateTodoRequest) {
    const mockApi$ = defer(() => {
      const todo: Todo = {
        id: crypto.randomUUID(),
        title: payload.title,
        completed: false,
      };
      const response: CreateTodoResponse = { todo };
      this.todos = [...this.todos, todo];
      return of(response).pipe(delay(500));
    });

    return mockApi$.pipe(map(({ todo }) => todo));
  }

  completeTodo(id: string, completed = true) {
    const mockApi$ = defer(() => {
      const shallowTodos = [...this.todos];
      const todoIndex = shallowTodos.findIndex((todo) => todo.id === id);

      if (todoIndex === -1) {
        return throwError(() => new Error('This todo is not found.'));
      }

      const todo: Todo = {
        ...shallowTodos[todoIndex],
        completed,
      };
      shallowTodos.splice(todoIndex, 1, todo);
      this.todos = shallowTodos;

      const response: UpdateTodoResponse = {
        todo,
      };

      return of(response).pipe(delay(500));
    });

    return mockApi$.pipe(map(({ todo }) => todo));
  }
}
