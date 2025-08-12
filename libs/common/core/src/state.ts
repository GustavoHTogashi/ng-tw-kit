import {
  computed,
  inject,
  InjectionToken,
  linkedSignal,
  signal,
} from '@angular/core';

type AllowedSignal<T = unknown> =
  | ReturnType<typeof signal<T>>
  | ReturnType<typeof linkedSignal<T>>
  | ReturnType<typeof computed<T>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | ((...args: any[]) => any);

type StateShape = Record<string, AllowedSignal>;

type StateManager<T extends StateShape> = {
  token: InjectionToken<T>;
  provide(factory?: Partial<T> | (() => Partial<T>)): {
    provide: InjectionToken<T>;
    useValue: T;
  };
  create(factory: Partial<T> | (() => Partial<T>)): T;
  consume(): T;
};

export function createStateManager<T extends StateShape>(
  description: string,
  defaults: () => T,
): StateManager<T> {
  const token = new InjectionToken<T>(description);

  function provide(factory?: Partial<T> | (() => Partial<T>)) {
    const base = defaults();
    if (factory) {
      const partial = typeof factory === 'function' ? factory() : factory;
      for (const [key, value] of Object.entries(partial)) {
        Object.defineProperty(base, key, { value });
      }
    }
    return { provide: token, useValue: base };
  }

  function create(factory: Partial<T> | (() => Partial<T>)): T {
    const state = inject(token);
    const partial = typeof factory === 'function' ? factory() : factory;
    for (const [key, value] of Object.entries(partial)) {
      Object.defineProperty(state, key, { value });
    }
    return state;
  }

  function consume(): T {
    return inject(token);
  }

  return { token, provide, create, consume };
}
