import { computed, Directive, ElementRef, inject } from '@angular/core';
import { SliderState } from './_state';
import { HTMLElementRef } from '@ngtw-kit/common/types';

@Directive({
  host: {
    '[attr.aria-label]': '"Slider Bar"',
    '[attr.role]': '"presentation"',
    '[style.width.px]': 'barwidth()',
    '(click.stop.self)': 'state.moveThumb($event)',
  },
  selector: '[ngtwSliderBar]',
})
export class NgtwSliderBar {
  readonly element = inject<HTMLElementRef>(ElementRef).nativeElement;

  protected readonly state = SliderState.consume();

  protected readonly valuenow = computed(() => {
    if (this.state.value() < this.state.min()) return this.state.min();
    if (this.state.value() > this.state.max()) return this.state.max();
    return this.state.value();
  });

  protected readonly valuetext = computed(() => {
    return `${this.state.value()} of ${this.state.max()}`;
  });

  protected readonly multiplier = computed(() => {
    return (this.valuenow() ?? 0) / this.state.max();
  });

  protected readonly barwidth = computed(() => {
    return this.multiplier() * this.state.sliderRect().width;
  });
}
