import { Pipe, PipeTransform } from '@angular/core';
import { APP_NAME } from '../data/global';
import { memoize } from '@ngtw-kit/common/toolkit';

const APP_NAME_PREFIX = `${APP_NAME} - `;

const _removeAppNamePrefix = (title: string) =>
  title.replace(APP_NAME_PREFIX, '');

export const removeAppNamePrefix = memoize(_removeAppNamePrefix);

const _addAppNamePrefix = (title: string) => `${APP_NAME_PREFIX}${title}`;

export const addAppNamePrefix = memoize(_addAppNamePrefix);

const _captitalize = (str: string) =>
  str
    .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase())
    .replace(/[-_]+(.)/g, (_, c) => ' ' + c.toUpperCase());

export const captitalize = memoize(_captitalize);

@Pipe({
  name: 'removeAppNamePrefix',
  pure: true,
})
export class RemoveAppNamePrefixPipe implements PipeTransform {
  transform(title: string): string {
    return _removeAppNamePrefix(title);
  }
}
