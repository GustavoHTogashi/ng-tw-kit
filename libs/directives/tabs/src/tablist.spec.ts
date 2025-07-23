import { render } from '@testing-library/angular';
import { provideTabsState } from './_state';
import { NgtwTab } from './tab';
import { NgtwTablist } from './tablist';
import { signal } from '@angular/core';

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
        providers: [provideTabsState()],
      },
    );
    const tabElement = container.getByRole('tablist');

    expect(tabElement).toBeTruthy();
    expect(tabElement.tagName).toBe('DIV');
    expect(tabElement.classList.contains('relative')).toBe(true);
    expect(tabElement.classList.contains('flex')).toBe(true);
    expect(tabElement.classList.contains('flex-row')).toBe(true);
    expect(tabElement.classList.contains('border-b-2')).toBe(true);
    expect(tabElement.classList.contains('border-b-zinc-800')).toBe(true);
    expect(tabElement.classList.contains('after:absolute')).toBe(true);
    expect(tabElement.classList.contains('after:-bottom-0.5')).toBe(true);
    expect(tabElement.classList.contains('after:h-0.5')).toBe(true);
    expect(
      tabElement.classList.contains('after:w-(--ngtw-tab-indicator-size)'),
    ).toBe(true);
    expect(
      tabElement.classList.contains(
        'after:translate-x-(--ngtw-tab-indicator-translate)',
      ),
    ).toBe(true);
    expect(tabElement.classList.contains('after:rounded-none')).toBe(true);
    expect(tabElement.classList.contains('after:bg-zinc-300')).toBe(true);
    expect(
      tabElement.classList.contains('after:transition-[translate,_width]'),
    ).toBe(true);
    expect(
      tabElement.classList.contains('after:will-change-[translate,_width]'),
    ).toBe(true);
    expect(tabElement.getAttribute('role')).toBe('tablist');
    expect(tabElement.getAttribute('aria-orientation')).toBe('horizontal');
    expect(tabElement.getAttribute('aria-multiselectable')).toBe('false');
    expect(tabElement.getAttribute('aria-label')).toBe('Tabs');
  });

  it('should render a vertical tablist', async () => {
    const orientation = 'vertical';
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
            orientation: signal(orientation),
          }),
        ],
      },
    );
    const tabElement = container.getByRole('tablist');

    expect(tabElement).toBeTruthy();
    expect(tabElement.tagName).toBe('DIV');
    expect(tabElement.classList.contains('relative')).toBe(true);
    expect(tabElement.classList.contains('flex')).toBe(true);
    expect(tabElement.classList.contains('flex-col')).toBe(true);
    expect(tabElement.classList.contains('border-l-2')).toBe(true);
    expect(tabElement.classList.contains('border-l-zinc-800')).toBe(true);
    expect(tabElement.classList.contains('after:absolute')).toBe(true);
    expect(tabElement.classList.contains('after:-left-0.5')).toBe(true);
    expect(
      tabElement.classList.contains('after:h-(--ngtw-tab-indicator-size)'),
    ).toBe(true);
    expect(tabElement.classList.contains('after:w-0.5')).toBe(true);
    expect(
      tabElement.classList.contains(
        'after:translate-y-(--ngtw-tab-indicator-translate)',
      ),
    ).toBe(true);
    expect(tabElement.classList.contains('after:rounded-none')).toBe(true);
    expect(tabElement.classList.contains('after:bg-zinc-300')).toBe(true);
    expect(
      tabElement.classList.contains('after:transition-[translate,_height]'),
    ).toBe(true);
    expect(
      tabElement.classList.contains('after:will-change-[translate,_height]'),
    ).toBe(true);
    expect(tabElement.getAttribute('role')).toBe('tablist');
    expect(tabElement.getAttribute('aria-orientation')).toBe('vertical');
    expect(tabElement.getAttribute('aria-multiselectable')).toBe('false');
    expect(tabElement.getAttribute('aria-label')).toBe('Tabs');
  });
});
