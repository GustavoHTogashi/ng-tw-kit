import { render } from '@testing-library/angular';
import { NgtwTabs } from './tabs';
import { NgtwTab } from './tab';
import { NgtwTablist } from './tablist';
import { signal } from '@angular/core';
import { provideTabsState } from './_state';

describe('directive:tabs', () => {
  it('should render a tabs', async () => {
    const container = await render(
      `<div ngtwTabs>
        <div ngtwTablist>
          <button ngtwTab="tab1">Tab 1</button>
          <button ngtwTab="tab2">Tab 2</button>
          <button ngtwTab="tab3">Tab 3</button>
        </div>
        <div ngtwTabpanel="tab1"></div>
        <div ngtwTabpanel="tab2"></div>
        <div ngtwTabpanel="tab3"></div>
      </div>`,
      {
        imports: [NgtwTabs, NgtwTabs, NgtwTab, NgtwTablist],
        providers: [
          provideTabsState({
            focusedTab: signal(''),
            indicatorSize: signal(''),
            indicatorTranslate: signal(''),
            orientation: signal('horizontal'),
            selectedTab: signal('tab1'),
            tabs: signal([]),
          }),
        ],
      },
    );
    await new Promise((resolve) => setTimeout(resolve, 0)); // wait for async rendering
    const tabElement = container.getByRole('tabs');

    expect(tabElement).toBeTruthy();
  });
});
