import { render } from '@testing-library/angular';
import { provideTabsState } from './_state';
import { NgtwTab } from './tab';

describe('directive:tab', () => {
  it('should render a tab', async () => {
    const container = await render(`<button ngtwTab="tab1"></button>`, {
      imports: [NgtwTab],
      providers: [provideTabsState()],
    });
    const tabElement = container.getByRole('tab');

    expect(tabElement).toBeTruthy();
    expect(tabElement.tagName).toBe('BUTTON');
    expect(tabElement.classList.contains('relative')).toBe(true);
    expect(tabElement.classList.contains('cursor-pointer')).toBe(true);
    expect(tabElement.classList.contains('rounded-none')).toBe(true);
    expect(tabElement.classList.contains('bg-transparent')).toBe(true);
    expect(tabElement.classList.contains('p-2')).toBe(true);
    expect(tabElement.classList.contains('text-start')).toBe(true);
    expect(tabElement.classList.contains('text-zinc-600')).toBe(true);
    expect(tabElement.classList.contains('outline-transparent')).toBe(true);
    expect(
      tabElement.classList.contains(
        'transition-[background-color,_outline,_opacity]',
      ),
    ).toBe(true);
    expect(tabElement.classList.contains('select-none')).toBe(true);
    expect(tabElement.classList.contains('hover:bg-zinc-800')).toBe(true);
    expect(tabElement.classList.contains('focus:-outline-offset-2')).toBe(true);
    expect(tabElement.classList.contains('focus-visible:outline-2')).toBe(true);
    expect(
      tabElement.classList.contains('focus-visible:outline-purple-500'),
    ).toBe(true);
    expect(tabElement.classList.contains('disabled:pointer-events-none')).toBe(
      true,
    );
    expect(tabElement.classList.contains('disabled:opacity-25')).toBe(true);
    expect(tabElement.classList.contains('aria-selected:text-zinc-300')).toBe(
      true,
    );
    expect(tabElement.getAttribute('role')).toBe('tab');
    expect(tabElement.getAttribute('type')).toBe('button');
    expect(tabElement.getAttribute('id')).toBe('tab-tab1');
    expect(tabElement.getAttribute('aria-controls')).toBe('tabpanel-tab1');
    expect(tabElement.getAttribute('aria-selected')).toBe('false');
    expect(tabElement.getAttribute('tabindex')).toBe('-1');
  });

  it('should set the tab as selected when clicked', async () => {
    const container = await render(`<button ngtwTab="tab1"></button>`, {
      imports: [NgtwTab],
      providers: [provideTabsState()],
    });

    const tabElement = container.getByRole('tab');
    tabElement.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));

    container.rerender();

    expect(tabElement.getAttribute('aria-selected')).toBe('true');
    expect(tabElement.getAttribute('tabindex')).toBe('0');

    const [element] = container.debugElement.children;
    const directiveInstance = element.injector.get(NgtwTab);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((directiveInstance as any).isSelected()).toBe(true);
  });
});
