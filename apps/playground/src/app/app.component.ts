import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GlitchFreeComponent } from './glitch-free';
import { DynamicDepsTrackComponent } from './dynamic-deps-track';
import { EqualSemanticsComponent } from './equal-semantics';

@Component({
  standalone: true,
  imports: [
    GlitchFreeComponent,
    DynamicDepsTrackComponent,
    EqualSemanticsComponent,
    RouterModule
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'playground';
}
