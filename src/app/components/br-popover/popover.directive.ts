import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  contentChild,
  effect,
  inject,
  model,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { BrPopoverContentDirective } from './popover-content.directive';
import { BrPopoverTriggerDirective } from './popover-trigger.directive';
import { take } from 'rxjs';

@Directive({
  selector: '[brPopover]',
  standalone: true,
  exportAs: 'brPopover',
})
export class BrPopoverDirective {
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);

  readonly open = model(false);

  private overlayRef: OverlayRef | null = null;
  private trigger = contentChild.required(BrPopoverTriggerDirective);
  private contentTemplate = contentChild.required(BrPopoverContentDirective, {
    read: TemplateRef,
  });

  constructor() {
    effect(() => {
      if (this.open() && !this.overlayRef) {
        this.openPopover();
      } else if (!this.open() && this.overlayRef) {
        this.closePopover();
      }
    });
  }

  toggle(): void {
    this.open.update((value) => !value);
  }

  close(): void {
    this.open.set(false);
  }

  private openPopover(): void {
    const triggerElement = this.trigger().elementRef.nativeElement;

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(triggerElement)
      .withPositions([
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetY: 8,
        },
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: -8,
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    const portal = new TemplatePortal(
      this.contentTemplate(),
      this.viewContainerRef,
    );

    this.overlayRef.attach(portal);

    this.overlayRef
      .backdropClick()
      .pipe(take(1))
      .subscribe(() => this.open.set(false));
  }

  private closePopover(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
