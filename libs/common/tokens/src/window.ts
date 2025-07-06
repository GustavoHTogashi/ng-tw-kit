import { DOCUMENT, inject, InjectionToken } from '@angular/core';

export const NGTW_WINDOW = new InjectionToken<Window>('[NGTW_WINDOW]', {
  providedIn: 'root',
  factory: () => {
    const { defaultView } = inject(DOCUMENT);

    if (!defaultView) {
      throw new Error('No default view found in the document.');
    }

    return defaultView;
  },
});
