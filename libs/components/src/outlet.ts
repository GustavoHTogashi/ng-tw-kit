import { Component, effect, viewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'ngtw-outlet',
  template: `<ng-template #template />`,
})
export class NgtwOutlet {
  viewContainerRef = viewChild('template', { read: ViewContainerRef });

  constructor() {
    effect(() => {
      // console.log(this.viewContainerRef());
    });
  }
}
