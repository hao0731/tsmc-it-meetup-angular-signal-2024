import { Component, DestroyRef, OnInit, ViewChild, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';
import { TodoSummary } from '@tsmc-it/todo/domain';

import { CreateTodoActionComponent } from './create-todo-action';
import { FilterCompletedToggleComponent } from './filter-completed-toggle';
import { TodoSummaryComponent } from './todo-summary';
import { TodoListComponent } from './todo-list';


@Component({
  standalone: true,
  imports: [
    RouterModule,
    AsyncPipe,
    CreateTodoActionComponent,
    FilterCompletedToggleComponent,
    TodoSummaryComponent,
    TodoListComponent
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  @ViewChild(TodoListComponent) todoList!: TodoListComponent;

  private readonly destroyRef = inject(DestroyRef);

  filterCompleted = false;
  todoSummary$ = new BehaviorSubject<TodoSummary>({ completeTodoIds: [], unCompleteTodoIds: [] });

  ngOnInit(): void {
    this.registerTodoSummaryChangeListener();
  }

  protected onTodoCreated() {
    this.todoList.refresh();
  }

  protected onTodoSummaryChange(todoSummary: TodoSummary) {
    this.todoSummary$.next(todoSummary);
  }

  private registerTodoSummaryChangeListener() {
    this.todoSummary$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (todoSummary) => {
        console.log('[todoSummaryLogger]', todoSummary);
      },
    });
  }
}
