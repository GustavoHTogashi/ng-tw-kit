export function last<Item>(array: Item[]): Item | null {
  if (!array.length) return null;
  return array[array.length - 1];
}