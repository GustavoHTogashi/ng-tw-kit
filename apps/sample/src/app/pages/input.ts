import { Component } from '@angular/core';
import { NgtwInput } from '@ngtw-kit/directives/input';
import { Page } from '../components';

@Component({
  imports: [NgtwInput, Page],
  selector: 'sample-input',
  template: `
    <sample-page
      [htmlCode]="htmlCode"
      [typescriptCode]="typescriptCode"
      pageTitle="Input"
    >
      <input ngtwInput placeholder="Type here..." />
    </sample-page>
  `,
})
export default class Input {
  htmlCode = `
<input ngtwInput placeholder="Type here..." />
`;

  typescriptCode = `
import { Component } from '@angular/core';
import { NgtwInput } from '@ngtw-kit/directives/input';

@Component({
  imports: [NgtwInput],
  selector: 'app-example',
  template: \`
    <input ngtwInput placeholder="Type here..." />
  \`,
})

export class Example {}
`;
}
