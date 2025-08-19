import { createStateManager } from '@ngtw-kit/common/core';
import { NgtwProgressState } from './_type';
import { signal } from '@angular/core';

export const ProgressState = createStateManager<NgtwProgressState>(
  'NGTW_PROGRESS_STATE',
  () => {
    return {
      max: signal(100),
      min: signal(0),
      progressRect: signal(new DOMRect()),
      value: signal(0),
    };
  },
);
