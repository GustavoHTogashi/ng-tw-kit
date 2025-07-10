import { Directive, signal } from '@angular/core';

@Directive({
  host: {
    '[class]': 'hostClass()',
  },
  selector: 'label[ngtwLabel]',
})
export class NgtwLabel {
  protected readonly hostClass = signal('inline-block leading-none text-current');
}
