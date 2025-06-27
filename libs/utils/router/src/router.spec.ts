import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
} from '@angular/router';
import {
  isNavigationEnd,
  isNavigationError,
  isNavigationStart,
} from './router';

describe('utils:Router', () => {
  it('should: return the type of given Event is NavigationStart', () => {
    const navigationStartEvent = new NavigationStart(1, '/home');

    if (isNavigationStart(navigationStartEvent)) {
      expectTypeOf<NavigationStart>(navigationStartEvent);
    }

    expect(isNavigationStart(navigationStartEvent)).toBe(true);
  });

  it('should: return the type of given Event is NavigationEnd', () => {
    const navigationEndEvent = new NavigationEnd(1, '/home', '/home');

    if (isNavigationEnd(navigationEndEvent)) {
      expectTypeOf<NavigationEnd>(navigationEndEvent);
    }

    expect(isNavigationEnd(navigationEndEvent)).toBe(true);
  });

  it('should: return the type of given Event is NavigationError', () => {
    const navigationErrorEvent = new NavigationError(1, '/home', 'Error');

    if (isNavigationError(navigationErrorEvent)) {
      expectTypeOf<NavigationError>(navigationErrorEvent);
    }

    expect(isNavigationError(navigationErrorEvent)).toBe(true);
  });
});
