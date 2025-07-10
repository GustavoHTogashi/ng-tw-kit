import { render } from '@testing-library/angular';
import { NgtwTabpanel } from './tabpanel';
import { signal } from '@angular/core';
import { provideTabsState } from './_state';

describe('directive:tabpanel', () => {
  it('should render a tabpanel', async () => {
    const container = await render(`<div ngtwTabpanel="tab1"></div>`, {
      imports: [NgtwTabpanel],
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
    });
    await new Promise((resolve) => setTimeout(resolve, 0)); // wait for async rendering
    const tabElement = container.getByRole('tabpanel');

    expect(tabElement).toBeTruthy();
  });
});
