import { Component } from '@angular/core';
import { NgtwLabel } from '@ngtw-kit/directives/label';
import { Page } from '../../components';
import { NgtwInput } from '@ngtw-kit/directives/input';

@Component({
  imports: [NgtwLabel, Page, NgtwInput],
  selector: 'sample-label',
  template: `
    <sample-page>
      <label ngtwLabel for="input">
        Label
        <input ngtwInput type="text" id="input" />
      </label>
    </sample-page>
  `,
})
export default class Label {}
