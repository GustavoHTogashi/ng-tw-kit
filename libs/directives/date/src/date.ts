import { Directive } from '@angular/core';

/**
 * Formats input as currency.
 */
@Directive({
  host: {
    '(input)': 'onInput($event)',
  },
  selector: '[ngtwDate]',
})
export class NgtwDate {
  onInput(event: Event): void {
    return;
  }
}
