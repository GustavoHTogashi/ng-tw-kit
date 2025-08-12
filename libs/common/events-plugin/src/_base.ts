import { inject } from '@angular/core';
import { EventManagerPlugin } from '@angular/platform-browser';
import {
  NGTW_EVENTS_PLUGIN_CONFIG,
  NGTW_EVENTS_PLUGIN_DELAY,
  NGTW_EVENTS_PLUGIN_SEPARATOR,
  NGTW_EVENTS_PLUGIN_VALID_MODIFIERS,
} from './_data';

export abstract class NgtwBasePlugin extends EventManagerPlugin {
  config = inject(NGTW_EVENTS_PLUGIN_CONFIG, { optional: true });

  protected readonly validModifiers =
    this.config?.validModifiers ?? NGTW_EVENTS_PLUGIN_VALID_MODIFIERS;

  protected readonly separator =
    this.config?.separator ?? NGTW_EVENTS_PLUGIN_SEPARATOR;

  protected readonly delay = this.config?.delay ?? NGTW_EVENTS_PLUGIN_DELAY;

  supports(eventName: string): boolean {
    return this.validModifiers.some((validModifier) => {
      return eventName.includes(validModifier);
    });
  }

  protected resolveNameModifiers(
    eventName: string,
  ): [name: string, extra: string, modifiers: string] {
    const [name, ...rest] = eventName.split(this.separator);
    const modifiers = rest
      .filter((modifier) => {
        return this.validModifiers.some((validModifier) => {
          return modifier.includes(validModifier);
        });
      })
      .join(this.separator);

    const extra = rest
      .filter((modifier) => {
        return !this.validModifiers.some((validModifier) => {
          return modifier.includes(validModifier);
        });
      })
      .join(this.separator);
    return [name, extra, modifiers];
  }
}
