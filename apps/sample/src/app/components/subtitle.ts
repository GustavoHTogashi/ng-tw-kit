import { Component } from '@angular/core';

@Component({
  host: {
    class: 'text-xl font-semibold',
  },
  selector: 'sample-subtitle',
  template: ` <ng-content /> `,
})
export class Subtitle {}
