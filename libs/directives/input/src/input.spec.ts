import { render } from '@testing-library/angular';
import { NgtwInput } from './input';

describe('directive:input', () => {
  it('should render an input', async () => {
    const container = await render(`<input ngtwInput />`, {
      imports: [NgtwInput],
    });
    const inputElement = container.getByRole('input');

    expect(inputElement).toBeTruthy();
    expect(inputElement.tagName).toBe('INPUT');
    expect(inputElement.getAttribute('role')).toBe('input');
    expect(inputElement.classList.contains('cursor-text')).toBe(true);
    expect(inputElement.classList.contains('rounded-xs')).toBe(true);
    expect(inputElement.classList.contains('border-0')).toBe(true);
    expect(inputElement.classList.contains('bg-zinc-800')).toBe(true);
    expect(inputElement.classList.contains('p-2')).toBe(true);
    expect(inputElement.classList.contains('text-current')).toBe(true);
    expect(inputElement.classList.contains('caret-purple-500')).toBe(true);
    expect(
      inputElement.classList.contains(
        'transition-[background-color,_opacity,_box-shadow]',
      ),
    ).toBe(true);
    expect(inputElement.classList.contains('outline-none')).toBe(true);
    expect(inputElement.classList.contains('select-all')).toBe(true);
    expect(inputElement.classList.contains('selection:bg-purple-500/25')).toBe(
      true,
    );
    expect(inputElement.classList.contains('placeholder:text-zinc-600')).toBe(
      true,
    );
    expect(inputElement.classList.contains('focus-visible:ring-2')).toBe(true);
    expect(
      inputElement.classList.contains('focus-visible:ring-purple-500'),
    ).toBe(true);
    expect(
      inputElement.classList.contains('disabled:pointer-events-none'),
    ).toBe(true);
    expect(inputElement.classList.contains('disabled:opacity-25')).toBe(true);
  });
});
