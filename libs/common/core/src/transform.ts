import { numberAttribute } from '@angular/core';

export function unsignedNumberAttribute(value: unknown): number {
  const num = numberAttribute(value);
  if (num < 0) return Math.abs(num);
  return num;
}

export function mimeTypeAttributes(value: unknown): string {
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((type) => type.trim().toLowerCase())
      .filter((type) => type.includes('/'))
      .join(',');
  }
  if (Array.isArray(value)) {
    return value
      .map((type) => type.trim().toLowerCase())
      .filter((type) => type.includes('/'))
      .join(',');
  }
  console.error('Invalid mime type attribute value:', value);
  return '';
}
