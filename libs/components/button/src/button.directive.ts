import { Directive } from '@angular/core';

@Directive({
  selector: 'button[ngTwButton]',
  host: {
    class: 'ngtw:bg-blue-500 ngtw:hover:bg-blue-700 ngtw:text-white ngtw:font-bold ngtw:py-2 ngtw:px-4 ngtw:rounded',
  }
})
export class ButtonDirective {}
