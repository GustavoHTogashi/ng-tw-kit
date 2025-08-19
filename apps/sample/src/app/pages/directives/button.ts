import { Component } from '@angular/core';
import { NgtwButton } from '@ngtw-kit/directives/button';
import { Page } from '../../components';

@Component({
  imports: [NgtwButton, Page],
  selector: 'sample-button',
  template: `
    <sample-page>
      <button ngtwButton>Click Me</button>
    </sample-page>
  `,
})
export default class Button {}
