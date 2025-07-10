import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';
import { NgtwSeparator } from '@ngtw-kit/directives/separator';
import { Sidemenu } from './components';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-row flex-1 h-screen w-screen bg-zinc-950 font-sans',
  },
  imports: [NgtwSeparator, RouterOutlet, Sidemenu],
  providers: [provideIcons({ lucideSearch })],
  selector: 'sample-app',
  template: `
    <sample-sidemenu />
    <div ngtwSeparator ngtwSeparatorOrientation="vertical"></div>
    <main class="scrollbar-track-zinc-950 flex flex-3 flex-col overflow-auto">
      <router-outlet />
    </main>
  `,
})
export class App {}
