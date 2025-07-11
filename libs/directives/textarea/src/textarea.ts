import { Directive } from '@angular/core';

/**
 * Directive to handle numeric input.
 */
@Directive({
  host: {
    '(input)': 'onInput($event)',
  },
  selector: '[ngtwTextarea]',
})
export class NgtwTextarea {
  onInput(event: Event): void {
    return;
  }
}
