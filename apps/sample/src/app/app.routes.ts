import { Route } from '@angular/router';
import { addAppNamePrefix, captitalize } from './utils/string';

const paths = [
  'home',
  'button',
  'input',
  'label',
  'one-time-code',
  'progress',
  'separator',
  'switch',
  'tabs',
]

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  ...paths.map((path) => ({
    loadComponent: () => import(`./pages/${path}`),
    path,
    title: addAppNamePrefix(captitalize(path)),
  })),
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
