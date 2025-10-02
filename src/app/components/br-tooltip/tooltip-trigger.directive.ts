import {
  Directive,
  ElementRef,
  TemplateRef,
  ViewContainerRef,
  contentChild,
  effect,
  inject,
  input,
  model,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { AriaDescriber, FocusMonitor } from '@angular/cdk/a11y';
import { BrTooltipContentDirective } from './tooltip-content.directive';

@Directive({
  selector: '[brTooltipTrigger]',
  standalone: true,
  host: {
    // Eventos que acionam a lógica de abrir/fechar
    '(mouseenter)': 'show()',
    '(mouseleave)': 'hide()',
    // FocusMonitor cuidará dos eventos de foco/blur
  },
})
export class BrTooltipTriggerDirective {
  // --- Injeções de Dependência ---
  private readonly overlay = inject(Overlay);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly ariaDescriber = inject(AriaDescriber);
  private readonly focusMonitor = inject(FocusMonitor);

  // --- Entradas (Inputs) ---
  readonly open = model(false);
  readonly openDelay = input(0); // Delay em ms para abrir
  readonly closeDelay = input(150); // Delay em ms para fechar

  // --- Referências ---
  private contentTemplate = contentChild.required(BrTooltipContentDirective, {
    read: TemplateRef,
  });
  private overlayRef: OverlayRef | null = null;
  private hideTimeoutId: any;
  private showTimeoutId: any;

  constructor() {
    // Monitora o foco no elemento para acionar o tooltip via teclado
    this.focusMonitor.monitor(this.elementRef).subscribe((origin) => {
      if (origin) {
        // 'mouse', 'keyboard', 'touch', 'program'
        this.show();
      } else {
        // null, significa que perdeu o foco
        this.hide();
      }
    });

    // Reage a mudanças no estado 'open' para criar/destruir o tooltip
    effect((onCleanup) => {
      if (this.open()) {
        this.createTooltip();
      } else {
        this.destroyTooltip();
      }
      onCleanup(() => this.destroyTooltip());
    });
  }

  show(): void {
    clearTimeout(this.hideTimeoutId); // Cancela qualquer fechamento pendente
    this.showTimeoutId = setTimeout(
      () => this.open.set(true),
      this.openDelay()
    );
  }

  hide(): void {
    clearTimeout(this.showTimeoutId); // Cancela qualquer abertura pendente
    this.hideTimeoutId = setTimeout(
      () => this.open.set(false),
      this.closeDelay()
    );
  }

  private createTooltip(): void {
    if (this.overlayRef) return;

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: -8,
        },
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetY: 8,
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      panelClass: 'br-tooltip-panel',
    });
    const portal = new TemplatePortal(
      this.contentTemplate(),
      this.viewContainerRef
    );
    const viewRef = this.overlayRef.attach(portal);

    // Usa o AriaDescriber para associar o conteúdo ao gatilho
    // viewRef.rootNodes[0] é o nosso painel de tooltip
    //@ts-expect-error
    this.ariaDescriber.describe(this.elementRef, viewRef.rootNodes[0]);
  }

  private destroyTooltip(): void {
    // Usa o AriaDescriber para remover a associação
    this.ariaDescriber.removeDescription(
      //@ts-expect-error
      this.elementRef,
      this.contentTemplate().elementRef
    );
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
