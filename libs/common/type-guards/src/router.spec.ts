import {
  ActivatedRouteSnapshot,
  ActivationEnd,
  NavigationEnd,
  NavigationError,
  NavigationStart,
} from '@angular/router';
import { isActivationEnd, isNavigationEnd, isNavigationError, isNavigationStart } from './router';

describe('type-guards: string', () => {
  it('should be valid if navigation is navigationEnd', () => {
    const event = new NavigationEnd(1, '/home', '/home');
    expect(isNavigationEnd(event)).toBe(true);
  });

  it('should be invalid if navigation is not navigationEnd', () => {
    const event = new NavigationError(2, '/home', 'Navigation failed');
    expect(isNavigationEnd(event)).toBe(false);
  });

  it('should be valid if navigation is navigationStart', () => {
    const event = new NavigationStart(1, '/home');
    expect(isNavigationStart(event)).toBe(true);
  });

  it('should be invalid if navigation is not navigationStart', () => {
    const event = new NavigationEnd(1, '/home', '/home');
    expect(isNavigationStart(event)).toBe(false);
  });

  it('should be valid if navigation is navigationError', () => {
    const event = new NavigationError(2, '/home', 'Navigation failed');
    expect(isNavigationError(event)).toBe(true);
  });

  it('should be invalid if navigation is not navigationError', () => {
    const event = new NavigationStart(1, '/home');
    expect(isNavigationError(event)).toBe(false);
  });

  it('should be valid if navigation is activationEnd', () => {
    const event = new ActivationEnd({} as ActivatedRouteSnapshot);
    expect(isActivationEnd(event)).toBe(true);
  });

  it('should be invalid if navigation is not activationEnd', () => {
    const event = new NavigationStart(1, '/home');
    expect(isActivationEnd(event)).toBe(false);
  });
});
