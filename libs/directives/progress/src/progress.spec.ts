import { render } from '@testing-library/angular';
import { NgtwProgress } from './progress';

describe('directive:progress', () => {
  it('should render a progress bar', async () => {
    const container = await render(`<div ngtwProgress></div>`, {
      imports: [NgtwProgress],
    });

    const progressElement = container.getByRole('progressbar');

    expect(progressElement).toBeTruthy();
    expect(progressElement.tagName).toBe('DIV');
    expect(progressElement.getAttribute('role')).toBe('progressbar');
    expect(progressElement.getAttribute('aria-valuemin')).toBe('0');
    expect(progressElement.getAttribute('aria-valuemax')).toBe('100');
    expect(progressElement.getAttribute('aria-valuenow')).toBe('0');
    expect(progressElement.classList.contains('relative')).toBe(true);
    expect(progressElement.classList.contains('block')).toBe(true);
    expect(progressElement.classList.contains('h-4')).toBe(true);
    expect(progressElement.classList.contains('w-full')).toBe(true);
    expect(progressElement.classList.contains('overflow-hidden')).toBe(true);
    expect(progressElement.classList.contains('rounded-full')).toBe(true);
    expect(progressElement.classList.contains('bg-zinc-800')).toBe(true);
    expect(progressElement.classList.contains('after:absolute')).toBe(true);
    expect(progressElement.classList.contains('after:inset-0')).toBe(true);
    expect(
      progressElement.classList.contains('after:w-(--ngtw-progress)'),
    ).toBe(true);
    expect(progressElement.classList.contains('after:bg-zinc-300')).toBe(true);
    expect(progressElement.classList.contains('after:transition-[width]')).toBe(
      true,
    );
    expect(
      progressElement.classList.contains('after:will-change-[width]'),
    ).toBe(true);
  });

  it('should update progress value to 50', async () => {
    const value = 50;
    const container = await render(
      `<div ngtwProgress [ngtwProgressValue]="${value}"></div>`,
      {
        imports: [NgtwProgress],
      },
    );
    const progressElement = container.getByRole('progressbar');

    expect(progressElement.getAttribute('aria-valuenow')).toBe('50');

    const [element] = container.debugElement.children;
    const directiveInstance = element.injector.get(NgtwProgress);
    expect(directiveInstance.currentValue()).toBe(50);
  });

  it('should update progress value to 0', async () => {
    const value = -50;
    const container = await render(
      `<div ngtwProgress [ngtwProgressValue]="${value}"></div>`,
      {
        imports: [NgtwProgress],
      },
    );
    const progressElement = container.getByRole('progressbar');

    expect(progressElement.getAttribute('aria-valuenow')).toBe('0');

    const [element] = container.debugElement.children;
    const directiveInstance = element.injector.get(NgtwProgress);
    expect(directiveInstance.currentValue()).toBe(0);
  });

  it('should update progress value to 100', async () => {
    const value = 150;
    const container = await render(
      `<div ngtwProgress [ngtwProgressValue]="${value}"></div>`,
      {
        imports: [NgtwProgress],
      },
    );
    const progressElement = container.getByRole('progressbar');

    expect(progressElement.getAttribute('aria-valuenow')).toBe('100');

    const [element] = container.debugElement.children;
    const directiveInstance = element.injector.get(NgtwProgress);
    expect(directiveInstance.currentValue()).toBe(100);
  });
});
