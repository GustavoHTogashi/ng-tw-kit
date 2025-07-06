import { computed, Directive, effect, ElementRef, inject, input, signal } from '@angular/core';
import { ButtonElementRef } from '@ngtw-kit/common/types';
import { NGTW_TABS_STATE } from './_state';

@Directive({
  host: {
    '(focus)': 'state().focusedTab.set(value())',
    '(mouseup)': 'changeSelectedTab()',
    '[attr.aria-controls]': 'tabPanelId()',
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
  element = inject<ButtonElementRef>(ElementRef).nativeElement;
  protected readonly state = inject(NGTW_TABS_STATE);

  disabled = input(false, { alias: 'ngtwTabDisabled' });
  value = input('', { alias: 'ngtwTab' });

  readonly id = computed(() => `tab-${this.value()}`);
  readonly tabPanelId = computed(() => `tabpanel-${this.value()}`);
  readonly isSelected = computed(() => this.state().selectedTab() === this.value());

  protected readonly hostClass = signal(
    'relative cursor-pointer rounded-none bg-transparent p-2 text-start text-zinc-600 outline-transparent transition-[background-color,_outline,_opacity] select-none hover:bg-zinc-800 focus:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-purple-500 disabled:pointer-events-none disabled:opacity-25 aria-selected:text-zinc-300',
  );

  constructor() {
    effect(() => this._updateStateTabs());
  }

  private _updateStateTabs() {
    this.state().tabs.update((previousTabs) => Array.from(new Set([...previousTabs, this.value()])));
  }

  changeSelectedTab() {
    if (this.disabled()) return;
    this.state().selectedTab.set(this.value());
    this.state().indicatorSize.set(`${this.element.offsetWidth}px`);
    this.state().indicatorTranslate.set(`${this.element.offsetLeft}px`);
  }
}
