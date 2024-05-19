import { Component, effect, signal, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateTodoActionComponent, FilterCompletedToggleComponent, TodoListComponent, TodoSummary, TodoSummaryComponent } from './todo-list';

@Component({
  standalone: true,
  imports: [
    TodoSummaryComponent,
    CreateTodoActionComponent,
    FilterCompletedToggleComponent,
    TodoListComponent,
    RouterModule
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  todoList = viewChild.required(TodoListComponent);
  filterCompleted = signal(false);
  todoSummary = signal<TodoSummary>({ completeTodoIds: [], unCompleteTodoIds: [] });

  private readonly todoSummaryLogger = effect(() => {
    console.log('[todoSummarylogger]', this.todoSummary());
  });

  protected onTodoSummaryChange(todoSummary: TodoSummary) {
    this.todoSummary.set(todoSummary);
  }

  protected onTodoCreated() {
    const todoListComponent = this.todoList();
    todoListComponent.refresh();
  }
}
