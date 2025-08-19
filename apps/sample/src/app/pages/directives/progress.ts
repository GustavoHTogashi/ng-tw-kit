import { Component, OnDestroy, signal } from '@angular/core';
import { NgtwProgress, NgtwProgressBar } from '@ngtw-kit/directives/progress';
import { Page } from '../../components';

@Component({
  imports: [Page, NgtwProgress, NgtwProgressBar],
  selector: 'sample-progress',
  template: `
    <sample-page>
      <div ngtwProgress [ngtwProgressValue]="progressValue()">
        <div ngtwProgressBar></div>
      </div>
    </sample-page>
  `,
})
export default class Progress implements OnDestroy {
  protected readonly progressValue = signal(33);

  interval: number;

  constructor() {
    this.interval = setInterval(() => {
      this.progressValue.set(Math.floor(Math.random() * 100));
    }, 2000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    return;
  }
}
