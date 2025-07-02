import {
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { HTMLElementRef } from '@ngtw-kit/common/types';

@Directive({
  host: {
    '[class]': 'hostClasses()',
  },
  selector: '[ngtwProgress]',
})
export class NgtwProgress {
  protected readonly hostClasses = signal(
    'relative h-4 w-full overflow-hidden rounded-full bg-zinc-800 after:absolute after:inset-0 after:w-(--ngtw-progress) after:transform after:bg-zinc-300 after:transition-[width] after:will-change-[width]',
  );

  private readonly _defaultWidth = 0;
  private readonly _percentFull = 100;

  element = inject<HTMLElementRef>(ElementRef).nativeElement;

  value = input(this._defaultWidth, { alias: 'ngtwProgressValue' });

  progress = computed(() => {
    if (this.value() < this._defaultWidth) return `${this._defaultWidth}px`;
    const { offsetWidth } = this.element;
    const updated = (this.value() / this._percentFull) * offsetWidth;
    return `${updated}px`;
  });

  constructor() {
    this.element.style.setProperty('--ngtw-progress', this.progress());

    effect(() => {
      this.element.style.setProperty('--ngtw-progress', this.progress());
    });
  }
}
