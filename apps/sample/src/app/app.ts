import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';
import { isString } from '@ngtw-kit/common/type-guards';
import { NgtwButton } from '@ngtw-kit/directives/button';
import { NgtwSeparator } from '@ngtw-kit/directives/separator';
import { fromEvent } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { removeAppNamePrefix } from './utils/string';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-row flex-1 h-screen w-screen bg-zinc-950 font-sans',
  },
  imports: [
    NgtwButton,
    NgtwSeparator,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NgIcon,
  ],
  providers: [provideIcons({ lucideSearch })],
  selector: 'sample-app',
  template: `
    <aside
      class="flex flex-col items-stretch justify-between gap-3 border-r-2 border-zinc-800 bg-zinc-900 p-2"
    >
      <nav class="scrollbar-track-zinc-900 flex flex-1 flex-col gap-3">
        <a
          routerLink="/"
          class="flex items-center self-center p-2 text-sm leading-none whitespace-nowrap text-transparent transition-[background-color,_box-shadow,_color,_opacity] outline-none hover:opacity-75 focus-visible:ring-2 focus-visible:ring-purple-500"
        >
          <img class="w-8" src="/images/logo.png" alt="logo" />
        </a>
        <div ngtwSeparator></div>
        <button
          (mouseup)="handleSearch()"
          ngtwButton
          type="button"
          class="flex flex-row items-center justify-center gap-3 text-xs text-zinc-500"
        >
          <p class="font-sans">Search</p>
          <ng-icon name="lucideSearch" size="16" />
        </button>
        <div ngtwSeparator></div>
        <div class="flex h-0 shrink-0 grow flex-col gap-2 overflow-auto p-1">
          @for (sidemenuItem of sidemenuItems; track sidemenuItem.path) {
            <a
              [routerLink]="sidemenuItem.path"
              class="gap-2 rounded p-2 text-sm leading-none text-zinc-300 transition-[background-color,_box-shadow,_color,_opacity] outline-none hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-purple-500"
              routerLinkActive="bg-gradient-to-r from-sky-500 via-violet-500 to-rose-500 bg-clip-text !text-transparent"
            >
              {{ sidemenuItem.title }}
            </a>
          }
        </div>
      </nav>
      <div ngtwSeparator></div>
      <p class="text-center font-mono text-xs text-zinc-300">
        v{{ libVersion }}
      </p>
    </aside>
    <main class="scrollbar-track-zinc-950 flex flex-3 flex-col overflow-auto">
      <router-outlet />
    </main>
  `,
})
export class App {
  private _router = inject(Router);
  protected libVersion = '0.0.0';
  protected document = inject(DOCUMENT);

  protected sidemenuItems = this._router.config
    .filter(({ path }) => path && !['home', '**', 'test'].includes(path))
    .map((route) => ({
      ...route,
      title: isString(route.title) ? removeAppNamePrefix(route.title) : '',
    }));

  private _searchEvent$ = fromEvent<KeyboardEvent>(
    this.document,
    'keydown',
  ).pipe(
    takeUntilDestroyed(),
    filter((event) => event.key === 'k' && (event.metaKey || event.ctrlKey)),
    tap(() => this.handleSearch()),
  );

  protected handleSearch() {
    console.log('Search event triggered');
  }

  constructor() {
    this._searchEvent$.subscribe();
  }
}
