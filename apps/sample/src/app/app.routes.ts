import { Route } from '@angular/router';
import { memoize } from '@ngtw-kit/utils/memoize';

export const appName = 'Ngtw Kit';

const _routeTitle = (title: string): string =>
  title ? `${appName} ${title}` : appName;
const routeTitle = memoize(_routeTitle);

const _stripAppName = (title: string): string =>
  title.replace(`${appName}`, '').trim();
export const stripAppName = memoize(_stripAppName);

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'test',
  },
  {
    loadComponent: () => import('./pages/test'),
    path: 'test',
    title: routeTitle('Test'),
  },
  {
    loadComponent: () => import('./pages/home'),
    path: 'home',
    title: routeTitle('Home'),
  },
  {
    loadComponent: () => import('./pages/button'),
    path: 'button',
    title: routeTitle('Button'),
  },
  {
    loadComponent: () => import('./pages/input'),
    path: 'input',
    title: routeTitle('Input'),
  },
  {
    loadComponent: () => import('./pages/progress'),
    path: 'progress',
    title: routeTitle('Progress'),
  },
  {
    loadComponent: () => import('./pages/switch'),
    path: 'switch',
    title: routeTitle('Switch'),
  },
  {
    loadComponent: () => import('./pages/tabs'),
    path: 'tabs',
    title: routeTitle('Tabs'),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
