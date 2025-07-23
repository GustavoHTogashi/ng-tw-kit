import { InjectionToken, WritableSignal } from '@angular/core';
import { consumeState, createState, provideState } from '@ngtw-kit/common/core';
import { NgtwDropzoneState } from './_type';

export const NGTW_DROPZONE_STATE = new InjectionToken<
  WritableSignal<NgtwDropzoneState>
>('[NGTW_DROPZONE_STATE]');

export const consumeDropzoneState = consumeState(NGTW_DROPZONE_STATE);

export const createDropzoneState = createState(NGTW_DROPZONE_STATE);

export const provideDropzoneState = provideState(NGTW_DROPZONE_STATE);
