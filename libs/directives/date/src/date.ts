import {
  computed,
  Directive,
  ElementRef,
  inject,
  input,
  linkedSignal,
  model,
  signal,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { InputRef, isDate, isNumber, isString } from '@ngtw-kit/common/types';
import { DateAccepted, DateMode, DateSelection, DateStep } from './_type';
import { default_locale, default_min } from './_utils';

/**
 * Formats input as currency.
 */
@Directive({
  exportAs: 'ngtwDate',
  host: {
    '(focus.prevent)': 'changeSelectionRange()',
    '(input.prevent.stop)': 'updatePart($event)',
    '(keydown.backspace.prevent)': 'resetPart()',
    '(keydown.delete.prevent)': 'resetPart()',
    '(keydown./.prevent)': 'stepModeIndex(1)',
    '(keydown.arrowdown.prevent)': 'stepPart(-1)',
    '(keydown.arrowleft.prevent)': 'stepModeIndex(-1)',
    '(keydown.arrowright.prevent)': 'stepModeIndex(1)',
    '(keydown.arrowup.prevent)': 'stepPart(1)',
    '(keydown.end.prevent)': 'changeModeIndex("end")',
    '(keydown.home.prevent)': 'changeModeIndex("start")',
    '(mousedown.prevent)': 'element.focus()',
    '[attr.inputmode]': '"numeric"',
    '[attr.type]': '"text"',
    '[selectionEnd]': 'selection().end',
    '[selectionStart]': 'selection().start',
    '[value]': 'valueFormatted()',
  },
  selector: 'input[ngtwDate]',
})
export class NgtwDate {
  readonly element = inject<InputRef>(ElementRef).nativeElement;
  readonly control = inject(NgControl, { optional: true });

  locale = input(default_locale, { alias: 'ngtwDateLocale' });
  mode = input<DateMode>('day-month-year', { alias: 'ngtwDateMode' });
  value = model<DateAccepted>(0, { alias: 'ngtwDateValue' });

  protected readonly modeIndex = signal(0);
  protected readonly typed = signal(0);

  protected readonly valueAsDate = linkedSignal(() => {
    const dateValue = this.value();
    if (isDate(dateValue)) return dateValue;
    if (isString(dateValue))
      return isNaN(Date.parse(dateValue)) ? undefined : new Date(dateValue);
    if (isNumber(dateValue)) return new Date(dateValue);
    return undefined;
  });
  protected readonly valueFormatted = computed(() => {
    const valueAsDate = this.valueAsDate();
    if (valueAsDate) return this.localeFormatter().format(valueAsDate);
    return '';
  });
  protected readonly localeFormatter = computed(() => {
    return new Intl.DateTimeFormat(this.locale(), {
      day: this.mode().includes('day') ? '2-digit' : undefined,
      month: this.mode().includes('month') ? '2-digit' : undefined,
      year: this.mode().includes('year') ? 'numeric' : undefined,
    });
  });
  protected readonly modeParts = computed(() => {
    return this.mode().split('-');
  });
  protected readonly currentMode = computed(() => {
    return this.modeParts()[this.modeIndex()];
  });
  protected readonly selection = computed<DateSelection>(() => {
    const parts = this.localeFormatter().formatToParts(this.valueAsDate());
    let start = 0;
    let end = 0;
    for (const part of parts) {
      if (part.type === this.currentMode()) {
        end = start + part.value.length;
        break;
      }
      start += part.value.length;
    }
    return { start, end };
  });
  protected readonly currentPart = linkedSignal(() => {
    const parts = this.localeFormatter().formatToParts(this.valueAsDate());
    const part = parts.find((part) => part.type === this.currentMode());
    const emptyPart = { type: this.currentMode(), value: '' };
    return part || emptyPart;
  });
  protected readonly currentPartSize = computed(() => {
    const parts = this.localeFormatter().formatToParts(new Date());
    const part = parts.find((part) => part.type === this.currentMode());
    return part?.value.length ?? 2;
  });
  protected stepPart(amount: DateStep) {
    const newValue = +this.currentPart().value + amount;
    if (isNaN(newValue)) return;
    this.changeValueAsDate(newValue);
    this.changeValue();
    this.changeSelectionRange();
  }
  protected updatePart(e: Event) {
    const event = e as InputEvent;
    const current = this.currentPart().value;
    const size = this.currentPartSize();
    
    let nextValue = `${event.data}`.slice(-size).padStart(size, '0');
    if (this.typed())
      nextValue = `${current.slice(-this.typed())}${event.data}`.slice(-size);

    this.changeValueAsDate(+nextValue);
    this.changeValue();

    if (isNaN(Number(event.data))) return;

    this.typed.update((val) => val + 1);
    this.changeSelectionRange();

    if (this.typed() === size) {
      this.typed.set(0);
      this.stepModeIndex(1);
      this.changeSelectionRange();
    }
  }
  protected resetPart() {
    this.changeValueAsDate(default_min);
    this.changeValue();
    this.changeSelectionRange();
    this.typed.set(0);
  }
  protected changeModeIndex(destination: 'start' | 'end') {
    if (destination === 'start') return this.modeIndex.set(0);
    if (destination === 'end')
      return this.modeIndex.set(this.modeParts().length - 1);
    this.typed.set(0);
  }
  protected changeValue() {
    this.value.update((val) => {
      const valueAsDate = this.valueAsDate();
      if (!valueAsDate) return val;
      if (isDate(val)) return valueAsDate;
      if (isString(val)) return valueAsDate.toISOString();
      if (isNumber(val)) return valueAsDate.getTime();
      return val;
    });
  }
  protected changeValueAsDate(newValue: number) {
    this.valueAsDate.update((val) => {
      if (!val) return val;
      switch (this.currentMode()) {
        case 'day':
          return new Date(val.getFullYear(), val.getMonth(), newValue);
        case 'month':
          return new Date(val.getFullYear(), newValue - 1, val.getDate());
        case 'year':
          return new Date(newValue, val.getMonth(), val.getDate());
        default:
          return val;
      }
    });
  }
  protected changeSelectionRange() {
    requestAnimationFrame(() => {
      this.element.setSelectionRange(
        this.selection().start,
        this.selection().end,
      );
    });
  }
  protected stepModeIndex(step: DateStep) {
    this.modeIndex.update((index) => {
      return (index + step + this.modeParts().length) % this.modeParts().length;
    });
    this.typed.set(0);
  }
}
