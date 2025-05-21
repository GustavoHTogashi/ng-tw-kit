import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-tw-input',
  imports: [CommonModule],
  template: `<input type="text" class="ngtw:border ngtw:border-gray-300 ngtw:rounded-md ngtw:p-2" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {}
