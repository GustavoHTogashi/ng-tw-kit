import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NgtwStylesheet {
  private styleElement: HTMLStyleElement;

  constructor() {
    this.styleElement = document.createElement('style');
    this.styleElement.type = 'text/css';
    document.head.appendChild(this.styleElement);
  }

  addRule(rule: string) {
    if (this.styleElement.sheet) {
      this.styleElement.sheet.insertRule(
        rule,
        this.styleElement.sheet.cssRules.length,
      );
    } else {
      console.error('Style sheet is not available.');
    }
  }

  removeRule(index: number) {
    if (this.styleElement.sheet) {
      this.styleElement.sheet.deleteRule(index);
    } else {
      console.error('Style sheet is not available.');
    }
  }
}
