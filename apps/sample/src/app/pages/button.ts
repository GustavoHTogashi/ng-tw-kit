import { Component } from '@angular/core';
import { NgtwButton } from '@ngtw-kit/directives/button';
import { Page } from '../components';

@Component({
  imports: [NgtwButton, Page],
  selector: 'sample-button',
  template: `
    <sample-page
      [htmlCode]="htmlCode"
      [typescriptCode]="typescriptCode"
      pageTitle="Button"
    >
      <button ngtwButton>Click Me</button>
    </sample-page>
  `,
})
export default class Button {
  htmlCode = `
<button ngtwButton >Click Me</button>
`;

  typescriptCode = `
import { Component } from '@angular/core';
import { NgtwButton } from '@ngtw-kit/directives/button';

@Component({
  imports: [NgtwButton],
  selector: 'app-example',
  template: \`
    <button ngtwButton >Click Me</button>
  \`,
})

export class Example {}
`;
}
