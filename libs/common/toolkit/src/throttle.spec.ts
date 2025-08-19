/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from 'vitest';
import { throttle } from './throttle';

describe('toolkit:throttle', () => {
    it('should call the function immediately and then throttle subsequent calls', () => {
        const fn = vi.fn();
        const throttled = throttle(fn, 100);

        throttled();
        throttled();
        throttled();

        expect(fn).toHaveBeenCalledTimes(1);

        setTimeout(() => {
            throttled();
            expect(fn).toHaveBeenCalledTimes(2);
        }, 120);
    });

    it('should pass arguments to the throttled function', () => {
        const fn = vi.fn();
        const throttled = throttle(fn, 100);

        throttled('test');
        expect(fn).toHaveBeenCalledWith('test');
    });

    it('should not call the function again before the wait time', () => {
        const fn = vi.fn();
        const throttled = throttle(fn, 100);

        throttled();
        throttled();
        expect(fn).toHaveBeenCalledTimes(1);

        setTimeout(() => {
            throttled();
            expect(fn).toHaveBeenCalledTimes(2);
        }, 101);
    });
});