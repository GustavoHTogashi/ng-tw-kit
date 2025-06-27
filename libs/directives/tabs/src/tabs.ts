import type { AfterViewInit } from '@angular/core';
import {
  contentChild,
  Directive,
  ElementRef,
  inject,
  signal,
  ViewContainerRef,
} from '@angular/core';
import { HTMLElementRef } from '@ngtw-kit/common/types';
import { NgtwTabOption } from './tab';
import { NgtwTabsContent } from './tabs-content';
import { NgtwTabsHeader } from './tabs-header';

@Directive({
  host: {
    '[class]': 'hostClasses()',
  },
  selector: '[ngtwTabs]',
})
export class NgtwTabs implements AfterViewInit {
  protected hostClasses = signal(
    'flex flex-col gap-4 bg-transparent text-current',
  );

  element = inject<HTMLElementRef>(ElementRef).nativeElement;
  viewContainerRef = inject(ViewContainerRef);

  childTabsHeader = contentChild(NgtwTabsHeader);
  childTabsContent = contentChild(NgtwTabsContent);

  private _changeTabContent(tabOption: NgtwTabOption | null) {
    const childTabsContent = this.childTabsContent();

    if (!childTabsContent || !tabOption || !tabOption.content) return;

    childTabsContent.content.set(tabOption.content);
  }

  ngAfterViewInit(): void {
    const tabsHeader = this.childTabsHeader();

    if (!tabsHeader) return;

    this._changeTabContent(tabsHeader.selectedTab());

    tabsHeader.selectedTab.subscribe((tabOption) => this._changeTabContent(tabOption));
  }
}
