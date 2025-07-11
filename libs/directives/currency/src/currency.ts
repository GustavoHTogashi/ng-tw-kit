import { Directive } from '@angular/core';
import { NgtwNumeric } from '@ngtw-kit/directives/numeric';

/**
 * Formats input as currency.
 */
@Directive({
  host: {
    '(input)': 'onInput($event)',
  },
  hostDirectives: [NgtwNumeric],
  selector: '[ngtwCurrency]',
})
export class NgtwCurrency {
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]+/g, ''); // Allow only numbers;
  }
}
