import { Route } from '@angular/router';
import { addAppNamePrefix, captitalize } from './utils/string';

const directories = [
  'components_progress',
  'directives_alphabetic',
  'directives_alphanumeric',
  'directives_button',
  'directives_currency',
  'directives_date',
  'directives_dropzone',
  'directives_input',
  'directives_label',
  'directives_numeric',
  'directives_one-time-code',
  'directives_progress',
  'directives_separator',
  'directives_slider',
  'directives_switch',
  'directives_tabs',
  'directives_textarea',
  'directives_toggle',
];

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
  {
    path: 'home',
    loadComponent: () => import('./pages/home'),
    title: addAppNamePrefix('Home'),
  },
  ...directories.map((path) => {
    const [directory, page] = path.split('_');
    return {
      data: { tag: captitalize(directory) },
      loadComponent: () => import(`./pages/${directory}/${page}`),
      path,
      title: addAppNamePrefix(captitalize(path.replace(`${directory}_`, ''))),
    };
  }),
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
