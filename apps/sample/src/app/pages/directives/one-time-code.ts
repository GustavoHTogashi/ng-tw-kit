import { Component } from '@angular/core';
import {
  NgtwOneTimeCode,
  NgtwOneTimeCodeDigit,
} from '@ngtw-kit/directives/one-time-code';
import { Page } from '../../components';

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
    console.log('One Time Code Complete:', value);
  }
}
