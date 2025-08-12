import { computed, Directive, ElementRef, inject } from '@angular/core';
import { HTMLElementRef } from '@ngtw-kit/common/types';
import { ProgressState } from './_state';

@Directive({
  host: {
    '[attr.aria-label]': '"Progress Bar"',
    '[attr.aria-valuemax]': 'isIndeterminate() ? null : state.max()',
    '[attr.aria-valuemin]': 'isIndeterminate() ? null : state.min()',
    '[attr.aria-valuenow]': 'isIndeterminate() ?  null : valuenow()',
    '[attr.aria-valuetext]': 'isIndeterminate() ?  null : valuetext()',
    '[attr.data-progress-indeterminate]': 'isIndeterminate() ? "true" : null',
    '[attr.role]': '"progressbar"',
    '[style.width.px]': 'barwidth()',
  },
  selector: '[ngtwProgressBar]',
})
export class NgtwProgressBar {
  readonly nativeElement = inject<HTMLElementRef>(ElementRef).nativeElement;

  protected readonly state = ProgressState.consume();

  protected readonly isIndeterminate = computed(() => {
    return isNaN(this.state.value());
  });

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
    return this.multiplier() * this.state.progressRect().width;
  });
}
