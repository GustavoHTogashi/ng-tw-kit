import { Component, model } from '@angular/core';
import {
  NgtwSlider,
  NgtwSliderBar,
  NgtwSliderThumb,
} from '@ngtw-kit/directives/slider';
import { Page } from '../../components';

@Component({
  imports: [NgtwSlider, NgtwSliderBar, NgtwSliderThumb, Page],
  selector: 'sample-slider',
  template: `
    <sample-page>
      <div ngtwSlider [(ngtwSliderValue)]="sliderValue">
        <div ngtwSliderBar></div>
        <div ngtwSliderThumb></div>
      </div>
    </sample-page>
  `,
})
export default class Slider {
  sliderValue = model(50);
}
