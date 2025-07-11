import { Component } from '@angular/core';
import { NgtwSlider } from '@ngtw-kit/directives/slider';
import { Page } from '../../components';

@Component({
  imports: [NgtwSlider, Page],
  selector: 'sample-slider',
  template: `
    <sample-page>
      <input ngtwSlider placeholder="Enter slider text" />
    </sample-page>
  `,
})
export default class Slider {}
