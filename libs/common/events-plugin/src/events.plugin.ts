/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { Provider } from '@angular/core';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { debounce, throttle } from '@ngtw-kit/common/toolkit';
import { NgtwBasePlugin } from './_base';
import {
  NGTW_EVENTS_PLUGIN_CONFIG,
  NGTW_EVENTS_PLUGIN_DELAY,
  NGTW_EVENTS_PLUGIN_SEPARATOR,
  NGTW_EVENTS_PLUGIN_VALID_MODIFIERS,
} from './_data';
import { NgtwEventsPluginConfig } from './_type';
import { Log } from '@ngtw-kit/common/core';

export function provideNgtwEventsPlugin(
  config?: NgtwEventsPluginConfig,
): Provider[] {
  return [
    {
      provide: NGTW_EVENTS_PLUGIN_CONFIG,
      useFactory: () => ({
        separator: config?.separator ?? NGTW_EVENTS_PLUGIN_SEPARATOR,
        delay: config?.delay ?? NGTW_EVENTS_PLUGIN_DELAY,
        validModifiers:
          config?.validModifiers ?? NGTW_EVENTS_PLUGIN_VALID_MODIFIERS,
      }),
    },
    {
      multi: true,
      provide: EVENT_MANAGER_PLUGINS,
      useClass: NgtwEventsPlugin,
    },
  ];
}

class NgtwEventsPlugin extends NgtwBasePlugin {
  private _wrapHandler(
    eventModifiers: string,
    handler: Function,
  ): (event: Event) => void {
    let wrappedHandler = (event: Event) => handler(event);

    if (eventModifiers.includes('debounce')) {
      const prevHandler = wrappedHandler;
      const match = eventModifiers.match(/debounce-?(\d+)?/);
      const time = match && match[1] ? +match[1] : this.delay;
      wrappedHandler = debounce(prevHandler, time);
    }
    if (eventModifiers.includes('throttle')) {
      const prevHandler = wrappedHandler;
      const match = eventModifiers.match(/throttle-?(\d+)?/);
      const time = match && match[1] ? +match[1] : this.delay;
      wrappedHandler = throttle(prevHandler, time);
    }
    if (eventModifiers.includes('prevent')) {
      const prevHandler = wrappedHandler;
      wrappedHandler = (event) => {
        event.preventDefault();
        prevHandler(event);
      };
    }
    if (eventModifiers.includes('self')) {
      const prevHandler = wrappedHandler;
      wrappedHandler = (event) => {
        if (event.target !== event.currentTarget) return;
        prevHandler(event);
      };
    }
    if (eventModifiers.includes('stop')) {
      const prevHandler = wrappedHandler;
      wrappedHandler = (event) => {
        event.stopPropagation();
        prevHandler(event);
      };
    }
    if (eventModifiers.includes('stopimmediate')) {
      const prevHandler = wrappedHandler;
      wrappedHandler = (event) => {
        event.stopImmediatePropagation();
        prevHandler(event);
      };
    }
    return wrappedHandler;
  }

  addEventListener(
    element: HTMLElement,
    eventName: string,
    handler: Function,
  ): Function {
    // Given the eventName, resolve the name of the event and modifiers applied to it
    const [name, extra, modifiers] = this.resolveNameModifiers(eventName);

    // Wrap the handler to apply modifiers like debounce, throttle, prevent, etc.
    const wrappedHandler = this._wrapHandler(modifiers, handler);

    const nameWithExtra = extra ? name + this.separator + extra : name;
    Log.info('EVENTS_PLUGIN:', `Event: ${nameWithExtra}, Modifiers: ${modifiers}`);

    const removeEventListener = this.manager.addEventListener(
      element,
      nameWithExtra,
      wrappedHandler,
      {
        capture: modifiers.includes('capture'),
        passive: modifiers.includes('passive'),
        once: modifiers.includes('once'),
      },
    );

    // Returns a function to remove the event listener
    return () => {
      removeEventListener();
    };
  }
}
