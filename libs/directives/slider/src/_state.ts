import { computed, signal } from '@angular/core';
import { createStateManager } from '@ngtw-kit/common/core';
import { NgtwSliderState } from './_type';

export const SliderState = createStateManager<NgtwSliderState>(
  'NGTW_SLIDER_STATE',
  () => {
    return {
      calculateValue: () => 0,
      max: signal(100),
      min: signal(0),
      moveThumb: () => null,
      sliderRect: signal(new DOMRect()),
      sliderThumbX: computed(() => '0px'),
      value: signal(0),
    };
  },
);
