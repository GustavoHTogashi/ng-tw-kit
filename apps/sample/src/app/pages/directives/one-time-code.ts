import { Component } from '@angular/core';
import {
  NgtwOneTimeCode,
  NgtwOneTimeCodeDigit,
} from '@ngtw-kit/directives/one-time-code';
import { Page } from '../../components';
import { Log } from '@ngtw-kit/common/core';

@Component({
  imports: [NgtwOneTimeCode, NgtwOneTimeCodeDigit, Page],
  selector: 'sample-one-time-code',
  template: `
    <sample-page>
      <div
        (complete)="onComplete($event)"
        ngtwOneTimeCode
      >
        <input ngtwOneTimeCodeDigit />
        <input ngtwOneTimeCodeDigit />
        <input ngtwOneTimeCodeDigit />
        <input ngtwOneTimeCodeDigit />
      </div>
    </sample-page>
  `,
})
export default class OneTime {
  onComplete(value: string): void {
    Log.debug('One Time Code', 'One Time Code Complete:', value);
  }
}
