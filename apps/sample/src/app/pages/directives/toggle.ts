import { Component } from '@angular/core';
import { NgtwToggle } from '@ngtw-kit/directives/toggle';
import { Page } from '../../components';

@Component({
  imports: [NgtwToggle, Page],
  selector: 'sample-toggle',
  template: `
    <sample-page>
      <input ngtwToggle placeholder="Enter toggle text" />
    </sample-page>
  `,
})
export default class Toggle {}
