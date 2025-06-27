import { inject, InjectionToken } from '@angular/core';
import { NGTW_WINDOW } from './window';

export const NGTW_NAVIGATOR = new InjectionToken<Navigator>('[NAVIGATOR]', {
  providedIn: 'root',
  factory: () => {
    const { navigator } = inject(NGTW_WINDOW);

    if (!navigator) {
      throw new Error('No navigator found in the window.');
    }

    return navigator;
  },
});
