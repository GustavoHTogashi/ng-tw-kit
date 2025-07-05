import { Component } from '@angular/core';
import { NgtwSwitch } from '@ngtw-kit/directives/switch';
import { Page } from '../components';

@Component({
  imports: [NgtwSwitch, Page],
  selector: 'sample-switch',
  template: `
    <sample-page
      [htmlCode]="htmlCode"
      [typescriptCode]="typescriptCode"
      pageTitle="Switch"
    >
      <input ngtwSwitch />
    </sample-page>
  `,
})
export default class Switch {
  htmlCode = `
<input ngtwSwitch />
`;

  typescriptCode = `
import { Component } from '@angular/core';
import { NgtwSwitch } from '@ngtw-kit/directives/switch';

@Component({
  imports: [NgtwSwitch],
  selector: 'app-example',
  template: \`
    <input ngtwSwitch />
  \`,
})

export class Example {}
`;
}
