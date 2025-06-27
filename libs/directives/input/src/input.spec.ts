import { render, RenderResult } from '@testing-library/angular';
import { NgtwInput } from './input';

describe('directive:input', () => {
  let container: RenderResult<unknown, unknown>;
  let inputElement: HTMLElement;

  beforeEach(async () => {
    container = await render(`<input ngtwInput />`, {
      imports: [NgtwInput],
      componentProperties: {},
    });

    inputElement = container.getByRole('input');
  });

  it('should render an input', () => {
    expect(inputElement).toBeTruthy();
    expect(inputElement.tagName).toBe('INPUT');
  });
});
