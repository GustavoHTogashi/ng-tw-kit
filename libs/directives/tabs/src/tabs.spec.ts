import { render } from '@testing-library/angular';
import { provideTabsState } from './_state';
import { NgtwTab } from './tab';
import { NgtwTablist } from './tablist';
import { NgtwTabs } from './tabs';

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
        providers: [provideTabsState()],
      },
    );

    const tabElement = container.getByRole('tabs');

    expect(tabElement).toBeTruthy();
    expect(tabElement.tagName).toBe('DIV');
    expect(tabElement.classList.contains('flex')).toBe(true);
    expect(tabElement.classList.contains('flex-col')).toBe(true);
    expect(tabElement.classList.contains('gap-4')).toBe(true);
    expect(tabElement.classList.contains('bg-transparent')).toBe(true);
    expect(tabElement.classList.contains('text-current')).toBe(true);
    expect(tabElement.getAttribute('role')).toBe('tabs');
  });

  it('should render a vertical tabs', async () => {
    const container = await render(
      `<div ngtwTabs ngtwTabsOrientation="vertical">
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
        providers: [provideTabsState()],
      },
    );

    const tabElement = container.getByRole('tabs');

    expect(tabElement).toBeTruthy();
    expect(tabElement.tagName).toBe('DIV');
    expect(tabElement.classList.contains('flex')).toBe(true);
    expect(tabElement.classList.contains('flex-row')).toBe(true);
    expect(tabElement.classList.contains('gap-4')).toBe(true);
    expect(tabElement.classList.contains('bg-transparent')).toBe(true);
    expect(tabElement.classList.contains('text-current')).toBe(true);
    expect(tabElement.getAttribute('role')).toBe('tabs');
  });
});
