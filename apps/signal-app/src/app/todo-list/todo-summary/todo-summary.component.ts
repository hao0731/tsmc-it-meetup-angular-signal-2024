import { Component, input } from '@angular/core';
import { TodoSummary } from '../interfaces';

@Component({
  selector: 'app-todo-summary',
  standalone: true,
  templateUrl: './todo-summary.component.html',
  imports: [],
})
export class TodoSummaryComponent {
  todoSummary = input.required<TodoSummary>();
}
