import { render } from '@testing-library/angular';
import { provideTabsState } from './_state';
import { NgtwTabpanel } from './tabpanel';

describe('directive:tabpanel', () => {
  it('should render a tabpanel', async () => {
    const container = await render(
      `<div ngtwTabpanel="tab1" data-testid="test"></div>`,
      {
        imports: [NgtwTabpanel],
        providers: [provideTabsState()],
      },
    );

    const tabElement = container.getByTestId('test');

    expect(tabElement).toBeTruthy();
    expect(tabElement.tagName).toBe('DIV');
    expect(tabElement.classList.contains('flex')).toBe(true);
    expect(tabElement.classList.contains('flex-col')).toBe(true);
    expect(tabElement.classList.contains('outline-none')).toBe(true);
    expect(tabElement.classList.contains('focus-visible:ring-2')).toBe(true);
    expect(tabElement.classList.contains('focus-visible:ring-purple-500')).toBe(
      true,
    );
    expect(tabElement.getAttribute('role')).toBe('tabpanel');
    expect(tabElement.getAttribute('aria-labelledby')).toBe('tab-tab1');
    expect(tabElement.getAttribute('id')).toBe('tabpanel-tab1');
    expect(tabElement.getAttribute('tabindex')).toBe('0');
  });
});
