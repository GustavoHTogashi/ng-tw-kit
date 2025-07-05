import { Component, signal } from '@angular/core';
import { NgtwProgress } from '@ngtw-kit/directives/progress';
import { Page } from '../components';

@Component({
  imports: [NgtwProgress, Page],
  selector: 'sample-progress',
  template: `
    <sample-page
      [htmlCode]="htmlCode"
      [typescriptCode]="typescriptCode"
      typescriptFilename="example.ts"
      htmlFilename="example.html"
      pageTitle="Progress"
    >
      <div ngtwProgress [ngtwProgressValue]="progressValue()"></div>
    </sample-page>
  `,
})
export default class Progress {
  htmlCode = `
<div ngtwProgress [ngtwProgressValue]="progressValue()"></div>
`;

  typescriptCode = `
import { Component } from '@angular/core';
import { NgtwProgress } from '@ngtw-kit/directives/progress';

@Component({
  imports: [NgtwProgress],
  selector: 'app-example',
  templateUrl: './example.html',
})

export class Example {
  protected readonly progressValue = signal(20);
}
`;

  protected readonly progressValue = signal(20);
}
