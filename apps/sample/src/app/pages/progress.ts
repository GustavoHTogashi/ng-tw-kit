import { Component, signal } from '@angular/core';
import { NgtwProgress } from '@ngtw-kit/directives/progress';
import { Page } from '../components';
import { NgtwInput } from '@ngtw-kit/directives/input';

@Component({
  imports: [NgtwProgress, Page, NgtwInput],
  selector: 'sample-progress',
  template: `
    <sample-page
      [htmlCode]="htmlCode"
      [typescriptCode]="typescriptCode"
      pageTitle="Progress"
    >
      <div ngtwProgress [ngtwProgressValue]="progressValue()"></div>
      <input
        class="mt-4"
        ngtwInput
        type="number"
        [value]="progressValue()"
        min="0"
        max="100"
        (input)="progressChange($event)"
      />
    </sample-page>
  `,
})
export default class Progress {
  htmlCode = `
<div ngtwProgress [ngtwProgressValue]="value()"></div>
`;

  typescriptCode = `
import { Component } from '@angular/core';
import { NgtwProgress } from '@ngtw-kit/directives/progress';

@Component({
  imports: [NgtwProgress],
  selector: 'app-example',
  template: \`
    <div ngtwProgress [ngtwProgressValue]="value()"></div>
  \`,
})

export class Example {}
`;

  progressValue = signal(20);

  progressChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);
    if (isNaN(value)) {
      this.progressValue.set(0);
      return;
    }

    if (!value) {
      this.progressValue.set(0);
      return;
    }

    if (value > 100) {
      this.progressValue.set(100);
      return;
    }

    this.progressValue.set(value);
  }
}
