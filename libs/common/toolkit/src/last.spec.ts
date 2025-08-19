import { last } from './last';

describe('toolkit:last', () => { 
  it('should return the last item of a non-empty array', () => {
    const result = last([1, 2, 3]);
    expect(result).toBe(3);
  });

  it('should return null for an empty array', () => {
    const result = last([]);
    expect(result).toBeNull();
  });

  it('should handle arrays with different types', () => {
    const result = last(['a', 'b', 'c']);
    expect(result).toBe('c');
  });

  it('should return null for an empty array of objects', () => {
    const result = last<{ name: string }>([]);
    expect(result).toBeNull();
  });
})