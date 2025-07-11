import { Directive } from '@angular/core';

/**
 * Directive to handle numeric input.
 */
@Directive({
  host: {
    '(input)': 'onInput($event)',
  },
  selector: '[ngtwSlider]',
})
export class NgtwSlider {
  onInput(event: Event): void {
    return;
  }
}
