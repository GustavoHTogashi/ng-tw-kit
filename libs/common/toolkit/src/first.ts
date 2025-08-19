export function first<Item>(array: Item[]): Item | null {
  if (!array.length) return null;
  return array[0];
}
