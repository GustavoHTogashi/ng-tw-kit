import { Directive, ElementRef, inject, signal } from '@angular/core';
import { InputRef } from '@ngtw-kit/common/types';

/**
 * Restricts input to alphanumeric characters (letters and numbers only).
 */
@Directive({
  host: {
    '(compositionend)': 'onCompositionEnd()',
    '(compositionstart)': 'composing.set(true)',
    '(input)': 'onInput()',
    'type': 'text',
  },
  selector: 'input[ngtwAlphanumeric]',
})
export class NgtwAlphanumeric {
  private readonly _alphanumericRegex = /^[\d\s\p{L}\p{M}]+$/u;

  private readonly _element = inject<InputRef>(ElementRef).nativeElement;

  protected readonly composing = signal(false);

  private _sanitizeValue(): string {
    return Array.from(this._element.value)
      .filter((char) => this._alphanumericRegex.test(char))
      .join('');
  }

  private _changeNativeValue(value: string) {
    if (this._element.value !== value) {
      const cursor = this._element.selectionStart || this._element.value.length;
      this._element.value = value;
      this._element.setSelectionRange(cursor - 1, cursor - 1);
    }
  }

  protected onCompositionEnd() {
    this.composing.set(false);
    this._changeNativeValue(this._sanitizeValue());
  }

  protected onInput() {
    if (this.composing()) return;
    this._changeNativeValue(this._sanitizeValue());
  }
}
