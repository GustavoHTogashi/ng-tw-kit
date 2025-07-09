import { render } from '@testing-library/angular';
import { NgtwTablist } from './tablist';
import { signal } from '@angular/core';
import { provideTabsState } from './_state';
import { NgtwTab } from './tab';

describe('directive:tablist', () => {
  it('should render a tablist', async () => {
    const container = await render(
      `<div ngtwTablist>
        <button ngtwTab="tab1">Tab 1</button>
        <button ngtwTab="tab2">Tab 2</button>
        <button ngtwTab="tab3">Tab 3</button>
      </div>`,
      {
        imports: [NgtwTablist, NgtwTab],
        providers: [
          provideTabsState({
            focusedTab: signal(''),
            indicatorSize: signal(''),
            indicatorTranslate: signal(''),
            orientation: signal('horizontal'),
            selectedTab: signal(''),
            tabs: signal([]),
          }),
        ],
      },
    );
    const tabElement = container.getByRole('tablist');

    expect(tabElement).toBeTruthy();
  });
});
