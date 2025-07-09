import { Directive } from '@angular/core';

/**
 * Restricts input to alphanumeric characters (A-Z, a-z, 0-9).
 */
@Directive({
  host: {
    '(input)': 'processInput($event)',
  },
  selector: 'input[ngtwAlphanumeric]',
})
export class NgtwAlphanumeric {
  processInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  }
}
