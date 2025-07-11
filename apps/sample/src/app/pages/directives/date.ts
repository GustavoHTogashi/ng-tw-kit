import { Component } from '@angular/core';
import { NgtwDate } from '@ngtw-kit/directives/date';
import { Page } from '../../components';

@Component({
  imports: [NgtwDate, Page],
  selector: 'sample-date',
  template: `
    <sample-page>
      <input ngtwDate placeholder="Enter date text" />
    </sample-page>
  `,
})
export default class Date {}
