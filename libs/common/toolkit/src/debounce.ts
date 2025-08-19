export function debounce<Fn extends (...args: never[]) => unknown>(
  fn: Fn,
  delay: number,
): (...args: Parameters<Fn>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null;
  return function (...args: Parameters<Fn>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
