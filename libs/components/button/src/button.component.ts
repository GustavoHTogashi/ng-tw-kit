import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonDirective } from './button.directive';

@Component({
  selector: 'ng-tw-button',
  imports: [ButtonDirective],
  template: `
    <button
      ngTwButton
      type="button"
    >
      <ng-content />
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {}
