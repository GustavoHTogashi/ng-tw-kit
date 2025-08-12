import { computed, Directive, ElementRef, inject, signal } from '@angular/core';
import { InputElementRef } from '@ngtw-kit/common/types';
import { OneTimeCodeState } from './_state';
import { NgtwAlphanumeric } from '@ngtw-kit/directives/alphanumeric';

@Directive({
  exportAs: 'ngtwOneTimeCodeDigit',
  host: {
    '(focus)': 'onFocus()',
    '(input)': 'onInput()',
    '(keydown)': 'onKeydown($event)',
    '[attr.aria-label]': 'arialabel()',
    '[class]': 'hostClass()',
    '[attr.disabled]': 'state.disabled() ? "" : null',
    '[tabIndex]': 'isFocused() ? 0 : -1',
    '[value]': 'digitValue()',
    'maxLength': '1',
  },
  hostDirectives: [NgtwAlphanumeric],
  selector: 'input[ngtwOneTimeCodeDigit]',
})
export class NgtwOneTimeCodeDigit {
  readonly element = inject<InputElementRef>(ElementRef).nativeElement;

  protected readonly state = OneTimeCodeState.consume();

  protected readonly arialabel = computed(() => `Digit ${this.index() + 1}`);
  protected readonly index = computed(() => this.state.digits().indexOf(this));
  protected readonly isFocused = computed(
    () => this.state.focusedDigit() === this,
  );
  protected readonly digitValue = computed(
    () => this.state.value()[this.index()] || '',
  );

  protected readonly hostClass = signal(
    'h-12 w-8 cursor-text rounded-xs border-0 bg-zinc-800 p-0 text-center text-lg leading-none text-current caret-purple-500 transition-[background-color,_opacity,_box-shadow] outline-none select-all selection:bg-purple-500/25 placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-purple-500 disabled:pointer-events-none disabled:opacity-25',
  );

  constructor() {
    this.state.digits.update((digits) => [...digits, this]);
  }

  onInput() {
    if (this.state.isComplete()) return;

    this.element.value = this.element.value.slice(0, 1).toUpperCase();

    if (!this.element.value) return;

    this.state.value.update((value) => {
      return [
        value.slice(0, this.index()),
        this.element.value,
        value.slice(this.index() + 1),
      ].join('');
    });

    const index =
      this.index() + 1 < this.state.digits().length
        ? this.index() + 1
        : this.index();
    const element = this.state.digits()[index]?.element;
    element.focus();
  }

  onFocus() {
    this.state.focusedDigit.set(this);
    this.element.setSelectionRange(0, 1);
  }

  focus() {
    this.element.focus();
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key.includes('Arrow')) {
      event.preventDefault();
      return;
    }

    if (event.key === ' ') {
      event.preventDefault();
      return;
    }

    if (event.key === 'Backspace' || event.key === 'Delete') {
      event.preventDefault();

      this.state.value.update(
        (value) =>
          `${value.slice(0, this.index())}${value.slice(this.index() + 1)}`,
      );

      const index = this.index() - 1 >= 0 ? this.index() - 1 : 0;
      const element = this.state.digits()[index]?.element;
      element.focus();
      return;
    }

    if (this.state.isComplete()) return;
  }
}
