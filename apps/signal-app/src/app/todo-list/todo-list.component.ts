import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal, } from '@angular/core';
import { toSignal, outputFromObservable, toObservable } from '@angular/core/rxjs-interop';
import { MatListModule } from '@angular/material/list';
import { Subject, startWith, switchMap } from 'rxjs';
import { isEqual } from 'lodash-es';
import { calculateTodoSummary } from '@tsmc-it/todo/domain';

import { TodoApiService } from './services';
import { FormsModule } from '@angular/forms';
import { DisplayOptionPipe } from './pipes';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  templateUrl: './todo-list.component.html',
  imports: [MatListModule, FormsModule, DisplayOptionPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  filterCompleted = input<boolean>(false);

  private readonly todoApi = inject(TodoApiService);

  protected readonly selectedTodoIds = signal<Array<string>>([], { equal: isEqual });

  private readonly refresh$ = new Subject<void>();
  private readonly todos$ = this.refresh$.pipe(
    startWith(undefined),
    switchMap(() => this.todoApi.getTodos())
  );
  protected readonly todos = toSignal(this.todos$, { initialValue: [] });
  private readonly todoSummary = computed(() => calculateTodoSummary(this.todos(), this.selectedTodoIds()));
  todoSummaryChange = outputFromObservable(
    toObservable(this.todoSummary)
  );

  private readonly todosLogger = effect(() => {
    console.log('[todosLogger]', this.todos());
  });

  private readonly selectedTodoIdsLogger = effect(() => {
    console.log('[selectedTodoIdsLogger]', this.selectedTodoIds());
  });

  refresh() {
    this.refresh$.next();
  }

  protected onSelectionChange(id: string, completed: boolean) {
    this.todoApi.completeTodo(id, completed).subscribe();
  }
}
