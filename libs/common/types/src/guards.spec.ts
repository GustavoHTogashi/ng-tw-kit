/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElementRef, TemplateRef, Type } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ActivationEnd,
  NavigationEnd,
  NavigationError,
  NavigationStart,
} from '@angular/router';
import {
  isActivationEnd,
  isComponentType,
  isDate,
  isNavigationEnd,
  isNavigationError,
  isNavigationStart,
  isNull,
  isNumber,
  isString,
  isTemplateRef,
} from './guards';

describe('types:guards:isDate', () => {
  it('should return true for Date instances', () => {
    expect(isDate(new Date())).toBe(true);
  });

  it('should return false for non-Date instances', () => {
    expect(isDate('2021-01-01')).toBe(false);
    expect(isDate(1234567890)).toBe(false);
    expect(isDate({})).toBe(false);
    expect(isDate([])).toBe(false);
    expect(isDate(null)).toBe(false);
    expect(isDate(undefined)).toBe(false);
    expect(isDate(true)).toBe(false);
    expect(isDate(false)).toBe(false);
    expect(isDate(Symbol('test'))).toBe(false);
  });
});

describe('types:guards:isNull', () => {
  it('should return true for null', () => {
    expect(isNull(null)).toBe(true);
  });

  it('should return false for undefined', () => {
    expect(isNull(undefined)).toBe(false);
  });

  it('should return false for non-null values', () => {
    expect(isNull(0)).toBe(false);
    expect(isNull('')).toBe(false);
    expect(isNull({})).toBe(false);
    expect(isNull([])).toBe(false);
    expect(isNull(true)).toBe(false);
    expect(isNull(false)).toBe(false);
    expect(isNull(Symbol('test'))).toBe(false);
  });
});

describe('types:guards:isNumber', () => {
  it('should return true for numbers', () => {
    expect(isNumber(123)).toBe(true);
    expect(isNumber(0)).toBe(true);
    expect(isNumber(-123.45)).toBe(true);
  });

  it('should return false for non-number values', () => {
    expect(isNumber('123')).toBe(false);
    expect(isNumber({})).toBe(false);
    expect(isNumber([])).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber(true)).toBe(false);
    expect(isNumber(false)).toBe(false);
    expect(isNumber(Symbol('test'))).toBe(false);
  });
});

describe('types:guards:isString', () => {
  it('should return true for string literals', () => {
    expect(isString('hello')).toBe(true);
  });

  it('should return false for non-string literals', () => {
    expect(isString(123)).toBe(false);
    expect(isString({})).toBe(false);
    expect(isString([])).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString(true)).toBe(false);
    expect(isString(false)).toBe(false);
    expect(isString(Symbol('test'))).toBe(false);
  });
});

class DummyComponent {}

class DummyTemplateRef<T> extends TemplateRef<T> {
  // Minimal implementation for testing
  override elementRef: ElementRef<T> = {} as ElementRef<T>;
  override createEmbeddedView(_: T): any {
    return {};
  }
}

describe('types:guards:isComponentType', () => {
  it('should return true for Type (class)', () => {
    expect(isComponentType(DummyComponent)).toBe(true);
  });

  it('should return false for TemplateRef instance', () => {
    const templateRef = new DummyTemplateRef<any>();
    expect(isComponentType(templateRef)).toBe(false);
  });

  it('should return false for string', () => {
    expect(isComponentType('test')).toBe(false);
  });

  it('should return false for null', () => {
    expect(isComponentType(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isComponentType(undefined)).toBe(false);
  });

  it('should return true for function', () => {
    const TestFn = () => null;
    expect(isComponentType(TestFn as unknown as Type<unknown>)).toBe(true);
  });
});

describe('types:guards:isTemplateRef', () => {
  it('should return true for TemplateRef instance', () => {
    const templateRef = new DummyTemplateRef<unknown>();
    expect(isTemplateRef(templateRef)).toBe(true);
  });

  it('should return false for Type', () => {
    expect(isTemplateRef(DummyComponent)).toBe(false);
  });

  it('should return false for string', () => {
    expect(isTemplateRef('test')).toBe(false);
  });

  it('should return false for null', () => {
    expect(isTemplateRef(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isTemplateRef(undefined)).toBe(false);
  });
});

describe('types:guards:isActivationEnd', () => {
  it('should be valid if navigation is activationEnd', () => {
    const event = new ActivationEnd({} as ActivatedRouteSnapshot);
    expect(isActivationEnd(event)).toBe(true);
  });

  it('should be invalid if navigation is not activationEnd', () => {
    const event = new NavigationStart(1, '/home');
    expect(isActivationEnd(event)).toBe(false);
  });
});

describe('types:guards:isNavigationEnd', () => {
  it('should be valid if navigation is navigationEnd', () => {
    const event = new NavigationEnd(1, '/home', '/home');
    expect(isNavigationEnd(event)).toBe(true);
  });

  it('should be invalid if navigation is not navigationEnd', () => {
    const event = new NavigationError(2, '/home', 'Navigation failed');
    expect(isNavigationEnd(event)).toBe(false);
  });
});

describe('types:guards:isNavigationError', () => {
  it('should be valid if navigation is navigationError', () => {
    const event = new NavigationError(2, '/home', 'Navigation failed');
    expect(isNavigationError(event)).toBe(true);
  });

  it('should be invalid if navigation is not navigationError', () => {
    const event = new NavigationStart(1, '/home');
    expect(isNavigationError(event)).toBe(false);
  });
});

describe('types:guards:isNavigationStart', () => {
  it('should be valid if navigation is navigationStart', () => {
    const event = new NavigationStart(1, '/home');
    expect(isNavigationStart(event)).toBe(true);
  });

  it('should be invalid if navigation is not navigationStart', () => {
    const event = new NavigationEnd(1, '/home', '/home');
    expect(isNavigationStart(event)).toBe(false);
  });
});
