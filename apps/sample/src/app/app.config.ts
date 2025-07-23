import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideCheckNoChangesConfig,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
  withViewTransitions,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideNgtwEventsPlugin } from '@ngtw-kit/common/events-plugin';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideCheckNoChangesConfig({ exhaustive: true, interval: 10000 }),
    provideRouter(
      appRoutes,
      withViewTransitions(),
      withPreloading(PreloadAllModules),
    ),

    provideNgtwEventsPlugin(), // Ensure this is imported from the correct path
  ],
};
