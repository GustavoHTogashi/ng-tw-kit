import { ComponentPortal, DomPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import {
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { HTMLElementRef } from '@ngtw-kit/common/types';
import { isComponentType, isTemplateRef } from '@ngtw-kit/utils/core';
import { NGTW_TABS_STATE } from './_state';

@Directive({
  host: {
    '[attr.aria-labelledby]': 'tabId()',
    '[attr.hidden]': 'isSelected() ? null : ""',
    '[attr.id]': 'id()',
    '[class]': 'hostClass()',
    'role': 'tabpanel',
    'testid': 'tabpanel',
    'tabindex': '0',
  },
  exportAs: 'ngtwTabpanel',
  selector: '[ngtwTabpanel]',
})
export class NgtwTabpanel {
  value = input('', { alias: 'ngtwTabpanel' });
  domPortalOutlet: DomPortalOutlet;

  panelContent = input<TemplateRef<unknown> | Type<unknown> | undefined>(undefined, {
    alias: 'ngtwTabpanelPortalContent',
  });

  protected readonly state = inject(NGTW_TABS_STATE);
  protected readonly viewContainerRef = inject(ViewContainerRef);
  protected readonly element = inject<HTMLElementRef>(ElementRef).nativeElement;

  protected readonly hostClass = signal(
    'flex flex-col border-2 border-zinc-800 p-1 outline-none focus-visible:ring-2 focus-visible:ring-purple-500',
  );

  readonly id = computed(() => `tabpanel-${this.value()}`);
  readonly tabId = computed(() => `tab-${this.value()}`);
  protected readonly isSelected = computed(() => this.state().selectedTab() === this.value());

  private _createComponent(component: Type<unknown>) {
    return new ComponentPortal(component, this.viewContainerRef);
  }

  private _createTemplate(template: TemplateRef<unknown>) {
    return new TemplatePortal(template, this.viewContainerRef);
  }

  private _attachPortal() {
    this.domPortalOutlet.detach();
    const portalContent = this.panelContent();
    if (isTemplateRef(portalContent)) {
      const templatePortal = this._createTemplate(portalContent);
      return this.domPortalOutlet.attach(templatePortal);
    }
    if (isComponentType(portalContent)) {
      const componentPortal = this._createComponent(portalContent);
      return this.domPortalOutlet.attach(componentPortal);
    }
    return;
  }

  constructor() {
    this.domPortalOutlet = new DomPortalOutlet(this.element, undefined, this.viewContainerRef.injector);

    effect(() => {
      if (this.isSelected()) {
        this._attachPortal();
        return;
      }

      if (this.domPortalOutlet.hasAttached()) {
        this.domPortalOutlet.detach();
        return;
      }
    });
  }
}
