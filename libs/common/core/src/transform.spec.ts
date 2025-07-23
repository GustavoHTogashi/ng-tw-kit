import { describe, it, expect, vi } from 'vitest';
import { unsignedNumberAttribute, mimeTypeAttributes } from './transform';

describe('unsignedNumberAttribute', () => {
  it('should return positive number as is', () => {
    expect(unsignedNumberAttribute(5)).toBe(5);
  });

  it('should convert negative number to positive', () => {
    expect(unsignedNumberAttribute(-7)).toBe(7);
  });

  it('should return 0 for 0', () => {
    expect(unsignedNumberAttribute(0)).toBe(0);
  });

  it('should handle string numbers', () => {
    expect(unsignedNumberAttribute('-12')).toBe(12);
    expect(unsignedNumberAttribute('8')).toBe(8);
  });

  it('should handle NaN', () => {
    expect(unsignedNumberAttribute('not a number')).toBeNaN();
  });
});

describe('mimeTypeAttributes', () => {
  it('should handle comma-separated string of mime types', () => {
    expect(mimeTypeAttributes('image/png, text/html')).toBe('image/png,text/html');
  });

  it('should handle array of mime types', () => {
    expect(mimeTypeAttributes(['image/jpeg', ' application/json '])).toBe('image/jpeg,application/json');
  });

  it('should filter out invalid mime types in string', () => {
    expect(mimeTypeAttributes('foo, image/gif, bar')).toBe('image/gif');
  });

  it('should filter out invalid mime types in array', () => {
    expect(mimeTypeAttributes(['foo', 'video/mp4', 'bar'])).toBe('video/mp4');
  });

  it('should return empty string for non-string/non-array values and log error', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(mimeTypeAttributes(123)).toBe('');
    expect(spy).toHaveBeenCalledWith('Invalid mime type attribute value:', 123);
    spy.mockRestore();
  });

  it('should handle empty string', () => {
    expect(mimeTypeAttributes('')).toBe('');
  });

  it('should handle empty array', () => {
    expect(mimeTypeAttributes([])).toBe('');
  });

  it('should trim and lowercase mime types', () => {
    expect(mimeTypeAttributes(' IMAGE/PNG , TEXT/HTML ')).toBe('image/png,text/html');
    expect(mimeTypeAttributes([' IMAGE/JPEG ', 'APPLICATION/JSON'])).toBe('image/jpeg,application/json');
  });
});