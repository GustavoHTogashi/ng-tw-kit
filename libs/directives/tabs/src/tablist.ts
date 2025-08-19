import { AfterViewInit, computed, Directive } from '@angular/core';
import { TabState } from './_state';
import { NgtwTabsOrientation } from './_type';

@Directive({
  exportAs: 'ngtwTablist',
  host: {
    '(keydown.arrowdown.stop)': 'focusNextTab("vertical")',
    '(keydown.arrowleft.stop)': 'focusPreviousTab()',
    '(keydown.arrowright.stop)': 'focusNextTab()',
    '(keydown.arrowup.stop)': 'focusPreviousTab("vertical")',
    '(keydown.end.stop)': 'focusLastTab()',
    '(keydown.enter.stop)': 'selectTab()',
    '(keydown.home.stop)': 'focusFirstTab()',
    '(keydown.space.stop)': 'selectTab()',
    '[attr.aria-label]': '"Tabs"',
    '[attr.aria-multiselectable]': 'false',
    '[attr.aria-orientation]': 'state.orientation()',
    '[attr.role]': '"tablist"',
    '[class]': 'hostClass()',
    '[style.--ngtw-tab-indicator-size]': 'indicatorSize()',
    '[style.--ngtw-tab-indicator-translate]': 'indicatorTranslate()',
  },
  selector: '[ngtwTablist]',
})
export class NgtwTablist implements AfterViewInit {
  protected readonly state = TabState.consume();

  protected readonly indicatorSize = computed(() => {
    if (this.state.orientation() === 'horizontal')
      return `${this.state.selectedTab()?.element.offsetWidth ?? 0}px`;
    return `${this.state.selectedTab()?.element.offsetHeight ?? 0}px`;
  });

  protected readonly indicatorTranslate = computed(() => {
    if (this.state.orientation() === 'horizontal')
      return `${this.state.selectedTab()?.element.offsetLeft ?? 0}px`;
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

  focusPreviousTab(orientation: NgtwTabsOrientation = 'horizontal') {
    if (orientation !== this.state.orientation()) return;
    if (this.state.focusedTabIndex() === -1) return;
    const index =
      (this.state.focusedTabIndex() - 1 + this.state.enabledTabs().length) %
      this.state.enabledTabs().length;
    this.state.enabledTabs()[index]?.focus();
  }

  focusNextTab(orientation: NgtwTabsOrientation = 'horizontal') {
    if (orientation !== this.state.orientation()) return;
    if (this.state.focusedTabIndex() === -1) return;
    const index =
      (this.state.focusedTabIndex() + 1) % this.state.enabledTabs().length;
    this.state.enabledTabs()[index]?.focus();
  }

  focusFirstTab() {
    this.state.firstTab()?.focus();
  }

  focusLastTab() {
    this.state.lastTab()?.focus();
  }

  selectTab() {
    this.state.selectedTab.set(this.state.focusedTab());
  }
}
