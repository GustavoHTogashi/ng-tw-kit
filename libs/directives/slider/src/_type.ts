import { Signal, WritableSignal } from '@angular/core';

export type NgtwSliderState = {
  calculateValue: (x: number) => number;
  max: WritableSignal<number>;
  min: WritableSignal<number>;
  moveThumb: (event: Event) => void;
  sliderRect: WritableSignal<DOMRect>;
  sliderThumbX: Signal<string>;
  value: WritableSignal<number>;
};
