import { Directive } from '@angular/core';

/**
 * Restricts input to alphabetic characters (letters only).
 */
@Directive({
  host: {
    '(input)': 'onInput($event)',
    '(keydown)': 'onKeydown($event)',
  },
  selector: 'input[ngtwAlphabetic]',
})
export class NgtwAlphabetic {
  onInput(event: Event): void {
    const inputEvent = event as InputEvent;
    console.log({ inputData: inputEvent.data });
    if (inputEvent.isComposing && inputEvent.data) return;
    const input = inputEvent.target as HTMLInputElement;
    input.value = input.value.replace(/[^\p{L}]+/gu, ''); // Allow only letters, including accented letters
  }

  onKeydown(event: KeyboardEvent): void {
    console.log('Keydown event:', event.code, event.key);
  }
}
