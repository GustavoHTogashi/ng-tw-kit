import { inject, InjectionToken } from '@angular/core';
import { NGTW_WINDOW } from './window';

export const NGTW_NAVIGATOR = new InjectionToken<Navigator>(
  '[NGTW_NAVIGATOR]',
  {
    providedIn: 'root',
    factory: () => {
      const { navigator } = inject(NGTW_WINDOW);
      if (!navigator) {
        throw new Error('No navigator found in the window.');
      }
      return navigator;
    },
  },
);

export const NGTW_SUPPORTS_MULTITOUCH = new InjectionToken<boolean>(
  '[NGTW_SUPPORTS_MULTITOUCH]',
  {
    providedIn: 'root',
    factory: () => {
      const { maxTouchPoints } = inject(NGTW_NAVIGATOR);
      // Check if the browser supports multitouch by checking the presence of touch events
      return maxTouchPoints > 1;
    },
  },
);
