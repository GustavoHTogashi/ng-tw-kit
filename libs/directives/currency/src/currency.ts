import {
  booleanAttribute,
  Directive,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { NGTW_NAVIGATOR } from '@ngtw-kit/common/web-apis';
import { InputRef } from '@ngtw-kit/common/types';
import { NgtwNumeric } from '@ngtw-kit/directives/numeric';

@Directive({
  host: {
    '(blur)': 'onBlur()',
    '(focus)': 'onFocus()',
    'type': 'text',
  },
  hostDirectives: [
    {
      directive: NgtwNumeric,
      inputs: [
        'ngtwNumericAllowNegative: ngtwCurrencyAllowNegative',
        'ngtwNumericDecimalDigits: ngtwCurrencyDecimalDigits',
        'ngtwNumericIntegerDigits: ngtwCurrencyIntegerDigits',
      ],
    },
  ],
  selector: 'input[ngtwCurrency]',
})
export class NgtwCurrency {
  private readonly _element = inject<InputRef>(ElementRef).nativeElement;
  private readonly _navigator = inject(NGTW_NAVIGATOR);

  private readonly numeric = inject(NgtwNumeric);

  allowEmpty = input(false, {
    alias: 'ngtwCurrencyAllowEmpty',
    transform: booleanAttribute,
  });
  code = input('USD', { alias: 'ngtwCurrencyCode' });
  locale = input(this._navigator.language, { alias: 'ngtwCurrencyLocale' });

  onBlur() {
    const numericValue = isNaN(+this._element.value) ? 0 : +this._element.value;

    if (!this.allowEmpty() && numericValue === 0) {
      this._element.value = '';
      return;
    }

    const formattedValue = new Intl.NumberFormat(this.locale(), {
      style: 'currency',
      currency: this.code(),
      minimumFractionDigits: this.numeric.decimalDigits(),
      maximumFractionDigits: this.numeric.decimalDigits(),
    }).format(numericValue);

    this._element.value = formattedValue;
  }

  onFocus() {
    this.numeric.onInput();
  }
}
