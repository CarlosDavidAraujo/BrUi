import {
  Directive,
  ElementRef,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  contentChild,
  effect,
  inject,
  input,
  model,
} from '@angular/core';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subscription } from 'rxjs';
import { AriaDescriber, FocusMonitor } from '@angular/cdk/a11y';
import {
  BrTooltipContentDirective,
  tooltipContentVariants,
} from './tooltip-content.directive';

@Directive({
  selector: '[brTooltipTrigger]',
  standalone: true,
  host: {
    '(mouseenter)': 'show()',
    '(mouseleave)': 'hide()',
  },
})
export class BrTooltipTriggerDirective implements OnDestroy {
  // --- Injeções de Dependência ---
  private readonly overlay = inject(Overlay);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly ariaDescriber = inject(AriaDescriber);
  private readonly focusMonitor = inject(FocusMonitor);

  // --- Entradas (Inputs) ---
  readonly open = model(false);
  readonly openDelay = input(0); // Delay em ms para abrir
  readonly closeDelay = input(100); // Delay em ms para fechar
  readonly position = input<'top' | 'bottom' | 'left' | 'right'>('top');

  // --- Referências ---
  private contentTemplate = contentChild.required(BrTooltipContentDirective, {
    read: TemplateRef,
  });
  private readonly contentDirective = contentChild.required(
    BrTooltipContentDirective,
  );
  private overlayRef: OverlayRef | null = null;
  private hideTimeoutId: any;
  private showTimeoutId: any;
  private readonly focusMonitorSub: Subscription;

  constructor() {
    // Monitora o foco no elemento para acionar o tooltip via teclado
    this.focusMonitorSub = this.focusMonitor
      .monitor(this.elementRef)
      .subscribe((origin) => {
        if (origin) {
          // 'mouse', 'keyboard', 'touch', 'program'
          this.show();
        } else {
          // null, significa que perdeu o foco
          this.hide();
        }
      });

    effect(() => {
      this.ariaDescriber.describe(
        this.elementRef.nativeElement,
        this.open() ? this.getTooltipText() : '',
      );
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

  ngOnDestroy(): void {
    this.focusMonitorSub.unsubscribe();
    this.focusMonitor.stopMonitoring(this.elementRef);
  }

  show(): void {
    clearTimeout(this.hideTimeoutId); // Cancela qualquer fechamento pendente
    this.hideTimeoutId = undefined;
    if (!this.showTimeoutId) {
      this.showTimeoutId = setTimeout(
        () => this.open.set(true),
        this.openDelay(),
      );
    }
  }

  hide(): void {
    clearTimeout(this.showTimeoutId); // Cancela qualquer abertura pendente
    this.showTimeoutId = undefined;
    if (!this.hideTimeoutId) {
      this.hideTimeoutId = setTimeout(
        () => this.open.set(false),
        this.closeDelay(),
      );
    }
  }

  private createTooltip(): void {
    if (this.overlayRef) return;

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions(this.getPositions());

    this.overlayRef = this.overlay.create({
      positionStrategy,
      panelClass: this.contentDirective()
        .finalClasses()
        .split(' ')
        .concat([
          'z-50',
          'overflow-hidden',
          'rounded-md',
          'px-3',
          'py-1.5',
          'animate-in',
          'fade-in-0',
          'zoom-in-95',
          `data-[side=bottom]:slide-in-from-top-2`,
          `data-[side=left]:slide-in-from-right-2`,
          `data-[side=right]:slide-in-from-left-2`,
          `data-[side=top]:slide-in-from-bottom-2`,
        ]),
    });
    const portal = new TemplatePortal(
      this.contentTemplate(),
      this.viewContainerRef,
    );
    this.overlayRef.attach(portal);
    // Add `data-side` to the overlay panel for animations
    this.overlayRef.overlayElement.setAttribute('data-side', this.position());
  }

  private destroyTooltip(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  private getTooltipText(): string {
    // Extrai o texto do ng-template para o aria-describedby
    const template = this.contentTemplate();
    const rootNode = template.createEmbeddedView(null).rootNodes[0];
    return rootNode?.textContent?.trim() ?? '';
  }

  private getPositions(): ConnectedPosition[] {
    // Maps position to preferred CDK connected positions
    const positionMap: Record<string, ConnectedPosition[]> = {
      top: [
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: -8,
        },
      ],
      bottom: [
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetY: 8,
        },
      ],
      left: [
        {
          originX: 'start',
          originY: 'center',
          overlayX: 'end',
          overlayY: 'center',
          offsetX: -8,
        },
      ],
      right: [
        {
          originX: 'end',
          originY: 'center',
          overlayX: 'start',
          overlayY: 'center',
          offsetX: 8,
        },
      ],
    };

    // Fallback positions
    const fallback: Record<string, ConnectedPosition[]> = {
      top: positionMap['bottom'],
      bottom: positionMap['top'],
    };
    return [
      ...(positionMap[this.position()] || positionMap['top']),
      ...(fallback[this.position()] || []),
    ];
  }
}
