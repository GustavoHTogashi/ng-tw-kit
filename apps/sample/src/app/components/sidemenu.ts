import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DOCUMENT,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Route, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';
import { NGTW_NAVIGATOR } from '@ngtw-kit/common/tokens';
import { isString } from '@ngtw-kit/common/type-guards';
import { NgtwButton } from '@ngtw-kit/directives/button';
import { NgtwSeparator } from '@ngtw-kit/directives/separator';
import { filter, fromEvent, tap } from 'rxjs';
import { removeAppNamePrefix } from '../utils/string';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col items-stretch justify-between gap-3 p-4',
  },
  imports: [NgIcon, NgtwButton, NgtwSeparator, RouterLink, RouterLinkActive],
  providers: [provideIcons({ lucideSearch })],
  selector: 'sample-sidemenu',
  template: `
    <nav class="flex flex-col gap-2 p-0.5">
      <a
        class="flex items-center self-center p-2 text-sm leading-none whitespace-nowrap text-transparent transition-[background-color,_box-shadow,_color,_opacity] outline-none hover:opacity-75 focus-visible:ring-2 focus-visible:ring-purple-500"
        routerLink="/"
      >
        <img alt="logo" class="w-10" src="/images/logo.png" />
      </a>
      <button
        (mouseup)="handleSearch()"
        class="flex flex-row items-center justify-center gap-2 bg-zinc-900 text-xs text-zinc-600 transition-colors"
        ngtwButton
        type="button"
      >
        <ng-icon name="lucideSearch" size="14" />
        <p
          class="flex items-center rounded border-b border-zinc-500 bg-zinc-800 px-1.5 py-0.5 tracking-widest text-zinc-500"
        >
          @if (isMac()) {
            <span>⌘&nbsp;+&nbsp;</span>
          } @else {
            <span class="tracking-tighter">ctrl&nbsp;+&nbsp;</span>
          }
          <span>K</span>
        </p>
      </button>
    </nav>
    <div ngtwSeparator></div>
    <nav
      class="scrollbar-track-zinc-950 flex h-0 shrink-0 grow flex-col gap-2 overflow-auto p-0.5 text-zinc-300"
    >
      @for (groupedSidemenuItem of groupedSidemenuItems(); track $index) {
        <p class="text-lg font-semibold">
          {{ groupedSidemenuItem.group }}
        </p>
        @for (sidemenuItem of sidemenuItems(); track sidemenuItem.path) {
          <a
            [routerLink]="sidemenuItem.path"
            class="gap-2 rounded p-2 text-sm leading-none transition-[background-color,_box-shadow,_color,_opacity] outline-none hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-purple-500"
            routerLinkActive="bg-gradient-to-r from-sky-500 via-violet-500 to-rose-500 bg-clip-text !text-transparent"
          >
            {{ sidemenuItem.title }}
          </a>
        }
      }
    </nav>
    <div ngtwSeparator></div>
    <p class="text-center font-mono text-xs text-zinc-500 select-none">
      v{{ libVersion() }}
    </p>
  `,
})
export class Sidemenu {
  private readonly _document = inject(DOCUMENT);
  private readonly _navigator = inject(NGTW_NAVIGATOR);
  private readonly _router = inject(Router);

  private readonly _searchEvent = fromEvent<KeyboardEvent>(
    this._document,
    'keydown',
  ).pipe(
    takeUntilDestroyed(),
    filter((event) => event.key === 'k' && (event.metaKey || event.ctrlKey)),
    tap(() => this.handleSearch()),
  );

  protected readonly isMac = signal(/mac/i.test(this._navigator.userAgent));
  protected readonly libVersion = signal('0.0.0');
  protected readonly sidemenuItems = signal(
    this._router.config
      .filter(({ path }) => {
        return path && !['home', '**', 'test'].includes(path);
      })
      .map((route) => {
        return {
          ...route,
          title: isString(route.title) ? removeAppNamePrefix(route.title) : '',
        };
      }),
  );
  protected readonly groupedSidemenuItems = computed(() => {
    const groups = this.sidemenuItems().reduce(
      (result, sidemenuItem) => {
        const group = sidemenuItem?.data?.['tag'] ?? 'General';

        if (!result[group]) result[group] = [];

        result[group] = [...result[group], sidemenuItem];

        return result;
      },
      {} as Record<string, Route[]>,
    );

    return Object.entries(groups).map(([group, sidemenuItems]) => ({
      group,
      sidemenuItems: sidemenuItems.filter(({ title }) => title),
    }));
  });

  constructor() {
    this._searchEvent.subscribe();
  }

  protected handleSearch() {
    console.log('Search event triggered');
  }
}
