import { Component } from '@angular/core';
import { NgtwCurrency } from '@ngtw-kit/directives/currency';
import { Page } from '../../components';

@Component({
  imports: [NgtwCurrency, Page],
  selector: 'sample-currency',
  template: `
    <sample-page>
      <input ngtwCurrency ngtwCurrencyAllowEmpty ngtwCurrencyAllowNegative placeholder="Enter currency text" />
    </sample-page>
  `,
})
export default class Currency {}
