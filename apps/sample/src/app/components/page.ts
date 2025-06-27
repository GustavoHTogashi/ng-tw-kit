import { Component, input } from '@angular/core';

import { Subtitle } from './subtitle';
import { Preview } from './preview';
import { FormsModule } from '@angular/forms';
import { Divider } from './divider';
import { Code } from './code';
import { Block } from './block';
import { Title } from './title';

@Component({
  host: {
    class: 'flex flex-col gap-4 p-4 text-zinc-300',
  },
  imports: [Block, Code, Divider, FormsModule, Preview, Subtitle, Title],
  selector: 'sample-page',
  template: `
    @if (pageTitle()) {
      <sample-title>{{ pageTitle() }}</sample-title>
    }
    <sample-subtitle>Usage</sample-subtitle>
    <sample-divider />
    <sample-block>
      <sample-code language="typescript" [code]="typescriptCode()" />
      <sample-code language="html" [code]="htmlCode()" />
    </sample-block>
    <sample-subtitle>Preview</sample-subtitle>
    <sample-divider />
    <sample-block>
      <sample-preview>
        <ng-content />
      </sample-preview>
    </sample-block>
  `,
})
export class Page {
  htmlCode = input('');
  typescriptCode = input('');

  pageTitle = input('');
}
