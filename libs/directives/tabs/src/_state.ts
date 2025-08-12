import { computed, signal } from '@angular/core';
import { createStateManager } from '@ngtw-kit/common/core';
import { NgtwTabsState } from './_type';

export const TabState = createStateManager<NgtwTabsState>(
  'NGTW_TABS_STATE',
  () => {
    return {
      enabledTabs: computed(() => []),
      firstTab: computed(() => undefined),
      focusedTab: signal(undefined),
      focusedTabIndex: signal(-1),
      lastTab: computed(() => undefined),
      orientation: signal('horizontal'),
      selectedTab: signal(undefined),
      tabs: computed(() => []),
    };
  },
);
