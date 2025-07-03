import {
  computed,
  Directive,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { HTMLElementRef } from '@ngtw-kit/common/types';

@Directive({
  host: {
    '[attr.aria-valuemax]': 'max()',
    '[attr.aria-valuemin]': 'min()',
    '[attr.aria-valuenow]': 'currentValue()',
    '[class]': 'hostClass()',
    '[style.--ngtw-progress]': 'progress()',
    'role': 'progressbar',
  },
  selector: '[ngtwProgress]',
})
export class NgtwProgress {
  protected readonly hostClass = signal(
    'relative block h-4 w-full overflow-hidden rounded-full bg-zinc-800 after:absolute after:inset-0 after:w-(--ngtw-progress) after:bg-zinc-300 after:transition-[width] after:will-change-[width]',
  );

  private readonly _defaultMin = 0;
  private readonly _defaultMax = 100;

  nativeElement = inject<HTMLElementRef>(ElementRef).nativeElement;

  max = input(this._defaultMax, { alias: 'ngtwProgressMax' });
  min = input(this._defaultMin, { alias: 'ngtwProgressMin' });
  value = input(this._defaultMin, { alias: 'ngtwProgressValue' });

  currentValue = computed(() => { 
    const val = this.value();
    if (val < this._defaultMin) return this._defaultMin;
    if (val > this._defaultMax) return this._defaultMax;
    return val;
  })

  progress = computed(() => {
    const multiplier = this.currentValue() / this._defaultMax;
    return `${multiplier * this.nativeElement.offsetWidth}px`;
  });
}
