import { ElementRef } from '@angular/core';
import {
  AnchorRef,
  ArticleRef,
  AsideRef,
  AudioRef,
  ButtonRef,
  CanvasRef,
  DialogRef,
  DivRef,
  ElRef,
  FooterRef,
  FormRef,
  HeaderRef,
  HeadingRef,
  ImageRef,
  InputRef,
  LinkRef,
  ListItemRef,
  ListRef,
  MainRef,
  NavRef,
  ParagraphRef,
  SectionRef,
  SelectRef,
  SpanRef,
  SVGRef,
  TableRef,
  TextareaRef,
  VideoRef,
} from './dom';

describe('types:dom', () => {
  it('should map each alias to the correct ElementRef type', () => {
    expectTypeOf<AnchorRef>().toEqualTypeOf<ElementRef<HTMLAnchorElement>>();
    expectTypeOf<ArticleRef>().toEqualTypeOf<ElementRef<HTMLElement>>();
    expectTypeOf<AsideRef>().toEqualTypeOf<ElementRef<HTMLElement>>();
    expectTypeOf<AudioRef>().toEqualTypeOf<ElementRef<HTMLAudioElement>>();
    expectTypeOf<ButtonRef>().toEqualTypeOf<ElementRef<HTMLButtonElement>>();
    expectTypeOf<CanvasRef>().toEqualTypeOf<ElementRef<HTMLCanvasElement>>();
    expectTypeOf<DialogRef>().toEqualTypeOf<ElementRef<HTMLDialogElement>>();
    expectTypeOf<DivRef>().toEqualTypeOf<ElementRef<HTMLDivElement>>();
    expectTypeOf<FooterRef>().toEqualTypeOf<ElementRef<HTMLElement>>();
    expectTypeOf<FormRef>().toEqualTypeOf<ElementRef<HTMLFormElement>>();
    expectTypeOf<HeaderRef>().toEqualTypeOf<ElementRef<HTMLElement>>();
    expectTypeOf<HeadingRef>().toEqualTypeOf<ElementRef<HTMLHeadingElement>>();
    expectTypeOf<ElRef>().toEqualTypeOf<ElementRef<HTMLElement>>();
    expectTypeOf<ImageRef>().toEqualTypeOf<ElementRef<HTMLImageElement>>();
    expectTypeOf<InputRef>().toEqualTypeOf<ElementRef<HTMLInputElement>>();
    expectTypeOf<LinkRef>().toEqualTypeOf<ElementRef<HTMLLinkElement>>();
    expectTypeOf<ListRef>().toEqualTypeOf<
      ElementRef<HTMLUListElement | HTMLOListElement>
    >();
    expectTypeOf<ListItemRef>().toEqualTypeOf<ElementRef<HTMLLIElement>>();
    expectTypeOf<MainRef>().toEqualTypeOf<ElementRef<HTMLElement>>();
    expectTypeOf<NavRef>().toEqualTypeOf<ElementRef<HTMLElement>>();
    expectTypeOf<ParagraphRef>().toEqualTypeOf<
      ElementRef<HTMLParagraphElement>
    >();
    expectTypeOf<SectionRef>().toEqualTypeOf<ElementRef<HTMLElement>>();
    expectTypeOf<SelectRef>().toEqualTypeOf<ElementRef<HTMLSelectElement>>();
    expectTypeOf<SpanRef>().toEqualTypeOf<ElementRef<HTMLSpanElement>>();
    expectTypeOf<SVGRef>().toEqualTypeOf<ElementRef<SVGElement>>();
    expectTypeOf<TableRef>().toEqualTypeOf<ElementRef<HTMLTableElement>>();
    expectTypeOf<TextareaRef>().toEqualTypeOf<
      ElementRef<HTMLTextAreaElement>
    >();
    expectTypeOf<VideoRef>().toEqualTypeOf<ElementRef<HTMLVideoElement>>();
  });
});
