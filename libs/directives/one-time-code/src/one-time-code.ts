import {
  AfterViewInit,
  booleanAttribute,
  computed,
  Directive,
  effect,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';
import { OneTimeCodeState } from './_state';

@Directive({
  exportAs: 'ngtwOneTimeCode',
  host: {
    '(keydown.arrowleft.prevent)': 'focusPreviousDigit()',
    '(keydown.arrowright.prevent)': 'focusNextDigit()',
    '(keydown.end.prevent)': 'focusLastDigit()',
    '(keydown.home.prevent)': 'focusFirstDigit()',
    '[attr.data-filled]': 'state.isComplete() ? "" : null',
    '[class]': 'hostClass()',
  },
  providers: [OneTimeCodeState.provide()],
  selector: '[ngtwOneTimeCode]',
})
export class NgtwOneTimeCode implements AfterViewInit {
  readonly disabled = input(false, {
    alias: 'ngtwOneTimeCodeDisabled',
    transform: booleanAttribute,
  });

  protected readonly state = OneTimeCodeState.create({
    disabled: linkedSignal(() => this.disabled()),
    isComplete: computed(
      () => this.state.value().length === this.state.digits().length,
    ),
    isEmpty: computed(() => this.state.value().length === 0),
    lastDigit: computed(
      () => this.state.digits()[this.state.value().length - 1],
    ),
    firstDigit: linkedSignal(() => this.state.digits()[0]),
    focusedDigitIndex: computed(() => {
      const focusedDigit = this.state.focusedDigit();
      if (!focusedDigit) return -1;
      return this.state.digits().indexOf(focusedDigit);
    }),
  });

  protected readonly hostClass = signal('flex flex-row items-center gap-2');

  complete = output<string>();

  ngAfterViewInit(): void {
    this.state.focusedDigit.set(this.state.firstDigit());
  }

  focusPreviousDigit() {
    if (this.state.isEmpty()) return;
    if (this.state.focusedDigitIndex() === -1) return;
    const index =
      this.state.focusedDigitIndex() - 1 >= 0
        ? this.state.focusedDigitIndex() - 1
        : 0;
    this.state.digits()[index].focus();
  }

  focusNextDigit() {
    if (this.state.isEmpty()) return;
    if (this.state.focusedDigitIndex() === -1) return;
    const index =
      this.state.focusedDigitIndex() + 1 < this.state.value().length
        ? this.state.focusedDigitIndex() + 1
        : this.state.value().length;
    this.state.digits()[index].focus();
  }

  focusFirstDigit() {
    if (this.state.isEmpty()) return;
    this.state.firstDigit()?.focus();
  }

  focusLastDigit() {
    if (this.state.isEmpty()) return;
    this.state.digits()[this.state.value().length].focus();
  }

  constructor() {
    effect(() => {
      if (this.state.isComplete()) this.complete.emit(this.state.value());
    });
  }
}
