import { isString } from './string';

describe('type-guards:string', () => {
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
