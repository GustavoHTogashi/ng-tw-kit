import { Directive } from '@angular/core';

/**
 * Directive to handle numeric input.
 */
@Directive({
  host: {
    '(input)': 'onInput($event)',
  },
  selector: '[ngtwToggle]',
})
export class NgtwToggle {
  onInput(event: Event): void {
    return;
  }
}
