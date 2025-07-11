import { Directive } from '@angular/core';

/**
 * Restricts input to alphanumeric characters (letters and numbers only).
 */
@Directive({
  host: {
    '(input)': 'onInput($event)',
  },
  selector: 'input[ngtwAlphanumeric]',
})
export class NgtwAlphanumeric {
  onInput($event: Event) {
    const element = $event.target as HTMLInputElement;
    element.value = element.value.replace(/[^0-9A-Za-zÀ-ÖØ-öø-ÿ]+/g, '');
  }
}
