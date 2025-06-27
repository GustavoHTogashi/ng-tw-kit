import { Component, computed, TemplateRef, viewChild } from '@angular/core';
import {
  NgtwTab,
  NgtwTabOption,
  NgtwTabs,
  NgtwTabsContent,
  NgtwTabsHeader,
} from '@ngtw-kit/directives/tabs';
import { Preview } from '../components';
import { Page } from '../components/page';

@Component({
  imports: [NgtwTab, NgtwTabs, NgtwTabsContent, NgtwTabsHeader, Page],
  template: `
    <sample-page
      [htmlCode]="htmlCode"
      [typescriptCode]="typescriptCode"
      pageTitle="Tabs"
    >
      <div ngtwTabs>
        <div ngtwTabsHeader>
          @for (tabOption of tabsOptions(); track $index) {
            <button ngtwTab [option]="tabOption">{{ tabOption.title }}</button>
          }
        </div>
        <ng-template ngtwTabsContent />
      </div>
    </sample-page>

    <ng-template #tabTemplate>
      <div class="flex flex-col gap-2">
        <h2 class="text-lg font-semibold">Title</h2>
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

  tabsOptions = computed<NgtwTabOption[]>(() => {
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

  template = viewChild<TemplateRef<HTMLElement>>('tabTemplate');

  tabsOptions = computed<NgtwTabOption[]>(() => {
    return [
      {
        title: 'String Tab',
        content:
          'Tab string content => lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        title: 'Template Tab',
        content: this.template(),
      },
      {
        title: 'Component Tab',
        content: Preview,
      },
    ];
  });
}
