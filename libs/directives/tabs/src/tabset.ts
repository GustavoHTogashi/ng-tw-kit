import { computed, Directive, input, signal } from '@angular/core';
import { createTabsetState, provideTabsetState } from './_state';
import { NgtwTabsetOrientation } from './_type';

@Directive({
  host: {
    '[class]': 'hostClass()',
    'role': 'tabset',
  },
  providers: [
    provideTabsetState({
      focusedTab: signal(''),
      indicatorSize: signal('0px'),
      indicatorTranslate: signal('0px'),
      orientation: signal('horizontal'),
      selectedTab: signal(''),
      tabs: signal([]),
    }),
  ],
  exportAs: 'ngtwTabset',
  selector: '[ngtwTabset]',
})
export class NgtwTabset {
  orientation = input<NgtwTabsetOrientation>('horizontal', {
    alias: 'ngtwTabsetOrientation',
  });

  protected readonly state = createTabsetState({
    orientation: this.orientation,
    selectedTab: signal(''),
  });

  protected readonly hostClass = computed(() => {
    return {
      horizontal: 'flex flex-col gap-4 bg-transparent text-current',
      vertical: 'flex flex-row gap-4 bg-transparent text-current',
    }[this.state().orientation()];
  });
}
