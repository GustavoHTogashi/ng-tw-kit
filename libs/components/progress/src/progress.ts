import { Component } from '@angular/core';
import { NgtwProgress, NgtwProgressBar } from '@ngtw-kit/directives/progress';

@Component({
  selector: 'ngtw-progress',
  hostDirectives: [
    {
      directive: NgtwProgress,
      inputs: ['ngtwProgressValue', 'ngtwProgressMax', 'ngtwProgressMin'],
    },
  ],
  imports: [
    NgtwProgressBar,
    // NgtwProgress
  ],
  template: `
    <!-- <div
      ngtwProgress
      [ngtwProgressValue]="value()"
      [ngtwProgressMax]="max()"
      [ngtwProgressMin]="min()"
    > -->
    <div ngtwProgressBar></div>
    <!-- </div> -->
  `,
})
export class NgtwProgressComponent {
  // value = input(25);
  // max = input(100);
  // min = input(0);
}
