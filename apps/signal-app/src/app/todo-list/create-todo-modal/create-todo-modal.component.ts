import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-create-todo-modal',
  standalone: true,
  templateUrl: './create-todo-modal.component.html',
  imports: [
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class CreateTodoModalComponent {
  protected title = '';

  private readonly dialogRef = inject<MatDialogRef<CreateTodoModalComponent>>(MatDialogRef);

  protected onCancelClick() {
    this.dialogRef.close();
  }
}
