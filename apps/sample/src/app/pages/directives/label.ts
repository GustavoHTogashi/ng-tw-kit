import { Component } from '@angular/core';
import { NgtwLabel } from '@ngtw-kit/directives/label';
import { Page } from '../../components';

@Component({
  imports: [NgtwLabel, Page],
  selector: 'sample-label',
  template: `
    <sample-page>
      <label ngtwLabel for="input"> Label </label>
    </sample-page>
  `,
})
export default class Label {}
