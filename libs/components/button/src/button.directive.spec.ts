import { ButtonDirective } from './button.directive';

describe('Directive: ButtonDirective', () => {
  let directive: ButtonDirective;

  beforeAll(() => { 
    directive = new ButtonDirective();
  })

  it('Should: Create directive', () => {
    expect(directive).toBeTruthy();
  });
});
