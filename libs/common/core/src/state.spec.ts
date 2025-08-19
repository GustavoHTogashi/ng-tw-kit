import {
  computed,
  Injector,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { describe, expect, it } from 'vitest';
import { createStateManager } from './state';

describe('createStateManager', () => {
  type TestState = {
    count: ReturnType<typeof signal<number>>;
    label: ReturnType<typeof signal<string>>;
  };

  const defaults = () => ({
    count: signal(0),
    label: signal('init'),
  });

  const manager = createStateManager<TestState>('Test State', defaults);

  it('exposes an InjectionToken with the provided description', () => {
    expect(manager.token.toString()).toContain('Test State');
  });

  it('provide() without factory uses defaults()', () => {
    const injector = Injector.create([manager.provide()]);
    runInInjectionContext(injector, () => {
      const state = manager.consume();
      expect(state.count()).toBe(0);
      expect(state.label()).toBe('init');
    });
  });

  it('provide() with object factory overrides defaults', () => {
    const overriddenLabel = signal('override');
    const injector = Injector.create([
      manager.provide({ label: overriddenLabel }),
    ]);

    runInInjectionContext(injector, () => {
      const state = manager.consume();
      expect(state.count()).toBe(0);
      expect(state.label()).toBe('override');
      expect(state.label).toBe(overriddenLabel);
      // properties set via defineProperty are non-writable
      expect(() => {
        state.label = signal('new');
      }).toThrow(TypeError);
    });
  });

  it('provide() with function factory overrides defaults', () => {
    const newCount = signal(7);
    const injector = Injector.create([
      manager.provide(() => ({ count: newCount })),
    ]);

    runInInjectionContext(injector, () => {
      const state = manager.consume();
      expect(state.count()).toBe(7);
      expect(state.count).toBe(newCount);
    });
  });

  it('create() merges into the provided state and returns the same instance', () => {
    const injector = Injector.create([manager.provide()]);
    runInInjectionContext(injector, () => {
      const before = manager.consume();
      const replacement = signal(42);

      const after = manager.create({ count: replacement });
      expect(after).toBe(before);
      expect(after.count()).toBe(42);
      expect(after.count).toBe(replacement);
      expect(() => {
        after.count = signal(1);
      }).toThrow(TypeError);
    });
  });

  it('supports computed signals in the state', () => {
    type WithComputed = {
      val: ReturnType<typeof signal<number>>;
      doubled: ReturnType<typeof computed<number>>;
    };

    const m2 = createStateManager<WithComputed>('Computed State', () => {
      const val = signal(2);
      return {
        val,
        doubled: computed(() => val() * 2),
      };
    });

    const injector = Injector.create({
      providers: [m2.provide()],
    });
    runInInjectionContext(injector, () => {
      const state = m2.consume();
      expect(state.val()).toBe(2);
      expect(state.doubled()).toBe(4);

      state.val.set(3);
      expect(state.doubled()).toBe(6);

      m2.create({ val: signal(5) });
      const newState = m2.consume()
      expect(newState.val()).toBe(5);
      expect(newState.doubled()).toBe(10);
    });
  });
});
