import { Component } from '@angular/core';
import { NgtwTextarea } from '@ngtw-kit/directives/textarea';
import { Page } from '../../components';

@Component({
  imports: [NgtwTextarea, Page],
  selector: 'sample-textarea',
  template: `
    <sample-page>
      <input ngtwTextarea placeholder="Enter textarea text" />
    </sample-page>
  `,
})
export default class Textarea {}
