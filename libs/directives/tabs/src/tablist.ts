import { AfterViewInit, computed, Directive } from '@angular/core';
import { consumeTabsState } from './_state';
import { NgtwTabsOrientation } from './_type';

@Directive({
  host: {
    '(keydown.arrowdown)': 'focusNextTab($event, "vertical")',
    '(keydown.arrowleft)': 'focusPreviousTab($event)',
    '(keydown.arrowright)': 'focusNextTab($event)',
    '(keydown.arrowup)': 'focusPreviousTab($event, "vertical")',
    '(keydown.end)': 'focusLastTab($event)',
    '(keydown.enter)': 'selectTab($event)',
    '(keydown.home)': 'focusFirstTab($event)',
    '(keydown.space)': 'selectTab($event)',
    '[attr.aria-orientation]': 'state.orientation()',
    '[class]': 'hostClass()',
    '[style.--ngtw-tab-indicator-size]': 'indicatorSize()',
    '[style.--ngtw-tab-indicator-translate]': 'indicatorTranslate()',
    'aria-label': 'Tabs',
    'aria-multiselectable': 'false',
    'role': 'tablist',
  },
  exportAs: 'ngtwTablist',
  selector: '[ngtwTablist]',
})
export class NgtwTablist implements AfterViewInit {
  protected readonly state = consumeTabsState();

  protected readonly indicatorSize = computed(() => {
    if (this.state.orientation() === 'horizontal') return `${this.state.selectedTab()?.element.offsetWidth ?? 0}px`;
    return `${this.state.selectedTab()?.element.offsetHeight ?? 0}px`;
  });

  protected readonly indicatorTranslate = computed(() => {
    if (this.state.orientation() === 'horizontal') return `${this.state.selectedTab()?.element.offsetLeft ?? 0}px`;
    return `${this.state.selectedTab()?.element.offsetTop ?? 0}px`;
  });

  protected readonly hostClass = computed(() => {
    return {
      horizontal:
        'relative flex flex-row border-b-2 border-b-zinc-800 after:absolute after:-bottom-0.5 after:h-0.5 after:w-(--ngtw-tab-indicator-size) after:translate-x-(--ngtw-tab-indicator-translate) after:rounded-none after:bg-zinc-300 after:transition-[translate,_width] after:will-change-[translate,_width]',
      vertical:
        'relative flex flex-col border-l-2 border-l-zinc-800 after:absolute after:-left-0.5 after:h-(--ngtw-tab-indicator-size) after:w-0.5 after:translate-y-(--ngtw-tab-indicator-translate) after:rounded-none after:bg-zinc-300 after:transition-[translate,_height] after:will-change-[translate,_height]',
    }[this.state.orientation()];
  });

  ngAfterViewInit(): void {
    this.state.selectedTab.set(this.state.firstTab());
  }

  focusPreviousTab(event: Event, orientation: NgtwTabsOrientation = 'horizontal') {
    event.preventDefault();
    if (orientation !== this.state.orientation()) return;
    if (this.state.focusedTabIndex() === -1) return;
    const index =
      (this.state.focusedTabIndex() - 1 + this.state.enabledTabs().length) % this.state.enabledTabs().length;
    this.state.enabledTabs()[index]?.focus();
  }

  focusNextTab(event: Event, orientation: NgtwTabsOrientation = 'horizontal') {
    event.preventDefault();
    if (orientation !== this.state.orientation()) return;
    if (this.state.focusedTabIndex() === -1) return;
    const index = (this.state.focusedTabIndex() + 1) % this.state.enabledTabs().length;
    this.state.enabledTabs()[index]?.focus();
  }

  focusFirstTab(event: Event) {
    event.preventDefault();
    this.state.firstTab()?.focus();
  }

  focusLastTab(event: Event) {
    event.preventDefault();
    this.state.lastTab()?.focus();
  }

  selectTab(event?: Event) {
    event?.preventDefault();
    this.state.selectedTab.set(this.state.focusedTab());
  }
}
