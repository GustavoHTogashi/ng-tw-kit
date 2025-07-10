import { Component, inject } from '@angular/core';

import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Block } from './block';
import { Divider } from './divider';
import { Preview } from './preview';
import { Subtitle } from './subtitle';
import { Title } from './title';
import { RemoveAppNamePrefixPipe } from '../utils/string';

@Component({
  host: {
    class: 'flex flex-col gap-4 p-4 text-zinc-300',
  },
  imports: [
    AsyncPipe,
    Block,
    Divider,
    FormsModule,
    Preview,
    RemoveAppNamePrefixPipe,
    Subtitle,
    Title,
  ],
  selector: 'sample-page',
  template: `
    @if (titleEvent | async; as title) {
      <sample-title>{{ title | removeAppNamePrefix }}</sample-title>
    }
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
  titleEvent = inject(ActivatedRoute).title;
}
