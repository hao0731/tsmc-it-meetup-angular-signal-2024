import { Component, inject, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CreateTodoModalComponent } from '../create-todo-modal';
import { filter, switchMap } from 'rxjs';
import { TodoApiService } from '../services';
import { Todo } from '../interfaces';

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
