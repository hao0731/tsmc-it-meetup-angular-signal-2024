import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayOption',
  standalone: true
})
export class DisplayOptionPipe implements PipeTransform {
  transform(filterCompleted: boolean, todoId: string, hiddenIds: Array<string>) {
    const HIDDEN = 'none';
    const DISPLAY = 'flex';

    if (filterCompleted) {
      const hidden = hiddenIds.includes(todoId);
      return hidden ? HIDDEN : DISPLAY;
    }

    return DISPLAY;
  }
}
