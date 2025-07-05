import { render } from '@testing-library/angular';
import { NgtwButton } from './button';

describe('directive:button', () => {
  it('should render a button', async () => {
    const container = await render(`<button ngtwButton></button>`, {
      imports: [NgtwButton],
    });
    const buttonElement = container.getByRole('button');

    expect(buttonElement).toBeTruthy();
    expect(buttonElement.tagName).toBe('BUTTON');
    expect(buttonElement.classList.contains('cursor-pointer')).toBe(true);
    expect(buttonElement.classList.contains('rounded')).toBe(true);
    expect(buttonElement.classList.contains('bg-zinc-800')).toBe(true);
    expect(buttonElement.classList.contains('px-2')).toBe(true);
    expect(buttonElement.classList.contains('py-2')).toBe(true);
    expect(buttonElement.classList.contains('text-current')).toBe(true);
    expect(
      buttonElement.classList.contains(
        'transition-[background-color,_translate,_opacity]',
      ),
    ).toBe(true);
    expect(buttonElement.classList.contains('outline-none')).toBe(true);
    expect(buttonElement.classList.contains('select-none')).toBe(true);
    expect(buttonElement.classList.contains('hover:bg-zinc-800/50')).toBe(true);
    expect(buttonElement.classList.contains('focus-visible:ring-2')).toBe(true);
    expect(
      buttonElement.classList.contains('focus-visible:ring-purple-500'),
    ).toBe(true);
    expect(buttonElement.classList.contains('active:translate-y-0.5')).toBe(
      true,
    );
    expect(
      buttonElement.classList.contains('disabled:pointer-events-none'),
    ).toBe(true);
    expect(buttonElement.classList.contains('disabled:opacity-25')).toBe(true);
  });
});
