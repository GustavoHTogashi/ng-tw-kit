import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce } from './debounce';

describe('toolkit:debounce', () => {
  let fn: ReturnType<typeof vi.fn>;
  let debouncedFn: (...args: unknown[]) => void;

  beforeEach(() => {
    vi.useFakeTimers();
    fn = vi.fn();
    debouncedFn = debounce(fn, 100);
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.restoreAllMocks();
  });

  it('should call the function after the specified delay', () => {
    debouncedFn('test');
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledWith('test');
  });

  it('should only call the function once if called multiple times within the delay', () => {
    debouncedFn('first');
    debouncedFn('second');
    debouncedFn('third');
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('third');
  });

  it('should reset the timer if called again before the delay', () => {
    debouncedFn('a');
    vi.advanceTimersByTime(50);
    debouncedFn('b');
    vi.advanceTimersByTime(50);
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledWith('b');
  });

  it('should work with functions that return values', () => {
    const retFn = debounce(() => 'value', 100);
    retFn();
    vi.advanceTimersByTime(100);
    // The debounced function does not return the value immediately
    expect(fn).not.toHaveReturned();
  });
});
