import { Component } from '@angular/core';
import { NgtwNumeric } from '@ngtw-kit/directives/numeric';
import { Page } from '../../components';

@Component({
  imports: [NgtwNumeric, Page],
  selector: 'sample-numeric',
  template: `
    <sample-page>
      <input ngtwNumeric placeholder="Enter numeric text" />
    </sample-page>
  `,
})
export default class Numeric {}
