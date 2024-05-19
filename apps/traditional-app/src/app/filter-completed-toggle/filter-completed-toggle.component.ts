import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-filter-completed-toggle',
  standalone: true,
  templateUrl: './filter-completed-toggle.component.html',
  imports: [MatSlideToggleModule, FormsModule],
})
export class FilterCompletedToggleComponent {
  @Input({ required: true }) filterCompleted!: boolean;
  @Output() filterCompletedChange = new EventEmitter<boolean>();

  protected onToggle(isToggled: boolean) {
    this.filterCompletedChange.emit(isToggled);
  }
}
