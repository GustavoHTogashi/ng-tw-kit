import { EventType, NavigationError, NavigationStart } from '@angular/router';
import type { ActivationEnd, Event, NavigationEnd } from '@angular/router';

export function isNavigationEnd(event: Event): event is NavigationEnd {
  return event.type === EventType.NavigationEnd;
}

export function isNavigationStart(event: Event): event is NavigationStart {
  return event.type === EventType.NavigationStart;
}

export function isNavigationError(event: Event): event is NavigationError {
  return event.type === EventType.NavigationError;
}

export function isActivationEnd(event: Event): event is ActivationEnd {
  return event.type === EventType.ActivationEnd;
}
