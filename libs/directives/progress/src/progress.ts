import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  input,
  linkedSignal
} from '@angular/core';
import { unsignedNumberAttribute } from '@ngtw-kit/common/core';
import { ElRef } from '@ngtw-kit/common/types';
import { ProgressState } from './_state';

@Directive({
  host: {
    '[attr.aria-label]': '"Progress"',
  },
  providers: [ProgressState.provide()],
  selector: '[ngtwProgress]',
})
export class NgtwProgress implements AfterViewInit {
  element = inject<ElRef>(ElementRef).nativeElement;

  max = input(100, {
    alias: 'ngtwProgressMax',
    transform: unsignedNumberAttribute,
  });
  min = input(0, {
    alias: 'ngtwProgressMin',
    transform: unsignedNumberAttribute,
  });
  value = input(0, {
    alias: 'ngtwProgressValue',
    transform: unsignedNumberAttribute,
  });

  state = ProgressState.create({
    value: linkedSignal(() => this.value()),
    min: linkedSignal(() => this.min()),
    max: linkedSignal(() => this.max()),
  });

  ngAfterViewInit() {
    this.state.progressRect.set(this.element.getBoundingClientRect());
  }
}
