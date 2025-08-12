import {
  computed,
  Directive,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { ButtonElementRef } from '@ngtw-kit/common/types';
import { TabState } from './_state';

@Directive({
  host: {
    '(focus)': 'state.focusedTab.set(this)',
    '(click)': 'state.selectedTab.set(this);',
    '[attr.aria-controls]': 'tabpanelId()',
    '[attr.aria-selected]': 'isSelected()',
    '[attr.disabled]': 'disabled() ? "" : null',
    '[attr.id]': 'id()',
    '[attr.tabindex]': 'isSelected() ? 0 : -1',
    '[class]': 'hostClass()',
    'role': 'tab',
    'type': 'button',
  },
  exportAs: 'ngtwTab',
  selector: 'button[ngtwTab]',
})
export class NgtwTab {
  readonly element = inject<ButtonElementRef>(ElementRef).nativeElement;
  protected readonly state = TabState.consume();

  disabled = input(false, { alias: 'ngtwTabDisabled' });
  value = input('', { alias: 'ngtwTab' });

  protected readonly id = computed(() => `tab-${this.value()}`);
  protected readonly tabpanelId = computed(() => `tabpanel-${this.value()}`);
  protected readonly isSelected = computed(
    () => this.state.selectedTab()?.value() === this.value(),
  );

  protected readonly hostClass = signal(
    'relative cursor-pointer rounded-none bg-transparent p-2 text-start text-zinc-600 outline-transparent transition-[background-color,_outline,_opacity] select-none hover:bg-zinc-800 focus:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-purple-500 disabled:pointer-events-none disabled:opacity-25 aria-selected:text-zinc-300',
  );

  constructor() {
    TabState.create(() => {
      const tabs = [...this.state.tabs(), this];
      const enabledTabs = tabs.filter(({ disabled }) => !disabled());
      return {
        tabs: computed(() => tabs),
        enabledTabs: computed(() => enabledTabs),
        firstTab: computed(() => enabledTabs[0]),
        lastTab: computed(() => enabledTabs[enabledTabs.length - 1]),
        focusedTabIndex: computed(() => {
          const focusedTab = this.state.focusedTab();
          if (!focusedTab) return -1;
          return tabs.findIndex((tab) => tab === focusedTab);
        }),
      };
    });
  }

  focus() {
    this.element.focus();
  }
}
