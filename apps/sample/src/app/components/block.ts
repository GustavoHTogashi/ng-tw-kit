import { Component } from '@angular/core';

@Component({
  host: {
    class: 'flex flex-col gap-6',
  },
  selector: 'sample-block',
  template: ` <ng-content /> `,
})
export class Block {}
