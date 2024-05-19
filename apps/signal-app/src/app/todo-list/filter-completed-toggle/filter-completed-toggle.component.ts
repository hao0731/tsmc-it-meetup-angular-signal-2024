import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-filter-completed-toggle',
  standalone: true,
  templateUrl: './filter-completed-toggle.component.html',
  imports: [MatSlideToggleModule, FormsModule],
})
export class FilterCompletedToggleComponent {
  filterCompleted = model.required<boolean>();
}
