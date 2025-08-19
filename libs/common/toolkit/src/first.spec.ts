import { first } from './first';

describe('toolkit:first', () => {
  it('should return the first item of a non-empty array', () => {
    const result = first([1, 2, 3]);
    expect(result).toBe(1);
  });

  it('should return null for an empty array', () => {
    const result = first([]);
    expect(result).toBeNull();
  });

  it('should handle arrays with different types', () => {
    const result = first(['a', 'b', 'c']);
    expect(result).toBe('a');
  });

  it('should return null for an empty array of objects', () => {
    const result = first<{ name: string }>([]);
    expect(result).toBeNull();
  });
});
