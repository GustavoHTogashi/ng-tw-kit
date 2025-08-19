import {
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  linkedSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { InputRef } from '@ngtw-kit/common/types';

type AcceptedDate = Date | string | number | null;
type DatePart = {
  end: WritableSignal<number>;
  max: number;
  min: number;
  size: WritableSignal<number>;
  start: WritableSignal<number>;
  type: Intl.DateTimeFormatPartTypes;
  value: WritableSignal<number>;
};
type DateParts = DatePart[];
type DateMode =
  | 'day'
  | 'month'
  | 'year'
  | 'day-month'
  | 'month-year'
  | 'day-month-year';

/**
 * Formats input as currency.
 */
@Directive({
  exportAs: 'ngtwDate',
  host: {
    '(focus.prevent)': 'onFocus()',
    '(input.prevent.stop)': 'onInput()',
    '(keydown./.prevent)': 'nextModeIndex()',
    '(keydown.arrowdown.prevent)': 'decrementPartValue()',
    '(keydown.arrowleft.prevent)': 'previousModeIndex()',
    '(keydown.arrowright.prevent)': 'nextModeIndex()',
    '(keydown.arrowup.prevent)': 'incrementPartValue()',
    '(keydown.end.prevent)': 'lastModeIndex()',
    '(keydown.home.prevent)': 'firstModeIndex()',
    '(mousedown.prevent.stop)': 'onMouseDown()',
    '[attr.inputmode]': '"numeric"',
    '[attr.type]': '"text"',
    '[selectionEnd]': 'part().end()',
    '[selectionStart]': 'part().start()',
    '[value]': 'formattedValue()',
  },
  selector: 'input[ngtwDate]',
})
export class NgtwDate {
  readonly element = inject<InputRef>(ElementRef).nativeElement;

  locale = input(new Intl.DateTimeFormat().resolvedOptions().locale, {
    alias: 'ngtwDateLocale',
  });
  localeFormatter = computed(() => {
    return new Intl.DateTimeFormat(this.locale(), {
      ...(this.modes().includes('day') ? { day: 'numeric' } : {}),
      ...(this.modes().includes('month') ? { month: 'numeric' } : {}),
      ...(this.modes().includes('year') ? { year: 'numeric' } : {}),
    });
  });

  modes = input<DateMode>('day-month-year', { alias: 'ngtwDateMode' });
  modesList = computed(() => this.modes().split('-'));
  modeIndex = signal(0);
  mode = computed(
    () => this.modesList()[this.modeIndex()] || this.modesList()[0],
  );

  value = input<Date | string | number | null>(null, {
    alias: 'ngtwDateValue',
  });
  normalizedValue = computed<Date | undefined>(() => {
    const value = this.value();
    if (isNull(value)) return undefined;
    if (isDate(value)) return value;
    if (isNumber(value)) return new Date(value);
    if (isString(value)) {
      const parsed = Date.parse(value);
      if (!isNaN(parsed)) return new Date(parsed);
    }
    return undefined;
  });

  maxDay = computed((): number => {
    const year = this.year().value();
    const month = this.month().value() - 1;
    return new Date(year, month + 1, 0).getDate();
  });

  valueType = computed(() => {
    const value = this.value();
    if (isNull(value)) return 'unknown';
    if (isNumber(value)) return 'number';
    if (isDate(value)) return 'date';
    if (isString(value)) return 'string';
    return 'unknown';
  });

  day = linkedSignal<DatePart>(() => {
    return {
      end: signal(0),
      max: this.maxDay(),
      min: 1,
      size: signal(2),
      start: signal(0),
      type: 'day',
      value: signal(this.normalizedValue()?.getDate() ?? 0),
    };
  });

  month = linkedSignal<DatePart>(() => {
    return {
      end: signal(0),
      max: 12,
      min: 1,
      size: signal(2),
      start: signal(0),
      type: 'month',
      value: signal((this.normalizedValue()?.getMonth() ?? 0) + 1),
    };
  });

  year = linkedSignal<DatePart>(() => {
    return {
      end: signal(0),
      max: 9999,
      min: 1,
      size: signal(4),
      start: signal(0),
      type: 'year',
      value: signal(this.normalizedValue()?.getFullYear() ?? 0),
    };
  });

  parts = computed<DateParts>(() => {
    const modes = this.modes();
    const parts: DateParts = [];
    if (modes.includes('day')) parts.push(this.day());
    if (modes.includes('month')) parts.push(this.month());
    if (modes.includes('year')) parts.push(this.year());
    return parts;
  });

  part = computed((): DatePart => {
    return this.parts()[this.modeIndex()] || this.parts()[0];
  });

  formattedValue = computed(() => {
    if (
      this.year().value() === 0 &&
      this.month().value() === 0 &&
      this.day().value() === 0
    ) {
      return '';
    }

    return this.localeFormatter().format(
      new Date(
        this.year().value(),
        this.month().value() - 1,
        this.day().value(),
      ),
    );
  });

  constructor() {
    effect(() => {
      console.log({
        modes: this.modes(),
        value: this.value(),
        normalizedValue: this.normalizedValue(),
        formattedValue: this.formattedValue(),
        parts: this.parts().map((part) => ({
          type: part.type,
          value: part.value(),
          start: part.start(),
          end: part.end(),
          size: part.size(),
          min: part.min,
          max: part.max,
        })),
        mode: this.mode(),
        modeIndex: this.modeIndex(),
        locale: this.locale(),
        localeFormatter: this.localeFormatter().resolvedOptions(),
        part: {
          type: this.part().type,
          value: this.part().value(),
          start: this.part().start(),
          end: this.part().end(),
          size: this.part().size(),
          min: this.part().min,
          max: this.part().max,
        },
        valueType: this.valueType(),
        day: {
          value: this.day().value(),
          start: this.day().start(),
          end: this.day().end(),
          size: this.day().size(),
          min: this.day().min,
          max: this.day().max,
        },
        month: {
          value: this.month().value(),
          start: this.month().start(),
          end: this.month().end(),
          size: this.month().size(),
          min: this.month().min,
          max: this.month().max,
        },
        year: {
          value: this.year().value(),
          start: this.year().start(),
          end: this.year().end(),
          size: this.year().size(),
          min: this.year().min,
          max: this.year().max,
        },
      });
    });
  }

  decrementPartValue(): void {}
  incrementPartValue(): void {}
  onFocus(): void {
    this.element.setSelectionRange(this.part().start(), this.part().end());
  }
  onInput(): void {}
  onMouseDown(): void {
    this.element.focus();
  }
  firstModeIndex(): void {
    this.modeIndex.set(0);
  }
  lastModeIndex(): void {
    this.modeIndex.set(this.modes().split('-').length - 1);
  }
  nextModeIndex(): void {
    this.modeIndex.update((index) => {
      const modes = this.modes().split('-');
      return (index + 1) % modes.length;
    });
  }
  previousModeIndex(): void {
    this.modeIndex.update((index) => {
      const modes = this.modes().split('-');
      return (index - 1 + modes.length) % modes.length;
    });
  }
}
