import { Directive } from '@angular/core';

@Directive({
  selector: 'input[ngTwInput]',
  host: {
    class: 'ngtw:border ngtw:border-gray-300 ngtw:rounded-md p-2',
  }
})
export class InputDirective {
}
