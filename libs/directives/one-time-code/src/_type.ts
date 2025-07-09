import { Signal, WritableSignal } from '@angular/core';
import { NgtwOneTimeCodeDigit } from './one-time-code-digit';

export type NgtwOneTimeCodeState = {
  digits: WritableSignal<NgtwOneTimeCodeDigit[]>;
  disabled: WritableSignal<boolean>;
  firstDigit: Signal<NgtwOneTimeCodeDigit | undefined>;
  focusedDigit: WritableSignal<NgtwOneTimeCodeDigit | undefined>;
  focusedDigitIndex: Signal<number>;
  isComplete: Signal<boolean>;
  isEmpty: Signal<boolean>;
  lastDigit: Signal<NgtwOneTimeCodeDigit | undefined>;
  value: WritableSignal<string>;
};
