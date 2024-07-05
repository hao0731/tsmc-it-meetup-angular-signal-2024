import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-glitch-free',
  standalone: true,
  template: `
    <p>Glitch Free Demo</p>
    <button (click)="onAddClick()">Add</button>
  `,
})
export class GlitchFreeComponent {
  private readonly counter = signal(0);
  private readonly isEven = computed(() => {
    // NOTE: computed 應為 pure function，此處 console.log 只是為了展示 memoized 的效果
    console.log('[GlitchFreeComponent][isEven]', 'computed');
    return this.counter() % 2 === 0;
  });
  private readonly isOdd = computed(() => {
    // NOTE: computed 應為 pure function，此處 console.log 只是為了展示 memoized 的效果
    console.log('[GlitchFreeComponent][isOdd]', 'computed');
    return !this.isEven();
  });
  private readonly sqrtCount = computed(() => {
    // NOTE: computed 應為 pure function，此處 console.log 只是為了展示 lazily evaluated 的效果
    console.log('[GlitchFreeComponent][sqrtCount]', 'computed');
    return Math.sqrt(this.counter());
  });

  private readonly glitchFreeLogger = effect(() => {
    console.log('[GlitchFreeComponent][glitchFreeLogger]', this.counter(), this.isEven(), this.isOdd());
  });

  protected onAddClick() {
    this.counter.update((current) => current + 1);
  }
}
