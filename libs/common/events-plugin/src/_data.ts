import { InjectionToken } from '@angular/core';
import { Modifiers, NgtwEventsPluginConfig } from './_type';

export const NGTW_EVENTS_PLUGIN_CONFIG =
  new InjectionToken<NgtwEventsPluginConfig>('[NGTW_EVENTS_PLUGIN_CONFIG]');

export const NGTW_EVENTS_PLUGIN_SEPARATOR = '.';

export const NGTW_EVENTS_PLUGIN_DELAY = 300;

export const NGTW_EVENTS_PLUGIN_VALID_MODIFIERS: Modifiers = [
  'capture',
  'debounce',
  'once',
  'passive',
  'prevent',
  'self',
  'stopimmediate',
  'stop',
  'throttle',
];
