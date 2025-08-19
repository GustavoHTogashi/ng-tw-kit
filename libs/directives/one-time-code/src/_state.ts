import { computed, signal } from '@angular/core';
import { createStateManager } from '@ngtw-kit/common/core';
import { NgtwOneTimeCodeState } from './_type';

export const OneTimeCodeState = createStateManager<NgtwOneTimeCodeState>(
  'NGTW_ONE_TIME_CODE_STATE',
  () => {
    return {
      digits: signal([]),
      disabled: signal(false),
      firstDigit: computed(() => undefined),
      focusedDigit: signal(undefined),
      focusedDigitIndex: computed(() => -1),
      isComplete: computed(() => false),
      isEmpty: computed(() => true),
      lastDigit: computed(() => undefined),
      value: signal(''),
    };
  },
);
