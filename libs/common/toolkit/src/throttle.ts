export function throttle<Fn extends (...args: never[]) => unknown>(
  fn: Fn,
  limit: number,
): (...args: Parameters<Fn>) => void {
  let lastCall = 0;
  return function (...args: Parameters<Fn>) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
}
