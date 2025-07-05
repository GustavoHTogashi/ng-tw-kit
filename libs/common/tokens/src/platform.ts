import { inject, InjectionToken } from '@angular/core';
import { NGTW_NAVIGATOR } from './navigator';

/**
 * @deprecated
 * @see [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/platform)
 */
export const NGTW_PLATFORM = new InjectionToken<string>('[NGTW_PLATFORM]', {
  providedIn: 'root',
  factory: () => {
    const { platform } = inject(NGTW_NAVIGATOR);

    if (!platform) {
      throw new Error('No platform found in navigator.');
    }

    return platform;
  },
});
