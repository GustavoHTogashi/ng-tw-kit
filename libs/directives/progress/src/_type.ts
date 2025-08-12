import { WritableSignal } from '@angular/core';

export type NgtwProgressState = {
  max: WritableSignal<number>;
  min: WritableSignal<number>;
  progressRect: WritableSignal<DOMRect>;
  value: WritableSignal<number>;
};
