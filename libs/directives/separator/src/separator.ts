import { computed, Directive, input } from '@angular/core';
import { NgtwSeparatorOrientation } from './_type';

@Directive({
  host: {
    '[class]': 'hostClass()',
    '[style.--ngtw-separator-color]': 'separatorColor()',
  },
  selector: '[ngtwSeparator]',
})
export class NgtwSeparator {
  readonly hostClass = computed(() => {
    return {
      horizontal: 'block h-0.5 w-full bg-(--ngtw-separator-color)',
      vertical: 'block h-full w-0.5 bg-(--ngtw-separator-color)',
    }[this.orientation()];
  });

  orientation = input<NgtwSeparatorOrientation>('horizontal');

  separatorColor = input<string>('var(--color-zinc-800)', {
    alias: 'ngtwSeparatorColor',
  });
}
