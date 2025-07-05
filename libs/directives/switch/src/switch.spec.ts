import { render } from '@testing-library/angular';
import { NgtwSwitch } from './switch';

describe('directive:switch', () => {
  it('should render a switch', async () => {
    const container = await render(`<input ngtwSwitch />`, {
      imports: [NgtwSwitch],
    });
    const switchElement = container.getByRole('switch');

    expect(switchElement).toBeTruthy();
    expect(switchElement.tagName).toBe('INPUT');
    expect(switchElement.getAttribute('type')).toBe('checkbox');
    expect(switchElement.classList.contains('relative')).toBe(true);
    expect(switchElement.classList.contains('h-6')).toBe(true);
    expect(switchElement.classList.contains('w-12')).toBe(true);
    expect(switchElement.classList.contains('cursor-pointer')).toBe(true);
    expect(switchElement.classList.contains('rounded-full')).toBe(true);
    expect(switchElement.classList.contains('border-none')).toBe(true);
    expect(switchElement.classList.contains('bg-zinc-800')).toBe(true);
    expect(switchElement.classList.contains('!bg-none')).toBe(true);
    expect(switchElement.classList.contains('ring-0')).toBe(true);
    expect(switchElement.classList.contains('ring-offset-0')).toBe(true);
    expect(switchElement.classList.contains('outline-0')).toBe(true);
    expect(switchElement.classList.contains('outline-offset-0')).toBe(true);
    expect(switchElement.classList.contains('transition-colors')).toBe(true);
    expect(switchElement.classList.contains('outline-none')).toBe(true);
    expect(switchElement.classList.contains('select-none')).toBe(true);
    expect(switchElement.classList.contains('before:absolute')).toBe(true);
    expect(switchElement.classList.contains('before:top-1/2')).toBe(true);
    expect(switchElement.classList.contains('before:h-full')).toBe(true);
    expect(switchElement.classList.contains('before:w-1/2')).toBe(true);
    expect(switchElement.classList.contains('before:translate-x-0')).toBe(true);
    expect(switchElement.classList.contains('before:-translate-y-1/2')).toBe(
      true,
    );
    expect(switchElement.classList.contains('before:rounded-full')).toBe(true);
    expect(switchElement.classList.contains('before:bg-zinc-700')).toBe(true);
    expect(switchElement.classList.contains('before:outline-0')).toBe(true);
    expect(
      switchElement.classList.contains(
        'before:transition-[translate,_background-color]',
      ),
    ).toBe(true);
    expect(
      switchElement.classList.contains('checked:before:translate-x-full'),
    ).toBe(true);
    expect(switchElement.classList.contains('checked:before:bg-zinc-300')).toBe(
      true,
    );
    expect(
      switchElement.classList.contains('hover:before:bg-zinc-700/50'),
    ).toBe(true);
    expect(
      switchElement.classList.contains('checked:hover:before:bg-zinc-300/50'),
    ).toBe(true);
    expect(switchElement.classList.contains('focus-visible:ring-2')).toBe(true);
    expect(
      switchElement.classList.contains('focus-visible:ring-purple-500'),
    ).toBe(true);
    expect(
      switchElement.classList.contains('focus-visible:ring-offset-0'),
    ).toBe(true);
    expect(
      switchElement.classList.contains('disabled:pointer-events-none'),
    ).toBe(true);
    expect(switchElement.classList.contains('disabled:opacity-25')).toBe(true);
  });
});
