import { ChangeDetectionStrategy, Component, DOCUMENT, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { simpleAngular } from '@ng-icons/simple-icons';
import { isActivationEnd, isNavigationEnd, isString } from '@ngtw-kit/utils/type-guards';
import { fromEvent } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { appName, stripAppName } from './app.routes';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-row flex-1 h-screen w-screen bg-zinc-950 font-sans',
  },
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  providers: [provideIcons({ simpleAngular })],
  selector: 'sample-app',
  template: `
    <aside class="flex flex-col items-stretch justify-between border-r-2 border-zinc-800 bg-zinc-900 p-3">
      <nav class="flex flex-1 flex-col gap-3">
        <a
          routerLink="/"
          class="flex items-center self-center p-2 text-sm leading-none whitespace-nowrap text-transparent transition-[background-color,_box-shadow,_color,_opacity] outline-none hover:opacity-75 focus-visible:ring-2 focus-visible:ring-purple-500"
        >
          <img class="w-8" src="/images/logo.png" alt="logo" />
        </a>
        <div class="h-0.5 w-full rounded-full bg-zinc-800"></div>
        @for (sidemenuItem of sidemenuItems; track sidemenuItem.path) {
          <a
            [routerLink]="sidemenuItem.path"
            class="gap-2 rounded p-2 text-sm leading-none text-zinc-300 transition-[background-color,_box-shadow,_color,_opacity] outline-none hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-purple-500"
            routerLinkActive="bg-gradient-to-r from-sky-500 via-violet-500 to-rose-500 bg-clip-text !text-transparent"
          >
            {{ sidemenuItem.title }}
          </a>
        }
      </nav>

      <p class="text-center font-mono text-xs text-zinc-300">v{{ libVersion }}</p>
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
    .filter(({ path }) => {
      return path && path !== 'home' && path !== '**' && path !== 'test';
    })
    .map((route) => {
      if (isString(route.title)) {
        return { ...route, title: stripAppName(route.title) };
      }
      return { ...route, title: appName };
    });

  private _navigationEnd$ = this._router.events.pipe(takeUntilDestroyed(), filter(isNavigationEnd));

  private _activationEnd$ = this._router.events.pipe(takeUntilDestroyed(), filter(isActivationEnd));

  private _searchEvent$ = fromEvent<KeyboardEvent>(this.document, 'keydown').pipe(
    takeUntilDestroyed(),
    filter((event) => event.key === 'k' && (event.metaKey || event.ctrlKey)),
    tap(() => this.handleSearch()),
  );

  protected handleSearch() {
    console.log('Search event triggered');
  }

  constructor() {
    this._activationEnd$.subscribe();
    this._navigationEnd$.subscribe();
    this._searchEvent$.subscribe();
  }
}
