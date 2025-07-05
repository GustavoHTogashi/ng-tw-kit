import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
} from '@angular/core';

type DividerDirection = 'horizontal' | 'vertical';

@Component({
  host: {
    class: 'bg-zinc-800',
  },
  selector: 'sample-divider',
  template: ``,
})
export class Divider {
  private element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  direction = input<DividerDirection>('horizontal');
  directionClass = computed(() => {
    switch (this.direction()) {
      case 'vertical':
        return ['w-0.5', 'h-full'];
      case 'horizontal':
      default:
        return ['h-0.5', 'w-full'];
    }
  });

  constructor() {
    effect(() => {
      this.element.classList.add(...this.directionClass());
    });
  }
}
