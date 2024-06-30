import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-dynamic-deps-track',
  standalone: true,
  template: `
    <p>Dynamic Dependency Tracking</p>
    <button (click)="onControlSwitch()">Switch</button>
    <button (click)="onText1ChangeClick()">Change Text1</button>
    <button (click)="onText2ChangeClick()">Change Text2</button>
    <p>{{ message() }}</p>
  `,
})
export class DynamicDepsTrackComponent {
  private readonly control = signal(false);
  private readonly text1 = signal('Hello World');
  private readonly text2 = signal('Meow');

  protected readonly message = computed(() => {
    // NOTE: computed 應為 pure function，此處 console.log 只是為了展示 dynamic dependency tracking 的效果
    console.log('[DynamicDepsTrackComponent][message]', 'computed');
    return this.control() ? this.text1() : this.text2();
  });

  protected onControlSwitch() {
    this.control.update((current) => !current);
  }

  protected onText1ChangeClick() {
    this.text1.set(`text1 - ${Math.random()}`);
  }

  protected onText2ChangeClick() {
    this.text2.set(`text2 - ${Math.random()}`);
  }
}
