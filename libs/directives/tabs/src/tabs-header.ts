import {
  AfterViewInit,
  contentChildren,
  Directive,
  DOCUMENT,
  ElementRef,
  inject,
  model,
  signal,
} from '@angular/core';
import { HTMLElementRef } from '@ngtw-kit/common/types';
import { NgtwTab, NgtwTabOption } from './tab';

@Directive({
  host: {
    '[class]': 'hostClasses()',
  },
  hostDirectives: [],
  selector: '[ngtwTabsHeader]',
})
export class NgtwTabsHeader implements AfterViewInit {
  protected readonly hostClasses = signal(
    'relative flex flex-row border-b-2 border-b-zinc-800 pb-4',
  );

  element = inject<HTMLElementRef>(ElementRef).nativeElement;
  document = inject(DOCUMENT);

  selectedTab = model<NgtwTabOption | null>(null, { alias: 'ngtwSelectedTab' });

  childrenTab = contentChildren(NgtwTab);

  childTabIndicator = this.document.createElement('span');

  private _update(tab: NgtwTab) {
    if (!tab.option()) return;
    this._changeTab(tab.option());
    this._changeTabIndicator(tab);
  }

  private _changeTab(tabOption: NgtwTabOption) {
    this.selectedTab.set(tabOption);
  }

  private _changeTabIndicator(tab: NgtwTab) {
    const { offsetLeft, offsetWidth } = tab.element;
    this.childTabIndicator.style.width = `${offsetWidth}px`;
    this.childTabIndicator.style.transform = `translateX(${offsetLeft}px)`;
  }

  constructor() {
    this.childTabIndicator.className =
      'absolute -bottom-0.5 h-0.5 w-0 -translate-x-0 rounded-none bg-zinc-300 transition-[transform,_width]';
    this.element.appendChild(this.childTabIndicator);
  }

  ngAfterViewInit(): void {
    const [first] = this.childrenTab();
    if (first) this._update(first);

    this.childrenTab().forEach((child) => {
      child.selected.subscribe(() => {
        this._update(child);
      });
    });
  }
}
