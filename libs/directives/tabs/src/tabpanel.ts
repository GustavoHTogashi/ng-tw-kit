import {
  ComponentPortal,
  DomPortalOutlet,
  TemplatePortal,
} from '@angular/cdk/portal';
import {
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  ViewContainerRef,
} from '@angular/core';
import { HTMLElementRef } from '@ngtw-kit/common/types';
import { consumeTabsState } from './_state';
import {
  isComponentContent,
  isTemplateContent,
  NgtwTabpanelComponentContent,
  NgtwTabpanelContent,
  NgtwTabpanelTemplateContent,
} from './_type';

@Directive({
  host: {
    '[attr.aria-labelledby]': 'tabId()',
    '[attr.hidden]': 'isSelected() ? null : ""',
    '[attr.id]': 'id()',
    '[class]': 'hostClass()',
    'role': 'tabpanel',
    'tabindex': '0',
  },
  exportAs: 'ngtwTabpanel',
  selector: '[ngtwTabpanel]',
})
export class NgtwTabpanel {
  readonly element = inject<HTMLElementRef>(ElementRef).nativeElement;
  protected readonly state = consumeTabsState();
  protected readonly viewContainerRef = inject(ViewContainerRef);

  content = input<NgtwTabpanelContent>(undefined, {
    alias: 'ngtwTabpanelContent',
  });
  value = input('', { alias: 'ngtwTabpanel' });

  protected readonly id = computed(() => `tabpanel-${this.value()}`);
  protected readonly tabId = computed(() => `tab-${this.value()}`);
  protected readonly isSelected = computed(
    () => this.state.selectedTab()?.value() === this.value(),
  );

  protected readonly hostClass = signal(
    'flex flex-col outline-none focus-visible:ring-2 focus-visible:ring-purple-500',
  );

  private _domPortalOutlet = new DomPortalOutlet(
    this.element,
    undefined,
    this.viewContainerRef.injector,
  );

  private _createComponent({
    component,
    injector,
  }: NgtwTabpanelComponentContent) {
    return new ComponentPortal(component, this.viewContainerRef, injector);
  }

  private _createTemplate({ template, context }: NgtwTabpanelTemplateContent) {
    return new TemplatePortal(template, this.viewContainerRef, context);
  }

  private _attachPortal() {
    const content = this.content();
    if (isTemplateContent(content))
      return this._domPortalOutlet.attach(this._createTemplate(content));
    if (isComponentContent(content))
      return this._domPortalOutlet.attach(this._createComponent(content));
    return;
  }

  constructor() {
    effect(() => {
      if (this._domPortalOutlet.hasAttached()) this._domPortalOutlet.detach();
      if (this.isSelected()) return this._attachPortal();
      return;
    });
  }
}
