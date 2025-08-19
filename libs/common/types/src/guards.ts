import { TemplateRef, Type } from '@angular/core';
import {
  ActivationEnd,
  Event,
  EventType,
  NavigationEnd,
  NavigationError,
  NavigationStart
} from '@angular/router';
/**
 * Type guard that checks whether a value is a `Date` instance.
 *
 * @param v - The value to test.
 * @returns True if the value is a `Date` object, otherwise false.
 *
 * @example
 * if (isDate(maybeDate)) {
 *   console.log(maybeDate.toISOString());
 * }
 */
function isDate(v: unknown): v is Date {
  return v instanceof Date;
}
/**
 * Type guard that checks whether a value is exactly `null`.
 *
 * @param v - The value to test.
 * @returns True if the value is `null`, otherwise false.
 */
function isNull(v: unknown): v is null {
  return v === null;
}
/**
 * Type guard that checks whether a value is a number (excluding NaN).
 *
 * @param v - The value to test.
 * @returns True if the value is a number, otherwise false.
 *
 * @remarks
 * This does not exclude `NaN`. Add an extra `!Number.isNaN(v)` check if needed.
 */
function isNumber(v: unknown): v is number {
  return typeof v === 'number';
}
/**
 * Type guard that checks whether a value is a string.
 *
 * @param v - The value to test.
 * @returns True if the value is of type `string`, otherwise false.
 *
 * @example
 * if (isString(input)) {
 *   // input is now typed as string
 *   console.log(input.toUpperCase());
 * }
 */
function isString(v: unknown): v is string {
  return typeof v === 'string';
}
/**
 * Type guard that checks whether a value is an Angular component `Type`.
 *
 * @typeParam T - The component instance type.
 * @param content - The value to test.
 * @returns True if the value looks like an Angular component type, otherwise false.
 *
 * @remarks
 * Uses `instanceof Type` (where available) or a fallback `typeof content === 'function'`.
 * This is a heuristic; it will treat any function as a component type.
 */
function isComponentType<T>(content: unknown): content is Type<T> {
  return content instanceof Type || typeof content === 'function';
}
/**
 * Type guard that checks whether a value is an Angular `TemplateRef`.
 *
 * @typeParam T - Context type bound to the template.
 * @param content - The value to test.
 * @returns True if the value is a `TemplateRef`, otherwise false.
 *
 * @remarks
 * Relies on `instanceof TemplateRef`; may fail across different Angular
 * library boundaries if multiple framework copies are present.
 */
function isTemplateRef<T>(content: unknown): content is TemplateRef<T> {
  return content instanceof TemplateRef;
}
/**
 * Internal type guard that checks whether a value is an Angular Router `Event`.
 *
 * @param e - The value to test.
 * @returns True if it is a router `Event`, otherwise false.
 *
 * @internal
 */
function isEvent(e: unknown): e is Event {
  return (
    // heuristic to check if e is a RouterEvent
    e != null &&
    typeof e === 'object' &&
    'type' in e &&
    typeof e.type === 'number'
  );
}
/**
 * Type guard that checks whether a router event is an `ActivationEnd`.
 *
 * @param e - The event to test.
 * @returns True if the event is an `ActivationEnd`, otherwise false.
 *
 * @remarks
 * Useful for reacting to the completion of a route component's activation.
 */
function isActivationEnd(e: unknown): e is ActivationEnd {
  if (isEvent(e)) return e.type === EventType.ActivationEnd;
  return false;
}
/**
 * Type guard that checks whether a router event is a `NavigationEnd`.
 *
 * @param e - The event to test.
 * @returns True if the event is a `NavigationEnd`, otherwise false.
 *
 * @example
 * if (isNavigationEnd(event)) {
 *   console.log('Navigation finished:', event.urlAfterRedirects);
 * }
 */
function isNavigationEnd(e: unknown): e is NavigationEnd {
  if (isEvent(e)) return e.type === EventType.NavigationEnd;
  return false;
}
/**
 * Type guard that checks whether a router event is a `NavigationError`.
 *
 * @param e - The event to test.
 * @returns True if the event is a `NavigationError`, otherwise false.
 *
 * @example
 * if (isNavigationError(event)) {
 *   console.error('Navigation failed:', event.error);
 * }
 */
function isNavigationError(e: unknown): e is NavigationError {
  if (isEvent(e)) return e.type === EventType.NavigationError;
  return false;
}
/**
 * Type guard that checks whether a router event is a `NavigationStart`.
 *
 * @param e - The event to test.
 * @returns True if the event is a `NavigationStart`, otherwise false.
 */
function isNavigationStart(e: unknown): e is NavigationStart {
  if (isEvent(e)) return e.type === EventType.NavigationStart;
  return false;
}
/**
 * External API for type guards.
 */
export {
  isActivationEnd,
  isComponentType,
  isDate,
  isNavigationEnd,
  isNavigationError,
  isNavigationStart,
  isNull,
  isNumber,
  isString,
  isTemplateRef
};

