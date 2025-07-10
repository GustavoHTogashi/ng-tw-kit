import { Route } from '@angular/router';
import { addAppNamePrefix, captitalize } from './utils/string';

const directives = [
  'home',
  'button',
  'input',
  'label',
  'one-time-code',
  'progress',
  'separator',
  'switch',
  'tabs',
];

// const common = ['core', 'di', 'tokens', 'toolkit', 'type-guards', 'types'];

type AppRoute = Route & {
  data?: {
    tag: string;
  };
};

export const appRoutes: AppRoute[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  // ...common.map((path) => ({
  //   data: { tag: 'common' },
  //   loadComponent: () => import(`./pages/common/${path}`),
  //   path,
  //   title: addAppNamePrefix(captitalize(path)),
  // })),
  ...directives.map((path) => ({
    data: { tag: 'Directives' },
    loadComponent: () => import(`./pages/directives/${path}`),
    path,
    title: addAppNamePrefix(captitalize(path)),
  })),
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
