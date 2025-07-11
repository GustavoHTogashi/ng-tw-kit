import { computed, Directive, input } from '@angular/core';

/**
 * Directive to handle numeric input.
 */
@Directive({
  host: {
    '(input)': 'onInput($event)',
    '(blur)': 'onBlur($event)',
  },
  selector: 'input[ngtwNumeric]',
})
export class NgtwNumeric {
  allowNegative = input(false, { alias: 'ngtwNumericAllowNegative' });
  decimalDigits = input(0, { alias: 'ngtwNumericDecimalDigits' });
  integerDigits = input(14, { alias: 'ngtwNumericIntegerDigits' });

  private readonly _formatterRegex = computed(() => {
    const pattern = `(-?0-9{0,${this.integerDigits()}})(?:\\.(0-9{0,${this.decimalDigits()}}))?.*`;
    return new RegExp(pattern);
  });
  private readonly _numericRegex = computed(() => {
    // Allow digits, decimal point, and minus sign
    if (this.allowNegative() && this.decimalDigits()) return /[^0-9.-]+/g;
    // Allow digits and decimal point
    if (!this.allowNegative() && this.decimalDigits()) return /[^0-9.]+/g;
    // Allow digits and minus sign
    if (this.allowNegative() && !this.decimalDigits()) return /[^0-9-]+/g;
    // Allow only digits
    return /[^0-9]+/g;
  });
  readonly _singleDecimalPointRegex = /(\..*?)\..*/g;
  readonly _singleMinusSignRegex = /(?!^)-/g;

  private _integerDecimalTransform(
    _: string,
    integerPart: unknown,
    decimalPart: unknown,
  ): string {
    return decimalPart !== undefined
      ? `${integerPart}.${decimalPart}`
      : `${integerPart}`;
  }

  onInput(event: Event): void {
    const element = event.target as HTMLInputElement;
    let { value } = element;

    value = value.replace(this._numericRegex(), '');

    if (this.allowNegative()) {
      value = value.replace(this._singleMinusSignRegex, '');
    }

    if (this.decimalDigits()) {
      value = value.replace(this._singleDecimalPointRegex, '$1');
    }

    value = value.replace(
      this._formatterRegex(),
      this._integerDecimalTransform,
    );

    element.value = value;
  }

  onBlur(event: Event): void {
    const element = event.target as HTMLInputElement;
    const { value } = element;

    if (this.allowNegative() && value.endsWith('-')) {
      element.value = '';
    }

    if (this.decimalDigits()) {
      let [integerPart, decimalPart] = value.split('.');
      integerPart = integerPart || '0';
      decimalPart = (decimalPart || '').padEnd(this.decimalDigits(), '0');
      element.value = `${integerPart}.${decimalPart}`;
    }
  }
}
