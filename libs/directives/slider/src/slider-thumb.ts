import { CdkDrag, DragRef, Point } from '@angular/cdk/drag-drop';
import { computed, Directive, ElementRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DivRef } from '@ngtw-kit/common/types';
import { tap, throttleTime } from 'rxjs';
import { SliderState } from './_state';

@Directive({
  host: {
    '[attr.aria-label]': '"Slider Thumb"',
    '[attr.role]': '"slider"',
    '[attr.tabIndex]': '0',
    '[style.transform]': 'transform()',
  },
  hostDirectives: [CdkDrag],
  selector: '[ngtwSliderThumb]',
})
export class NgtwSliderThumb {
  readonly element = inject<DivRef>(ElementRef).nativeElement;

  protected readonly state = SliderState.consume();

  protected readonly transform = computed(() => {
    return `translate3d(${this.state.sliderThumbX()}, 0px, 0px)`;
  });

  private readonly _cdkDrag = inject(CdkDrag);

  private _constrainPosition = (
    userPointerPosition: Point,
    _: DragRef,
    { width }: DOMRect,
    pickupPositionInElement: Point,
  ) => {
    const { left, right } = this.state.sliderRect();
    let x = userPointerPosition.x - pickupPositionInElement.x;
    x = Math.max(left, Math.min(x, right - width));
    return { x, y: 0 };
  };

  private _thumbMoved = this._cdkDrag.moved.pipe(
    takeUntilDestroyed(),
    throttleTime(5),
    tap(({ pointerPosition }) => {
      this.state.value.set(this.state.calculateValue(pointerPosition.x));
    }),
  );

  constructor() {
    this._cdkDrag.lockAxis = 'x';
    this._cdkDrag.constrainPosition = this._constrainPosition;

    this._thumbMoved.subscribe();
  }
}
