import {
  booleanAttribute,
  computed,
  Directive,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { unsignedNumberAttribute } from '@ngtw-kit/common/core';
import { InputRef } from '@ngtw-kit/common/types';

/**
 * Directive to handle numeric input.
 */
@Directive({
  host: {
    '(blur)': 'onBlur()',
    '(input)': 'onInput()',
    '[attr.inputmode]': 'decimalDigits() ? "decimal" : "numeric"',
    'type': 'text',
  },
  selector: 'input[ngtwNumeric]',
})
export class NgtwNumeric {
  readonly element = inject<InputRef>(ElementRef).nativeElement;

  allowNegative = input(true, {
    alias: 'ngtwNumericAllowNegative',
    transform: booleanAttribute,
  });

  decimalDigits = input(2, {
    alias: 'ngtwNumericDecimalDigits',
    transform: unsignedNumberAttribute,
  });

  integerDigits = input(16, {
    alias: 'ngtwNumericIntegerDigits',
    transform: unsignedNumberAttribute,
  });

  private readonly _previousValue = signal('');

  private readonly _regex = computed(() => {
    const decimalDigits = this.decimalDigits();
    const negative = this.allowNegative() ? '-?' : '';
    const integer = `(\\d{0,${this.integerDigits()}})`;
    const decimal = decimalDigits ? `(\\.\\d{0,${decimalDigits}})?` : '';
    return new RegExp(`^${negative}${integer}${decimal}$`);
  });

  private _resetInputValue() {
    this.element.value = '';
    this._previousValue.set('');
  }

  private _changeInputValue(value: string) {
    this.element.value = value;
    this._previousValue.set(value);
  }

  onBlur() {
    const { value } = this.element;
    const decimalDigits = this.decimalDigits();

    if (value === '' || value === '-') return this._resetInputValue();

    const num = Number(value);

    if (isNaN(num)) return this._resetInputValue();

    const sign = num < 0 ? '-' : '';
    const [int, dec = ''] = Math.abs(num).toString().split('.');

    if (!decimalDigits) {
      this._changeInputValue(`${sign}${int}`);
      return;
    }

    const decPart = (dec + '0'.repeat(decimalDigits)).slice(0, decimalDigits);
    this._changeInputValue(`${sign}${int}.${decPart}`);
  }

  onInput() {
    if (!this._regex().test(this.element.value)) {
      this.element.value = this._previousValue();
      return;
    }
    this._previousValue.set(this.element.value);
    return;
  }
}
