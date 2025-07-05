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

export const provideState = <State>(
  token: InjectionToken<WritableSignal<State>>,
) => {
  return (initialState: State = {} as State): Provider[] => [
    {
      provide: token,
      useFactory: () => signal<State>(initialState),
    },
  ];
};

export const createState = <State, SignalType>(
  token: InjectionToken<WritableSignal<State>>,
) => {
  return (
    newState: Record<
      string,
      | InputSignal<SignalType>
      | InputSignalWithTransform<SignalType, never>
      | Signal<SignalType>
      | WritableSignal<SignalType>
    >,
  ): WritableSignal<State> => {
    const internalState = inject(token, { optional: true });
    if (!internalState) throw new Error(`${token.toString()} was not provided`);

    const nextState: State = {
      ...internalState(),
      ...Object.fromEntries(
        Object.entries(newState).map(([key, value]) => [
          key,
          linkedSignal(() => value()),
        ]),
      ),
    };

    internalState.set(nextState);
    return internalState;
  };
};
