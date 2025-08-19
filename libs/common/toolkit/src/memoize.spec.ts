/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from 'vitest';
import { memoize } from './memoize';

describe('toolkit:memoize', () => {
    it('should return the same result for the same arguments', () => {
        const fn = vi.fn((a: number, b: number) => a + b);
        const memoized = memoize(fn);

        expect(memoized(1, 2)).toBe(3);
        expect(memoized(1, 2)).toBe(3);
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should call the original function for different arguments', () => {
        const fn = vi.fn((a: number, b: number) => a * b);
        const memoized = memoize(fn);

        expect(memoized(2, 3)).toBe(6);
        expect(memoized(3, 4)).toBe(12);
        expect(fn).toHaveBeenCalledTimes(2);
    });

    it('should handle functions with a single argument', () => {
        const fn = vi.fn((x: number) => x * x);
        const memoized = memoize(fn);

        expect(memoized(5)).toBe(25);
        expect(memoized(5)).toBe(25);
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should handle functions with no arguments', () => {
        const fn = vi.fn(() => 42);
        const memoized = memoize(fn);

        expect(memoized()).toBe(42);
        expect(memoized()).toBe(42);
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should cache falsy results', () => {
        const fn = vi.fn(() => 0);
        const memoized = memoize(fn);

        expect(memoized()).toBe(0);
        expect(memoized()).toBe(0);
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should cache if arguments are different types but same string', () => {
        const fn = vi.fn((x: any) => typeof x);
        const memoized = memoize(fn);

        expect(memoized(1)).toBe('number');
        expect(memoized('1')).toBe('number');
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should work with multiple argument types', () => {
        const fn = vi.fn((a: number, b: string) => `${a}-${b}`);
        // @ts-expect-error need to test with different types
        const memoized = memoize(fn);

        expect(memoized(1, 'a')).toBe('1-a');
        expect(memoized(1, 'a')).toBe('1-a');
        expect(fn).toHaveBeenCalledTimes(1);
    });
});