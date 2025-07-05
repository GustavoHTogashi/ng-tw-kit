import { InjectionToken, WritableSignal } from '@angular/core';
import { NgtwTabsetState } from './_type';
import { createState, provideState } from '@ngtw-kit/common/di';

export const NGTW_TABS_STATE = new InjectionToken<
  WritableSignal<NgtwTabsetState>
>('ngtwTabsState');

export const provideTabsetState = provideState(NGTW_TABS_STATE);

export const createTabsetState = createState(NGTW_TABS_STATE);