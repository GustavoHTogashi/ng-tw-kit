import {
  computed,
  Directive,
  input,
  linkedSignal
} from '@angular/core';
import { TabState } from './_state';
import { NgtwTabsOrientation } from './_type';

@Directive({
  host: {
    '[class]': 'hostClass()',
    'role': 'tabs',
  },
  providers: [TabState.provide()],
  exportAs: 'ngtwTabs',
  selector: '[ngtwTabs]',
})
export class NgtwTabs {
  orientation = input<NgtwTabsOrientation>('horizontal', {
    alias: 'ngtwTabsOrientation',
  });

  protected readonly state = TabState.create({
    orientation: linkedSignal(() => this.orientation()),
  });

  protected readonly hostClass = computed(() => {
    return {
      horizontal: 'flex flex-col gap-4 bg-transparent text-current',
      vertical: 'flex flex-row gap-4 bg-transparent text-current',
    }[this.state.orientation()];
  });
}
