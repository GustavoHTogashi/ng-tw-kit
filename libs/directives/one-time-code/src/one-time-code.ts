import {
  AfterViewInit,
  booleanAttribute,
  computed,
  Directive,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { createOneTimeCodeState, provideOneTimeCodeState } from './_state';

@Directive({
  exportAs: 'ngtwOneTimeCode',
  host: {
    '(keydown.arrowleft)': 'focusPreviousDigit($event)',
    '(keydown.arrowright)': 'focusNextDigit($event)',
    '(keydown.end)': 'focusLastDigit($event)',
    '(keydown.home)': 'focusFirstDigit($event)',
    '[attr.data-filled]': 'state.isComplete() ? "" : null',
    '[class]': 'hostClass()',
  },
  providers: [provideOneTimeCodeState()],
  selector: '[ngtwOneTimeCode]',
})
export class NgtwOneTimeCode implements AfterViewInit {
  readonly disabled = input(false, {
    alias: 'ngtwOneTimeCodeDisabled',
    transform: booleanAttribute,
  });

  protected readonly state = createOneTimeCodeState({
    disabled: this.disabled,
  });

  protected readonly isComplete = computed(() => this.state.isComplete());

  protected readonly hostClass = signal('flex flex-row items-center gap-2');

  complete = output<string>();

  ngAfterViewInit(): void {
    this.state.focusedDigit.set(this.state.firstDigit());
  }

  focusPreviousDigit(event: Event) {
    if (this.state.isEmpty()) return;
    event.preventDefault();
    if (this.state.focusedDigitIndex() === -1) return;
    const index =
      this.state.focusedDigitIndex() - 1 >= 0
        ? this.state.focusedDigitIndex() - 1
        : 0;
    this.state.digits()[index]?.focus();
  }

  focusNextDigit(event: Event) {
    if (this.state.isEmpty()) return;
    event.preventDefault();
    if (this.state.focusedDigitIndex() === -1) return;
    const index =
      this.state.focusedDigitIndex() + 1 < this.state.value().length
        ? this.state.focusedDigitIndex() + 1
        : this.state.value().length;
    this.state.digits()[index]?.focus();
  }

  focusFirstDigit(event: Event) {
    if (this.state.isEmpty()) return;
    event.preventDefault();
    this.state.firstDigit()?.focus();
  }

  focusLastDigit(event: Event) {
    if (this.state.isEmpty()) return;
    event.preventDefault();
    this.state.digits().at(this.state.value().length)?.focus();
  }

  constructor() {
    effect(() => {
      if (this.isComplete()) this.complete.emit(this.state.value());
    });
  }
}
