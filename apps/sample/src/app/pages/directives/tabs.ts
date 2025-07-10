import {
  Component,
  inject,
  InjectionToken,
  Injector,
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
  NgtwTabs,
  NgtwTabsOrientation,
} from '@ngtw-kit/directives/tabs';
import { Page } from '../../components/page';

@Component({
  imports: [NgtwTab, NgtwTabs, NgtwTabpanel, NgtwTablist, Page],
  template: `
    <sample-page>
      <div ngtwTabs>
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
            [ngtwTabpanelContent]="tabOption.content"
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
  template = viewChild.required<TemplateRef<HTMLElement>>('tabTemplate');

  viewContainerRef = inject(ViewContainerRef);

  readonly orientation = signal<NgtwTabsOrientation>('vertical');

  tabsOptions = linkedSignal(() => [
    {
      name: 'Tab #1',
      disabled: false,
      value: 'value1',
      content: {
        template: this.template(),
        context: { $implicit: 1 },
      },
    },
    {
      name: 'Tab #2',
      disabled: false,
      value: 'value2',
      content: {
        component: SampleTabsComponent,
        injector: Injector.create({
          providers: [
            {
              provide: TAB_VALUE,
              useValue: 2,
            },
          ],
        }),
      },
    },
    {
      name: 'Tab #3',
      disabled: false,
      value: 'value3',
      content: {
        template: this.template(),
        context: { $implicit: 3 },
      },
    },
    {
      name: 'Tab #4',
      disabled: false,
      value: 'value4',
      content: {
        component: SampleTabsComponent,
        injector: Injector.create({
          providers: [
            {
              provide: TAB_VALUE,
              useValue: 4,
            },
          ],
        }),
      },
    },
  ]);
}

const TAB_VALUE = new InjectionToken<number>('tabValue');
@Component({
  host: {
    class: 'flex flex-col gap-2',
  },
  selector: 'sample-tabs-component',
  template: `
    <h2 class="text-lg font-semibold">Title {{ value }}</h2>
    <p>Paragraph</p>
  `,
})
class SampleTabsComponent {
  value = inject(TAB_VALUE, { optional: true }) ?? 0;
}
