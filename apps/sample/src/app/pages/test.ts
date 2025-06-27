import { Component } from '@angular/core';

@Component({
  // imports: [NgtwTabs, NgtwTab, NgtwTabIndicator],
  selector: 'sample-test',
  template: `
    <!-- <div ngtwTabs>
      @for (tabOption of tabsOptions; track $index) {
        <button ngtwTab [option]="tabOption">
          {{ tabOption.title }}
        </button>
      }
      <span ngtwTabIndicator></span>
    </div> -->
  `,
})
export default class Test {
  // tabsOptions = [
  //   {
  //     title: 'Tab 1',
  //     content: 'Content for Tab 1',
  //   },
  //   {
  //     title: 'Tab 2',
  //     content: 'Content for Tab 2',
  //   },
  // ];
}
