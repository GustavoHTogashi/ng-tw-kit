import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
  TemplateRef,
  Type,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonRef } from '@ngtw-kit/common/types';
import { fromEvent, tap } from 'rxjs';

export type NgtwTabOption = {
  content: string | TemplateRef<unknown> | Type<unknown> | undefined;
  title: string;
  disabled?: boolean;
  selected?: boolean;
};

@Directive({
  host: {
    '[class]': 'hostClasses()',
  },
  selector: 'button[ngtwTab]',
})
export class NgtwTab {
  protected readonly hostClasses = signal(
    'cursor-pointer overflow-hidden rounded-none bg-transparent p-2 text-current outline-transparent transition-[background-color,_outline,_opacity] select-none hover:bg-zinc-800 focus:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-purple-500 disabled:pointer-events-none disabled:opacity-25',
  );

  element = inject<ButtonRef>(ElementRef).nativeElement;

  option = input.required<NgtwTabOption>({
    alias: 'ngtwTabOption',
  });

  selected = output<void>();

  private _click$ = fromEvent(this.element, 'click').pipe(
    takeUntilDestroyed(),
    tap(() => this.selected.emit()),
  );

  constructor() {
    this._click$.subscribe();

    effect(() => {
      this.element.disabled = this.option()?.disabled ?? false;
    });
  }
}
