import { ButtonDirective } from './button';
import { render, RenderResult } from '@testing-library/angular';

describe('directive:button', () => {
  let container: RenderResult<unknown, unknown>;
  let buttonElement: HTMLElement;

  beforeEach(async () => {
    container = await render(`<button ngtw></button>`, {
      imports: [ButtonDirective],
      componentProperties: {},
    });

    buttonElement = container.getByRole('button');
  });

  it('should render a button', () => {
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.tagName).toBe('BUTTON');
  });
});
