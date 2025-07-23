import {
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  Renderer2,
  signal,
} from '@angular/core';
import { consumeDropzoneState } from './_state';
import { HTMLElementRef } from '@ngtw-kit/common/types';

@Directive({
  exportAs: 'ngtwDropzoneAcceptInfo',
  host: {
    '[class]': 'hostClass()',
    'aria-label': 'Accepted file types',
  },
  selector: '[ngtwDropzoneAcceptInfo]',
})
export class NgtwDropzoneAcceptInfo {
  readonly element = inject<HTMLElementRef>(ElementRef).nativeElement;
  readonly renderer = inject(Renderer2);

  protected readonly state = consumeDropzoneState();

  protected readonly hostClass = signal(
    'text-2xs text-end font-bold text-zinc-600',
  );

  acceptedTypes = computed(() => {
    return this.state
      .accept()
      .split(',')
      .map((type) => {
        const [mimeType, mimeSubtype] = type.trim().split('/');
        if (mimeType === '*' && mimeSubtype === '*') return 'any file type';
        if (mimeSubtype === '*') return `any ${mimeType}`;
        const [extension] = mimeSubtype.split(/[^\w]/);
        if (mimeSubtype) return `.${extension}`;
        return type.trim();
      })
      .join('|');
  });

  constructor() {
    effect(() => {
      this.renderer.setProperty(
        this.element,
        'textContent',
        `Accepts: ${this.acceptedTypes()}`,
      );
    });
  }
}
