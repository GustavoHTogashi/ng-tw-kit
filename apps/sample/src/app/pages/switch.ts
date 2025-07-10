import { Component } from '@angular/core';
import { NgtwSwitch } from '@ngtw-kit/directives/switch';
import { Page } from '../components';

@Component({
  imports: [NgtwSwitch, Page],
  selector: 'sample-switch',
  template: `
    <sample-page>
      <input ngtwSwitch />
    </sample-page>
  `,
})
export default class Switch {}
