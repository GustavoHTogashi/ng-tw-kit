import { TemplateRef, Type } from '@angular/core';

export function isTemplateRef<T>(
  content: TemplateRef<T> | Type<T> | string | null | undefined,
): content is TemplateRef<T> {
  return content instanceof TemplateRef;
}

export function isComponentType<T>(content: TemplateRef<T> | Type<T> | string | null | undefined): content is Type<T> {
  return content instanceof Type || typeof content === 'function';
}
