import { Component, inject, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { filter, switchMap } from 'rxjs';
import { Todo } from '@tsmc-it/todo/domain';

import { CreateTodoModalComponent } from '../create-todo-modal';
import { TodoApiService } from '../services';


@Component({
  selector: 'app-create-todo-action',
  standalone: true,
  templateUrl: './create-todo-action.component.html',
  imports: [MatButtonModule, MatIconModule],
})
export class CreateTodoActionComponent {
  createdTodo = output<Todo>();

  private readonly dialog = inject(MatDialog);
  private readonly todoApi = inject(TodoApiService);

  protected onCreateClick() {
    this.dialog.open(CreateTodoModalComponent)
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        switchMap((title) => this.todoApi.createTodo({ title }))
      )
      .subscribe({
        next: (todo) => {
          this.createdTodo.emit(todo);
        },
      });
  }
}
