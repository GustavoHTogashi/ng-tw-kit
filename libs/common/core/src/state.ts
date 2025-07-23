import {
  inject,
  InjectionToken,
  InputSignal,
  InputSignalWithTransform,
  linkedSignal,
  Provider,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';

export type StateToken<State> = InjectionToken<WritableSignal<State>>;

export type CreationState<SignalType> = Record<
  string,
  | InputSignal<SignalType>
  | InputSignalWithTransform<SignalType, never>
  | Signal<SignalType>
  | WritableSignal<SignalType>
>;

export function createState<State, SignalType>(token: StateToken<State>) {
  return function (newState: CreationState<SignalType>): WritableSignal<State> {
    const internalState = inject(token, { optional: true });
    if (!internalState) throw new Error(`${token.toString()} was not provided`);

    const nextState: State = {
      ...internalState(),
      ...Object.fromEntries(
        Object.entries(newState).map(([k, v]) => [k, linkedSignal(() => v())]),
      ),
    };

    internalState.set(nextState);
    return internalState;
  };
}

export function provideState<State>(token: StateToken<State>) {
  return function (initialState: State = {} as State): Provider[] {
    return [{ provide: token, useFactory: () => signal<State>(initialState) }];
  };
}

export function consumeState<State>(token: StateToken<State>) {
  return function (): State {
    const state = inject(token, { optional: true });
    if (!state) throw new Error(`${token.toString()} was not provided`);
    return state();
  };
}
