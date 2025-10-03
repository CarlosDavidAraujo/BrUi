import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  Renderer2,
  ViewContainerRef,
  contentChild,
  contentChildren,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { FocusKeyManager } from '@angular/cdk/a11y';

// Importando nossos esqueletos
import { BrDropdownMenuTriggerDirective } from './dropdown-menu-trigger.directive';
import { BrDropdownMenuContentDirective } from './dropdown-menu-content.directive';
import { BrDropdownMenuItemDirective } from './dropdown-menu-item.directive';

@Component({
  selector: 'br-dropdown-menu',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrDropdownMenuComponent implements AfterContentInit {
  // --- Injeções e Estado ---
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly renderer = inject(Renderer2);

  readonly #isOpen = signal(false);
  readonly isOpen = this.#isOpen.asReadonly();

  private overlayRef: OverlayRef | null = null;
  private keyManager: FocusKeyManager<BrDropdownMenuItemDirective> | null =
    null;
  private triggerElement: HTMLElement | null = null;

  // --- Referências aos Filhos ---
  private trigger = contentChild.required(BrDropdownMenuTriggerDirective);
  private content = contentChild.required(BrDropdownMenuContentDirective);
  private items = contentChildren(BrDropdownMenuItemDirective);

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        this.openMenu();
      } else {
        this.closeMenu();
      }
    });
  }

  ngAfterContentInit(): void {
    this.keyManager = new FocusKeyManager(this.items()).withWrap();

    // --- MUDANÇA AQUI ---
    // Ouve as mudanças de item ativo do FocusKeyManager
    this.keyManager.change.subscribe((activeIndex) => {
      this.items().forEach((item, index) => {
        if (index === activeIndex) {
          // Adiciona a classe de 'ativo' ao item focado
          this.renderer.addClass(
            item['elementRef'].nativeElement,
            'br-menu-item-active'
          );
        } else {
          // Remove a classe dos outros itens
          this.renderer.removeClass(
            item['elementRef'].nativeElement,
            'br-menu-item-active'
          );
        }
      });
    });
  }

  // --- API Pública ---
  toggle(): void {
    this.#isOpen.update((v) => !v);
  }
  open(): void {
    this.#isOpen.set(true);
  }
  close(): void {
    this.#isOpen.set(false);
  }

  // --- Lógica Interna ---
  private openMenu(): void {
    const triggerEl = this.trigger().elementRef.nativeElement;
    this.triggerElement = triggerEl; // Salva o gatilho para devolver o foco

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(triggerEl)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 8,
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    const portal = new TemplatePortal(
      this.content().templateRef,
      this.viewContainerRef
    );
    this.overlayRef.attach(portal);

    this.overlayRef.backdropClick().subscribe(() => this.close());

    // Conecta a navegação por teclado
    this.overlayRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.close();
      } else {
        this.keyManager?.onKeydown(event);
      }
    });

    // Foca o primeiro item ao abrir
    setTimeout(() => this.keyManager?.setFirstItemActive());
  }

  private closeMenu(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
    // Devolve o foco para o gatilho, essencial para acessibilidade
    this.triggerElement?.focus();
  }
}
