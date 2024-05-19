import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Subject, combineLatest, map, shareReplay, startWith, switchMap } from 'rxjs';
import { TodoApiService } from '@tsmc-it/todo/api';
import { TodoSummary, calculateTodoSummary } from '@tsmc-it/todo/domain';

import { DisplayOptionPipe } from './pipes';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  templateUrl: './todo-list.component.html',
  imports: [
    AsyncPipe,
    MatListModule,
    FormsModule,
    DisplayOptionPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {
  @Input() filterCompleted = false;
  @Output() todoSummaryChange = new EventEmitter<TodoSummary>();

  private readonly todoApi = inject(TodoApiService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly selectedTodoIds$ = new BehaviorSubject<Array<string>>([]);

  private readonly refresh$ = new Subject<void>();
  protected readonly todos$ = this.refresh$.pipe(
    startWith(undefined),
    switchMap(() => this.todoApi.getTodos()),
    shareReplay(1)
  );

  ngOnInit(): void {
    this.registerTodoSummaryChangeListener();
    this.registerTodosLogger();
    this.registerSelectedTodoIdsLogger();
  }

  refresh() {
    this.refresh$.next();
  }

  protected onSelectedTodoIdsChange(todoIds: Array<string>) {
    this.selectedTodoIds$.next(todoIds);
  }

  protected onSelectionChange(id: string, completed: boolean) {
    this.todoApi.completeTodo(id, completed).subscribe();
  }

  private registerTodoSummaryChangeListener() {
    combineLatest({ todos: this.todos$, selectedTodoIds: this.selectedTodoIds$ })
    .pipe(
      map(({ todos, selectedTodoIds }) => calculateTodoSummary(todos, selectedTodoIds)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (todoSummary) => {
        this.todoSummaryChange.emit(todoSummary);
      },
    });
  }

  private registerTodosLogger() {
    this.todos$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (todos) => {
        console.log('[todosLogger]', todos);
      },
    });
  }

  private registerSelectedTodoIdsLogger() {
    this.selectedTodoIds$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (selectedTodoIds) => {
        console.log('[selectedTodoIdsLogger]', selectedTodoIds);
      },
    });
  }
}
