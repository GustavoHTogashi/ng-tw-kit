import { Component } from '@angular/core';
import { Page } from '../../components';
import { NgtwAlphabetic } from '@ngtw-kit/directives/alphabetic';

@Component({
  imports: [NgtwAlphabetic, Page],
  selector: 'sample-alphabetic',
  template: `
    <sample-page>
      <input ngtwAlphabetic placeholder="Enter letters(A-Za-zÀ-ÖØ-öø-ÿ) only" />
    </sample-page>
  `,
})
export default class Alphabetic {}
