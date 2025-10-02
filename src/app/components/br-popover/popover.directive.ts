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
  // --- Injeções de Dependência ---
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);

  // --- Estado ---
  readonly open = model(false);
  private overlayRef: OverlayRef | null = null;

  // --- Referências aos Filhos ---
  private trigger = contentChild.required(BrPopoverTriggerDirective);
  private contentTemplate = contentChild.required(BrPopoverContentDirective, {
    read: TemplateRef,
  });

  constructor() {
    // Reage a mudanças no estado 'open' para criar ou destruir o overlay
    effect(() => {
      if (this.open() && !this.overlayRef) {
        this.openPopover();
      } else if (!this.open() && this.overlayRef) {
        this.closePopover();
      }
    });
  }

  // --- API Pública ---
  toggle(): void {
    this.open.update((value) => !value);
  }

  close(): void {
    this.open.set(false);
  }

  // --- Lógica Interna ---
  private openPopover(): void {
    const triggerElement = this.trigger().elementRef.nativeElement;

    // 1. Cria a estratégia de posicionamento
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(triggerElement)
      .withPositions([
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetY: 8, // Pequeno espaçamento entre o gatilho e o popover
        },
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: -8,
        },
      ]);

    // 2. Cria o overlay
    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true, // Cria um fundo transparente para capturar cliques fora
      backdropClass: 'cdk-overlay-transparent-backdrop', // Classe do CDK para o fundo
    });

    // 3. Cria o portal com o nosso <ng-template>
    const portal = new TemplatePortal(
      this.contentTemplate(),
      this.viewContainerRef
    );

    // 4. Anexa o portal ao overlay, renderizando o conteúdo
    this.overlayRef.attach(portal);

    // 5. Ouve por cliques no fundo para fechar o popover
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
