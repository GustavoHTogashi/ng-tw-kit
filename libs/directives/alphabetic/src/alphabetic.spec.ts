import { render, screen } from '@testing-library/angular';
import { NgtwAlphabetic } from './alphabetic';

describe('directive:ngtwAlphabetic', () => {
  it('should allow only alphabetic characters', async () => {
    await render(`<input ngtwAlphabetic data-testid="alpha-input" />`, {
      imports: [NgtwAlphabetic],
    });
    const input = screen.getByTestId('alpha-input') as HTMLInputElement;

    input.value = 'abcXYZ';
    input.dispatchEvent(new Event('input'));
    expect(input.value).toBe('abcXYZ');

    input.value = 'abc123';
    input.dispatchEvent(new Event('input'));
    expect(input.value).toBe('abc');
  });

  it('should allow spaces and unicode letters', async () => {
    await render(`<input ngtwAlphabetic data-testid="alpha-input" />`, {
      imports: [NgtwAlphabetic],
    });
    const input = screen.getByTestId('alpha-input') as HTMLInputElement;

    input.value = 'áéí óü';
    input.dispatchEvent(new Event('input'));
    expect(input.value).toBe('áéí óü');

    input.value = '你好 мир';
    input.dispatchEvent(new Event('input'));
    expect(input.value).toBe('你好 мир');
  });

  it('should remove non-alphabetic characters on input', async () => {
    await render(`<input ngtwAlphabetic data-testid="alpha-input" />`, {
      imports: [NgtwAlphabetic],
    });
    const input = screen.getByTestId('alpha-input') as HTMLInputElement;

    input.value = 'abc!@#123';
    input.dispatchEvent(new Event('input'));
    expect(input.value).toBe('abc');
  });

  it('should not sanitize during composition', async () => {
    await render(`<input ngtwAlphabetic data-testid="alpha-input" />`, {
      imports: [NgtwAlphabetic],
    });
    const input = screen.getByTestId('alpha-input') as HTMLInputElement;

    // Simulate compositionstart (IME input)
    input.dispatchEvent(new CompositionEvent('compositionstart'));
    input.value = 'abc123';
    input.dispatchEvent(new Event('input'));
    // Value should not be sanitized yet
    expect(input.value).toBe('abc123');

    // Simulate compositionend
    input.dispatchEvent(new CompositionEvent('compositionend'));
    // Value should now be sanitized
    expect(input.value).toBe('abc');
  });

  it('should set type to text', async () => {
    await render(`<input ngtwAlphabetic data-testid="alpha-input" />`, {
      imports: [NgtwAlphabetic],
    });
    const input = screen.getByTestId('alpha-input') as HTMLInputElement;
    expect(input.type).toBe('text');
  });
});
