import { AfterViewInit, computed, contentChildren, Directive, inject } from '@angular/core';
import { NGTW_TABS_STATE } from './_state';
import { NgtwTab } from './tab';
import { NgtwTabsetOrientation } from './_type';

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
    '[attr.aria-orientation]': 'state().orientation()',
    '[class]': 'hostClass()',
    '[style.--ngtw-tab-indicator-size]': 'state().indicatorSize()',
    '[style.--ngtw-tab-indicator-translate]': 'state().indicatorTranslate()',
    'aria-label': 'Tabs',
    'aria-multiselectable': 'false',
    'role': 'tablist',
  },
  exportAs: 'ngtwTablist',
  selector: '[ngtwTablist]',
})
export class NgtwTablist implements AfterViewInit {
  tabs = contentChildren(NgtwTab);
  focusableTabs = computed(() => this.tabs().filter((tab) => !tab.disabled()));
  focusedTabIndex = computed(() => this.focusableTabs().findIndex((tab) => this.state().focusedTab() === tab.value()));
  focusedTab = computed(() => this.tabs().find((tab) => tab.value() === this.state().focusedTab()));

  protected readonly state = inject(NGTW_TABS_STATE);

  readonly hostClass = computed(() => {
    return {
      horizontal:
        'relative flex flex-row border-b-2 border-b-zinc-800 after:absolute after:-bottom-0.5 after:h-0.5 after:w-(--ngtw-tab-indicator-size) after:translate-x-(--ngtw-tab-indicator-translate) after:rounded-none after:bg-zinc-300 after:transition-[translate,_width] after:will-change-[translate,_width]',
      vertical:
        'relative flex flex-col border-l-2 border-l-zinc-800 after:absolute after:-left-0.5 after:h-(--ngtw-tab-indicator-size) after:w-0.5 after:translate-y-(--ngtw-tab-indicator-translate) after:rounded-none after:bg-zinc-300 after:transition-[translate,_height] after:will-change-[translate,_height]',
    }[this.state().orientation()];
  });

  ngAfterViewInit() {
    const [firstTab] = this.tabs().filter(({ disabled }) => !disabled());
    firstTab.changeSelectedTab();
  }

  focusPreviousTab(event: Event, orientation: NgtwTabsetOrientation = 'horizontal') {
    event.preventDefault();
    if (orientation !== this.state().orientation()) return;
    if (this.focusedTabIndex() === -1) return;
    const previousIndex = (this.focusedTabIndex() - 1 + this.focusableTabs().length) % this.focusableTabs().length;
    this.focusableTabs()[previousIndex]?.element.focus();
  }

  focusNextTab(event: Event, orientation: NgtwTabsetOrientation = 'horizontal') {
    event.preventDefault();
    if (orientation !== this.state().orientation()) return;
    if (this.focusedTabIndex() === -1) return;
    const nextIndex = (this.focusedTabIndex() + 1) % this.focusableTabs().length;
    this.focusableTabs()[nextIndex]?.element.focus();
  }

  focusFirstTab(event: Event) {
    event.preventDefault();
    this.focusableTabs().at(0)?.element.focus();
  }

  focusLastTab(event: Event) {
    event.preventDefault();
    this.focusableTabs().at(-1)?.element.focus();
  }

  selectTab(event: Event) {
    event.preventDefault();
    this.focusedTab()?.changeSelectedTab();
  }
}
