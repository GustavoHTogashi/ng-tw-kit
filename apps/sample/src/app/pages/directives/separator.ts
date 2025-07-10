import { Component } from '@angular/core';
import { NgtwSeparator } from '@ngtw-kit/directives/separator';
import { Page } from '../../components';

@Component({
  imports: [NgtwSeparator, Page],
  selector: 'sample-separator',
  template: `
    <sample-page>
      <div ngtwSeparator></div>
    </sample-page>
  `,
})
export default class Separator {}
