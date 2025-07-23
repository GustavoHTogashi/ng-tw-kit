import { inject, InjectionToken } from '@angular/core';
import { NGTW_NAVIGATOR } from './navigator';

export const NGTW_CLIPBOARD = new InjectionToken<Clipboard>('NGTW_CLIPBOARD', {
  providedIn: 'root',
  factory: () => {
    const { clipboard } = inject(NGTW_NAVIGATOR);

    if (!clipboard) {
      throw new Error('Clipboard API is not supported in this environment.');
    }

    return clipboard;
  },
});
