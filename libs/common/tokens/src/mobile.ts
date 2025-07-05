import { inject, InjectionToken } from '@angular/core';
import { NGTW_NAVIGATOR } from './navigator';

export const SUPPORTS_MULTITOUCH = new InjectionToken<boolean>(
  '[SUPPORTS_MULTITOUCH]',
  {
    providedIn: 'root',
    factory: () => {
      const { maxTouchPoints } = inject(NGTW_NAVIGATOR);

      // Check if the browser supports multitouch by checking the presence of touch events
      return maxTouchPoints > 1;
    },
  },
);
