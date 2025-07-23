import { Directive, ElementRef, inject, signal } from '@angular/core';
import { InputElementRef } from '@ngtw-kit/common/types';

/**
 * Restricts input to alphabetic characters (letters only).
 */
@Directive({
  host: {
    '(compositionend)': 'onCompositionEnd()',
    '(compositionstart)': 'composing.set(true)',
    '(input)': 'onInput()',
    'type': 'text',
  },
  selector: 'input[ngtwAlphabetic]',
})
export class NgtwAlphabetic {
  private readonly _alphabeticRegex = /^[\s\p{L}\p{M}]+$/u;

  private readonly _element = inject<InputElementRef>(ElementRef).nativeElement;

  protected readonly composing = signal(false);

  private _sanitizeValue(): string {
    return Array.from(this._element.value)
      .filter((char) => this._alphabeticRegex.test(char))
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
