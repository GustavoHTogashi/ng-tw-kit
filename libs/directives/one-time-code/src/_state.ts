import { computed, inject, InjectionToken, linkedSignal, Provider, signal, WritableSignal } from '@angular/core';
import { consumeState, CreationState } from '@ngtw-kit/common/di';
import { NgtwOneTimeCodeState } from './_type';

export const NGTW_ONE_TIME_CODE_STATE = new InjectionToken<WritableSignal<NgtwOneTimeCodeState>>(
  'ngtwOneTimeCodeState',
);

export const consumeOneTimeCodeState = consumeState(NGTW_ONE_TIME_CODE_STATE);

export function createOneTimeCodeState<Type>(newState: CreationState<Type>): NgtwOneTimeCodeState {
  const internalState = inject(NGTW_ONE_TIME_CODE_STATE, { optional: true });
  if (!internalState) throw new Error(`${NGTW_ONE_TIME_CODE_STATE.toString()} was not provided`);

  const nextState: NgtwOneTimeCodeState = {
    ...internalState(),
    ...Object.fromEntries(Object.entries(newState).map(([k, v]) => [k, linkedSignal(v)])),
    firstDigit: computed(() => internalState().digits().at(0)),
    focusedDigitIndex: computed(() => {
      const focusedDigit = internalState().focusedDigit();
      if (!focusedDigit) return -1;
      return internalState().digits().indexOf(focusedDigit);
    }),
    isComplete: computed(() => internalState().value().length === internalState().digits().length),
    isEmpty: computed(() => internalState().value().length === 0),
    lastDigit: computed(() => internalState().digits().at(-1)),
  };

  internalState.set(nextState);
  return internalState();
}

export function provideOneTimeCodeState(initialState?: Partial<NgtwOneTimeCodeState>): Provider[] {
  return [
    {
      provide: NGTW_ONE_TIME_CODE_STATE,
      useFactory: () =>
        signal<NgtwOneTimeCodeState>({
          digits: signal([]),
          disabled: signal(false),
          firstDigit: signal(undefined),
          focusedDigit: signal(undefined),
          focusedDigitIndex: signal(-1),
          isComplete: signal(false),
          isEmpty: signal(true),
          lastDigit: signal(undefined),
          value: signal(''),
          ...initialState,
        }),
    },
  ];
}
