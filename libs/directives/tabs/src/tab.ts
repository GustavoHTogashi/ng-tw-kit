import {
  computed,
  Directive,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { ButtonElementRef } from '@ngtw-kit/common/types';
import { consumeTabsState } from './_state';

@Directive({
  host: {
    '(focus)': 'state.focusedTab.set(this)',
    '(mouseup)': 'state.selectedTab.set(this);',
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
  protected readonly state = consumeTabsState();

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
    this.state.tabs.update((tabs) => [...tabs, this]);
  }

  focus() {
    this.element.focus();
  }
}
