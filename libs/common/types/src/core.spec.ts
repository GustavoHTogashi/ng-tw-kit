/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElementRef, TemplateRef, Type } from '@angular/core';
import { isComponentType, isTemplateRef } from './core';

class DummyComponent {}

class DummyTemplateRef<T> extends TemplateRef<T> {
  // Minimal implementation for testing
  override elementRef: ElementRef<T> = {} as ElementRef<T>;
  override createEmbeddedView(_: T): any {
    return {};
  }
}

describe('isTemplateRef', () => {
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

describe('isComponentType', () => {
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
