import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  let component: App;

  beforeEach(() => {
    TestBed.runInInjectionContext(() => {
      component = new App();
    });
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
