import {
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  Renderer2,
  signal,
} from '@angular/core';
import { HTMLElementRef } from '@ngtw-kit/common/types';
import { DropzoneState } from './_state';
import { NgtwDropzoneUnit } from './_type';

const BYTE = Math.pow(1024, 0); // 1
const KILOBYTE = Math.pow(1024, 1); // 1024
const MEGABYTE = Math.pow(1024, 2); // 1048576
const GIGABYTE = Math.pow(1024, 3); // 1073741824
const TERABYTE = Math.pow(1024, 4); // 1099511627776

const Units: Record<NgtwDropzoneUnit, number> = {
  b: BYTE,
  kb: KILOBYTE,
  mb: MEGABYTE,
  gb: GIGABYTE,
  tb: TERABYTE,
};

@Directive({
  exportAs: 'ngtwDropzoneSizeInfo',
  host: {
    '[class]': 'hostClass()',
    'aria-label': 'Max size',
  },
  selector: '[ngtwDropzoneSizeInfo]',
})
export class NgtwDropzoneSizeInfo {
  readonly element = inject<HTMLElementRef>(ElementRef).nativeElement;
  readonly renderer = inject(Renderer2);

  protected readonly state = DropzoneState.consume();

  protected readonly hostClass = signal(
    'text-2xs text-end font-semibold text-zinc-600',
  );

  fileSize = computed(() => {
    const [size, unit] = this.state.fileSize().split(/(\D+)/);
    const roundedSize = (+size).toFixed(2);
    return `${roundedSize} ${unit}`;
  });

  used = computed(() => {
    const unit = this.state.maxSize().split(/(\D+)/).at(1) as NgtwDropzoneUnit;
    const multiplier = Units[unit] || 1;
    const converted = this.state.usedSize() / multiplier;
    const roundedSize = converted.toFixed(2);
    return `${roundedSize} ${unit}`;
  });

  max = computed(() => {
    const [size, unit] = this.state.maxSize().split(/(\D+)/);
    const roundedSize = (+size).toFixed(2);
    return `${roundedSize} ${unit}`;
  });

  constructor() {
    effect(() => {
      this.renderer.setProperty(
        this.element,
        'textContent',
        `File size: ${this.fileSize()} | Used ${this.used()} of ${this.max()}`,
      );
    });
  }
}
