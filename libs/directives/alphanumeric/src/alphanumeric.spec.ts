import { render, screen } from '@testing-library/angular';
import { NgtwAlphanumeric } from './alphanumeric';

describe('directive:ngtwAlphanumeric', () => {
  it('should allow alphanumeric input', async () => {
    await render(
      `<input ngtwAlphanumeric data-testid="alphanumeric-input" />`,
      {
        imports: [NgtwAlphanumeric],
      },
    );
    const input = screen.getByTestId('alphanumeric-input') as HTMLInputElement;
    input.value = 'abc123XYZ';
    input.dispatchEvent(new Event('input'));

    expect(input.value).toBe('abc123XYZ');
  });

  it('should remove non-alphanumeric characters', async () => {
    await render(
      `<input ngtwAlphanumeric data-testid="alphanumeric-input" />`,
      {
        imports: [NgtwAlphanumeric],
      },
    );
    const input = screen.getByTestId('alphanumeric-input') as HTMLInputElement;

    input.value = 'abc!@#123';
    input.dispatchEvent(new Event('input'));

    expect(input.value).toBe('abc123');
  });

  it('should allow unicode letters', async () => {
    await render(
      `<input ngtwAlphanumeric data-testid="alphanumeric-input" />`,
      {
        imports: [NgtwAlphanumeric],
      },
    );
    const input = screen.getByTestId('alphanumeric-input') as HTMLInputElement;

    input.value = 'abcñá123';
    input.dispatchEvent(new Event('input'));

    expect(input.value).toBe('abcñá123');
  });

  it('should allow spaces', async () => {
    await render(
      `<input ngtwAlphanumeric data-testid="alphanumeric-input" />`,
      {
        imports: [NgtwAlphanumeric],
      },
    );
    const input = screen.getByTestId('alphanumeric-input') as HTMLInputElement;

    input.value = 'abc 123';
    input.dispatchEvent(new Event('input'));

    expect(input.value).toBe('abc 123');
  });

  it('should handle composition events (IME input)', async () => {
    await render(
      `<input ngtwAlphanumeric data-testid="alphanumeric-input" />`,
      {
        imports: [NgtwAlphanumeric],
      },
    );
    const input = screen.getByTestId('alphanumeric-input') as HTMLInputElement;

    // Simulate composition (e.g., for Chinese/Japanese IME)
    input.value = 'abc漢字123!';
    input.dispatchEvent(new CompositionEvent('compositionstart'));
    input.value = 'abc漢字123!';
    input.dispatchEvent(new InputEvent('input'));
    // Value should not be sanitized during composition
    expect(input.value).toBe('abc漢字123!');

    input.dispatchEvent(new CompositionEvent('compositionend'));
    // After composition ends, value should be sanitized
    expect(input.value).toBe('abc漢字123');
  });

  it('should keep cursor position after sanitization', async () => {
    await render(
      `<input ngtwAlphanumeric data-testid="alphanumeric-input" />`,
      {
        imports: [NgtwAlphanumeric],
      },
    );
    const input = screen.getByTestId('alphanumeric-input') as HTMLInputElement;

    input.value = 'abc!';
    input.dispatchEvent(new Event('input'));

    // Cursor should be at the end after removing '!'
    expect(input.selectionStart).toBe(input.value.length);
    expect(input.value).toBe('abc');
  });
});
