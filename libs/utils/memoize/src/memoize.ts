export const memoize = <Args, Result>(fn: (...args: Args[]) => Result) => {
  const cache = new Map();

  return (...args: Args[]) => {
    const key = `key-${args.join('-')}`;

    if (cache.has(key)) return cache.get(key);

    const result = fn && fn(...args);
    cache.set(key, result);
    return result;
  };
};
