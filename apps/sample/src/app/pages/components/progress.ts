import { Component, OnDestroy, signal } from '@angular/core';
import { NgtwProgressComponent } from '@ngtw-kit/components/progress';
import { Page } from '../../components';

@Component({
  imports: [Page, NgtwProgressComponent],
  selector: 'sample-progress',
  template: `
    <sample-page>
      <ngtw-progress [ngtwProgressValue]="progressValue()" />
    </sample-page>
  `,
})
export default class Progress implements OnDestroy {
  protected readonly progressValue = signal(20);

  interval: number;

  constructor() {
    this.interval = setInterval(() => {
      this.progressValue.set(Math.floor(Math.random() * 100));
    }, 2000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
