import { render } from '@testing-library/angular';
import { NgtwTab } from './tab';
import { provideTabsetState } from './_state';
import { signal } from '@angular/core';

describe('directive:tab', () => {
  it('should render a tab', async () => {
    const container = await render(`<button ngtwTab="tab1"></button>`, {
      imports: [NgtwTab],
      providers: [
        provideTabsetState({
          focusedTab: signal(''),
          indicatorSize: signal(''),
          indicatorTranslate: signal(''),
          orientation: signal('horizontal'),
          selectedTab: signal(''),
          tabs: signal([]),
        }),
      ],
    });
    const tabElement = container.getByRole('tab');

    expect(tabElement).toBeTruthy();
  });
});
