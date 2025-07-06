import {
  Component,
  inject,
  linkedSignal,
  signal,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  NgtwTab,
  NgtwTablist,
  NgtwTabpanel,
  NgtwTabset,
  NgtwTabsetOrientation,
} from '@ngtw-kit/directives/tabs';
import { Preview } from '../components';
import { Page } from '../components/page';

@Component({
  imports: [NgtwTab, NgtwTabset, NgtwTabpanel, NgtwTablist, Page],
  template: `
    <sample-page
      [htmlCode]="htmlCode"
      [typescriptCode]="typescriptCode"
      pageTitle="Tabs"
    >
      <div ngtwTabset>
        <div ngtwTablist>
          @for (tabOption of tabsOptions(); track $index) {
            <button
              [ngtwTab]="tabOption.value"
              [ngtwTabDisabled]="tabOption.disabled"
            >
              {{ tabOption.name }}
            </button>
          }
        </div>
        @for (tabOption of tabsOptions(); track $index) {
          <div
            [ngtwTabpanel]="tabOption.value"
            [ngtwTabpanelPortalContent]="tabOption.content"
          ></div>
        }
      </div>
    </sample-page>

    <ng-template #tabTemplate let-value>
      <div class="flex flex-col gap-2">
        <h2 class="text-lg font-semibold">Title {{ value }}</h2>
        <p>Paragraph</p>
      </div>
    </ng-template>
  `,
})
export default class Tabs {
  htmlCode = `
<div ngtwTabs>
  <div ngtwTabsHeader>
    @for (tabOption of tabsOptions(); track $index) {
      <button ngtwTab [option]="tabOption">{{ tabOption.title }}</button>
    }
  </div>
  <ng-template ngtwTabsContent/>
</div>

<ng-template #tabTemplate>
  <div class="flex flex-col gap-2">
    <h2 class="text-lg font-semibold">Title</h2>
    <p>Paragraph</p>
  </div>
</ng-template>
`;

  typescriptCode = `
import { Component } from '@angular/core';
import { NgtwTab, NgtwTabsContent, NgtwTabsHeader, NgtwTabs, NgtwTabOption } from '@ngtw-kit/directives/tabs';
import { Preview } from '../components';

@Component({
    imports: [NgtwTab, NgtwTabs, NgtwTabsContent,NgtwTabsHeader],
    selector: 'app-example',
    template: \`
      <div ngtwTabs>
        <div ngtwTabsHeader>
          @for (tabOption of tabsOptions(); track $index) {
            <button ngtwTab [option]="tabOption">{{ tabOption.title }}</button>
          }
        </div>
        <ng-template ngtwTabsContent/>
      </div>

      <ng-template #tabTemplate>
        <div class="flex flex-col gap-2">
          <h2 class="text-lg font-semibold">Title</h2>
          <p>Paragraph</p>
        </div>
      </ng-template>
    \`,
})
export class Example {
  template = viewChild<TemplateRef<HTMLElement>>('tabTemplate');

  tabsOptions = signal<NgtwTabOption[]>(() => {
    return [
      {
        title: 'Tab string',
        content: 'Tab string content => lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        title: 'Tab template',
        content: this.template(),
      },
      {
        title: 'Tab component',
        content: Preview,
      },
    ];
  });
}
`;

  template = viewChild.required<TemplateRef<HTMLElement>>('tabTemplate');

  viewContainerRef = inject(ViewContainerRef);

  readonly orientation = signal<NgtwTabsetOrientation>('vertical');

  tabsOptions = linkedSignal(() => [
    {
      name: 'Tab #1',
      disabled: false,
      value: 'value1',
      content: this.template(),
    },
    {
      name: 'Tab #2',
      disabled: false,
      value: 'value2',
      content: Preview,
    },
    {
      name: 'Tab #3',
      disabled: false,
      value: 'value3',
      content: this.template(),
    },
    {
      name: 'Tab #4',
      disabled: false,
      value: 'value4',
      content: Preview,
    },
  ]);
}
