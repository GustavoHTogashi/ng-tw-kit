import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgtwDate } from '@ngtw-kit/directives/date';
import { Page } from '../../components';

@Component({
  imports: [NgtwDate, Page, FormsModule],
  selector: 'sample-date',
  template: `
    <sample-page>
      <input ngtwDate [ngtwDateValue]="date()" placeholder="Enter date text" />
    </sample-page>
  `,
})
export default class DatePage {
  // date = signal(new Date(2024, 1, 2));
  // date = signal(1704070861000);
  date = signal('2025-12-01');

  // control = new FormControl(this.date());
  model = this.date;

  constructor() {
    // const timeout = setTimeout(() => {
    //   clearTimeout(timeout);
    //   const updatedDate = new Date();
    //   updatedDate.setFullYear(2023, 9, 1);
    //   this.date.set(updatedDate);
    // }, 2000);
  }
}
