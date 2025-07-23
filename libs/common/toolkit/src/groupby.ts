export function groupBy<Key extends string | number | symbol, Item>(
  array: Item[],
  keyFn: (item: Item) => Key,
): [Key, Item[]][] {
  const map = new Map<Key, Item[]>();
  for (const item of array) {
    const key = keyFn(item);
    if (!map.has(key)) map.set(key, []);
    map.get(key)?.push(item);
  }
  return Array.from(map.entries());
}
