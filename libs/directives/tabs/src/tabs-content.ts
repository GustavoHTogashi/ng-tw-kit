import {
  CdkPortalOutlet,
  ComponentPortal,
  TemplatePortal,
} from '@angular/cdk/portal';
import {
  AfterViewInit,
  Directive,
  DOCUMENT,
  ElementRef,
  inject,
  model,
  signal,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { ButtonRef } from '@ngtw-kit/common/types';

@Directive({
  host: {
    '[class]': 'hostClasses()',
  },
  hostDirectives: [CdkPortalOutlet],
  selector: '[ngtwTabsContent]',
})
export class NgtwTabsContent implements AfterViewInit {
  protected readonly hostClasses = signal('flex flex-col');

  private _elementRef = inject<ButtonRef>(ElementRef);

  cdkPortalOutlet = inject(CdkPortalOutlet);
  viewContainerRef = inject(ViewContainerRef);
  document = inject(DOCUMENT);

  content = model<TemplateRef<unknown> | Type<unknown> | string>('', {
    alias: 'ngtwContent',
  });

  element = this._elementRef.nativeElement;
  contentElement = this.document.createElement('p');
  parentElement = this.element.parentElement as HTMLElement;

  private _clean() {
    this.cdkPortalOutlet.detach();
    if (this.parentElement.contains(this.contentElement)) {
      this.parentElement.removeChild(this.contentElement);
    }
  }

  private _attachContent(content: string) {
    this._clean();
    this.contentElement.textContent = content;
    this.parentElement.appendChild(this.contentElement);
  }

  private _attachTemplate(template: TemplateRef<unknown>) {
    this._clean();
    this.cdkPortalOutlet.portal = new TemplatePortal(
      template,
      this.viewContainerRef,
    );
  }

  private _attachComponent(component: Type<unknown>) {
    this._clean();
    this.cdkPortalOutlet.attach(new ComponentPortal(component));
  }

  private _changeContent(
    content: TemplateRef<unknown> | Type<unknown> | string,
  ) {
    if (!content) return this._clean();
    if (isStringContent(content)) return this._attachContent(content);
    if (isTemplateRef(content)) return this._attachTemplate(content);
    if (isComponentType(content)) return this._attachComponent(content);
    this._clean();
  }

  ngAfterViewInit(): void {
    this._changeContent(this.content());
    this.content.subscribe((content) => this._changeContent(content));
  }
}

function isTemplateRef<T>(
  content: TemplateRef<T> | Type<T> | string | null,
): content is TemplateRef<T> {
  return content instanceof TemplateRef;
}

function isComponentType<T>(
  content: TemplateRef<T> | Type<T> | string | null,
): content is Type<T> {
  return content instanceof Type || typeof content === 'function';
}

function isStringContent<T>(
  content: TemplateRef<T> | Type<T> | string | null,
): content is string {
  return typeof content === 'string';
}
