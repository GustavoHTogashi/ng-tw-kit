import { Component, signal } from '@angular/core';
import { NgtwProgress } from '@ngtw-kit/directives/progress';
import { Page } from '../components';

@Component({
  imports: [NgtwProgress, Page],
  selector: 'sample-progress',
  template: `
    <sample-page>
      <div ngtwProgress [ngtwProgress]="progress()"></div>
    </sample-page>
  `,
})
export default class Progress {
  protected readonly progress = signal(20);
}
