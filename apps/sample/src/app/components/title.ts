import { Component } from '@angular/core';

@Component({
  host: {
    class: 'text-3xl font-bold',
  },
  selector: 'sample-title',
  template: ` <ng-content /> `,
})
export class Title {}
