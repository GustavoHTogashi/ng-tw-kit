import { describe, it, expect } from 'vitest';
import { groupBy } from './groupby';

describe('toolkit:groupBy', () => {
  it('should group items by a primitive key', () => {
    const data = [
      { type: 'a', value: 1 },
      { type: 'b', value: 2 },
      { type: 'a', value: 3 },
    ];
    const result = groupBy(data, (item) => item.type);
    expect(result).toEqual([
      [
        'a',
        [
          { type: 'a', value: 1 },
          { type: 'a', value: 3 },
        ],
      ],
      ['b', [{ type: 'b', value: 2 }]],
    ]);
  });

  it('should return an empty array when input is empty', () => {
    expect(groupBy([], (x) => x)).toEqual([]);
  });

  it('should group numbers by even/odd', () => {
    const nums = [1, 2, 3, 4, 5];
    const result = groupBy(nums, (n) => (n % 2 === 0 ? 'even' : 'odd'));
    expect(result).toEqual([
      ['odd', [1, 3, 5]],
      ['even', [2, 4]],
    ]);
  });

  it('should handle grouping by undefined key', () => {
    const data = [{}, { a: 1 }];
    // @ts-expect-error needed to test undefined grouping
    const result = groupBy(data, (item) => item.a);
    expect(result).toEqual([
      [undefined, [{}]],
      [1, [{ a: 1 }]],
    ]);
  });

  it('should group by boolean key', () => {
    const data = [true, false, true];
    // @ts-expect-error needed to test boolean grouping
    const result = groupBy(data, (item) => item);
    expect(result).toEqual([
      [true, [true, true]],
      [false, [false]],
    ]);
  });

  it('should group by computed key', () => {
    const data = ['apple', 'banana', 'apricot', 'blueberry'];
    const result = groupBy(data, (str) => str[0]);
    expect(result).toEqual([
      ['a', ['apple', 'apricot']],
      ['b', ['banana', 'blueberry']],
    ]);
  });
});
