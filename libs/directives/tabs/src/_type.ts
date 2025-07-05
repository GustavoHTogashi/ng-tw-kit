import type { Signal, TemplateRef, Type, WritableSignal } from '@angular/core';

export type NgtwTabsetContent =
  | TemplateRef<unknown>
  | Type<unknown>
  | undefined;

export type NgtwTabsetOrientation = 'horizontal' | 'vertical';

export type NgtwTabsetParameters = {
  orientation: Signal<NgtwTabsetOrientation>;
  selectedTab: Signal<string>;
};

export type NgtwTabsetState = {
  focusedTab: WritableSignal<string>;
  indicatorSize: WritableSignal<string>;
  indicatorTranslate: WritableSignal<string>;
  orientation: WritableSignal<NgtwTabsetOrientation>;
  selectedTab: WritableSignal<string>;
  tabs: WritableSignal<string[]>;
};
