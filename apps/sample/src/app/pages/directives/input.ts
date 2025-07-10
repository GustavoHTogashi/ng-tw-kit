import { Component } from '@angular/core';
import { NgtwInput } from '@ngtw-kit/directives/input';
import { Page } from '../../components';

@Component({
  imports: [NgtwInput, Page],
  selector: 'sample-input',
  template: `
    <sample-page>
      <input ngtwInput placeholder="Type here..." />
    </sample-page>
  `,
})
export default class Input {}
