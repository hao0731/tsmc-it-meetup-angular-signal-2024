import { Component, computed, effect, signal } from '@angular/core';
import { isEqual } from 'lodash-es';

@Component({
  selector: 'app-equal-semantics',
  standalone: true,
  template: `
    <p>Equal Semantics</p>
    <button (click)="onAddClick()">Add</button>
    <button (click)="onUpdateUserClick()">Update User</button>
  `
})
export class EqualSemanticsComponent {
  private readonly counter = signal(2);
  private readonly isEven = computed(() => this.counter() % 2 === 0);

  private readonly user = signal({ name: 'HAO' }, { equal: isEqual });
  // private readonly user = signal({ name: 'HAO' });

  private readonly equalSemanticsEvenLogger = effect(() => {
    console.log('[EqualSemanticsComponent][equalSemanticsEvenLogger]', this.isEven() ? 'even' : 'old');
  });

  private readonly equalSemanticsUserLogger = effect(() => {
    console.log('[EqualSemanticsComponent][equalSemanticsUserLogger]', this.user().name);
  });

  protected onAddClick() {
    this.counter.update((previous) => previous + 2);
  }

  protected onUpdateUserClick() {
    this.user.set({ name: 'HAO' });
  }
}
