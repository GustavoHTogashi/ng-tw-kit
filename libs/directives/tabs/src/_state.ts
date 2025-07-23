import {
  computed,
  inject,
  InjectionToken,
  linkedSignal,
  Provider,
  signal,
  WritableSignal,
} from '@angular/core';
import { consumeState, CreationState } from '@ngtw-kit/common/core';
import { NgtwTabsState } from './_type';

export const NGTW_TABS_STATE = new InjectionToken<
  WritableSignal<NgtwTabsState>
>('[NGTW_TABS_STATE]');

export const consumeTabsState = consumeState(NGTW_TABS_STATE);

export function createTabsState<Type>(
  newState: CreationState<Type>,
): NgtwTabsState {
  const internalState = inject(NGTW_TABS_STATE, { optional: true });
  if (!internalState) {
    throw new Error(`${NGTW_TABS_STATE.toString()} was not provided`);
  }

  const enabledTabs = computed(() =>
    internalState()
      .tabs()
      .filter(({ disabled }) => !disabled()),
  );

  const nextState: NgtwTabsState = {
    ...internalState(),
    ...Object.fromEntries(
      Object.entries(newState).map(([k, v]) => [k, linkedSignal(() => v())]),
    ),
    enabledTabs,
    firstTab: computed(() => enabledTabs().at(0)),
    focusedTabIndex: computed(() => {
      const tab = internalState().focusedTab();
      if (!tab) return -1;
      return enabledTabs().indexOf(tab);
    }),
    lastTab: computed(() => enabledTabs().at(-1)),
  };

  internalState.set(nextState);
  return internalState();
}

export function provideTabsState(
  initialState?: Partial<NgtwTabsState>,
): Provider[] {
  return [
    {
      provide: NGTW_TABS_STATE,
      useFactory: () =>
        signal<NgtwTabsState>({
          enabledTabs: signal([]),
          firstTab: signal(undefined),
          focusedTab: signal(undefined),
          focusedTabIndex: signal(-1),
          lastTab: signal(undefined),
          orientation: signal('horizontal'),
          selectedTab: signal(undefined),
          tabs: signal([]),
          ...initialState,
        }),
    },
  ];
}
