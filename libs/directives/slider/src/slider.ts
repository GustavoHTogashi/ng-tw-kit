import {
  AfterViewInit,
  computed,
  Directive,
  ElementRef,
  inject,
  input,
  linkedSignal,
  model
} from '@angular/core';
import { unsignedNumberAttribute } from '@ngtw-kit/common/core';
import { ElRef } from '@ngtw-kit/common/types';
import { SliderState } from './_state';

@Directive({
  host: {
    '[attr.aria-label]': '"Slider"',
    '(click.stop.self)': 'state.moveThumb($event)',
  },
  providers: [SliderState.provide()],
  selector: '[ngtwSlider]',
})
export class NgtwSlider implements AfterViewInit {
  readonly element = inject<ElRef>(ElementRef).nativeElement;

  max = input(100, {
    alias: 'ngtwSliderMax',
    transform: unsignedNumberAttribute,
  });

  min = input(0, {
    alias: 'ngtwSliderMin',
    transform: unsignedNumberAttribute,
  });

  value = model(0, {
    alias: 'ngtwSliderValue',
  });

  protected readonly state = SliderState.create({
    value: this.value,
    min: linkedSignal(this.min),
    max: linkedSignal(this.max),
    sliderThumbX: computed(() => {
      const ratio = this.value() / this.max();
      const xPosition = ratio * this.element.offsetWidth;
      return `${xPosition}px`;
    }),
    calculateValue: (x: number) => {
      const { left, right } = this.state.sliderRect();
      const range = right - left;
      const part = x - left;
      return (part / range) * 100;
    },
    moveThumb: (event: Event) => {
      const { x } = event as MouseEvent;
      this.value.set(this.state.calculateValue(x));
    },
  });

  ngAfterViewInit(): void {
    this.state.sliderRect.set(this.element.getBoundingClientRect());
  }
}
