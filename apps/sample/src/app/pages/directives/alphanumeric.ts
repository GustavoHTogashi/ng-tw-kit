import { Component } from '@angular/core';
import { NgtwAlphanumeric } from '@ngtw-kit/directives/alphanumeric';
import { Page } from '../../components';

@Component({
  imports: [NgtwAlphanumeric, Page],
  selector: 'sample-alphanumeric',
  template: `
    <sample-page>
      <input
        ngtwAlphanumeric
        placeholder="Enter alphanumeric text"
        maxlength="32"
      />
    </sample-page>
  `,
})
export default class Alphanumeric {}
