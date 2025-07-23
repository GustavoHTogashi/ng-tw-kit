import {
  booleanAttribute,
  computed,
  Directive,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { InputElementRef } from '@ngtw-kit/common/types';

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
  private readonly _element = inject<InputElementRef>(ElementRef).nativeElement;

  allowNegative = input(true, {
    alias: 'ngtwNumericAllowNegative',
    transform: booleanAttribute,
  });
  decimalDigits = input(2, { alias: 'ngtwNumericDecimalDigits' });
  integerDigits = input(16, { alias: 'ngtwNumericIntegerDigits' });

  private readonly _previousValue = signal('');

  private readonly _regex = computed(() => {
    const decimalDigits = this.decimalDigits();
    const negative = this.allowNegative() ? '-?' : '';
    const integer = `(\\d{0,${this.integerDigits()}})`;
    const decimal = decimalDigits ? `(\\.\\d{0,${decimalDigits}})?` : '';
    return new RegExp(`^${negative}${integer}${decimal}$`);
  });

  private _resetInputValue() {
    this._element.value = '';
    this._previousValue.set('');
  }

  private _changeInputValue(value: string) {
    this._element.value = value;
    this._previousValue.set(value);
  }

  onBlur() {
    const { value } = this._element;
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
    if (!this._regex().test(this._element.value)) {
      this._element.value = this._previousValue();
      return;
    }
    this._previousValue.set(this._element.value);
    return;
  }
}
