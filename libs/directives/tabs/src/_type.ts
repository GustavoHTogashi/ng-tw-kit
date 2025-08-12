import type {
  Injector,
  Signal,
  TemplateRef,
  Type,
  WritableSignal,
} from '@angular/core';
import { NgtwTab } from './tab';

export type NgtwTabsOrientation = 'horizontal' | 'vertical';

export type NgtwTabsState = {
  enabledTabs: Signal<NgtwTab[]>;
  firstTab: Signal<NgtwTab | undefined>;
  focusedTab: WritableSignal<NgtwTab | undefined>;
  focusedTabIndex: Signal<number>;
  lastTab: Signal<NgtwTab | undefined>;
  orientation: WritableSignal<NgtwTabsOrientation>;
  selectedTab: WritableSignal<NgtwTab | undefined>;
  tabs: Signal<NgtwTab[]>;
};

export type NgtwTabpanelTemplateContent = {
  context: unknown | undefined;
  template: TemplateRef<unknown>;
};

export type NgtwTabpanelComponentContent = {
  component: Type<unknown>;
  injector: Injector | undefined;
};

export type NgtwTabpanelContent =
  | NgtwTabpanelTemplateContent
  | NgtwTabpanelComponentContent
  | undefined;

export function isTemplateContent(
  content: NgtwTabpanelContent,
): content is NgtwTabpanelTemplateContent {
  return (
    content !== undefined &&
    (content as NgtwTabpanelTemplateContent).template !== undefined
  );
}

export function isComponentContent(
  content: NgtwTabpanelContent,
): content is NgtwTabpanelComponentContent {
  return (
    content !== undefined &&
    (content as NgtwTabpanelComponentContent).component !== undefined
  );
}
