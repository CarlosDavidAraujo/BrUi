import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewContainerRef,
  contentChild,
  contentChildren,
  effect,
  forwardRef,
  inject,
  signal,
  computed,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { BrSelectContentDirective } from './select-content.directive';
import { BrOptionComponent } from './select-option.component';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { BrSelectTriggerDirective } from './select-trigger.directive';

@Component({
  selector: 'br-select',
  standalone: true,
  template: `<ng-content></ng-content>`,
  exportAs: 'brSelect',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BrSelectComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrSelectComponent
  implements ControlValueAccessor, AfterContentInit
{
  // --- Injeções de Dependência ---
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);

  // --- Gerenciamento de Estado ---
  readonly #isOpen = signal(false);
  readonly isOpen = this.#isOpen.asReadonly();
  readonly selectionModel = new SelectionModel<any>(false, [null]);
  private keyManager: FocusKeyManager<BrOptionComponent> | null = null;
  private overlayRef: OverlayRef | null = null;

  // --- Referências aos Filhos ---
  private trigger = contentChild.required(BrSelectTriggerDirective);
  private content = contentChild(BrSelectContentDirective);
  private options = contentChildren(BrOptionComponent);

  // --- Valor Exibido ---
  readonly displayValue = computed<string | null>(() => {
    const selectedValue = this.selectionModel.selected[0];
    if (selectedValue == null) return null;
    const selectedOption = this.options().find(
      (opt) => opt.value() === selectedValue
    );
    // Retorna o texto da opção, ou o valor bruto como fallback.
    return selectedOption?.viewValue ?? String(selectedValue);
  });

  constructor() {
    // Reage ao estado aberto/fechado para gerenciar o overlay
    effect(() => {
      if (this.isOpen()) {
        this.openPanel();
      } else {
        this.closePanel();
      }
    });

    // Notifica o Angular Forms quando a seleção muda
    this.selectionModel.changed.subscribe((change) => {
      this.onChange(change.added[0]);
      this.onTouched();
    });
  }

  ngAfterContentInit(): void {
    this.keyManager = new FocusKeyManager(this.options()).withWrap();
  }

  // --- API para controle de estado ---
  toggle() {
    this.#isOpen.update((v) => !v);
  }
  open() {
    this.#isOpen.set(true);
  }
  close() {
    this.#isOpen.set(false);
  }

  // --- Lógica do Overlay ---
  private openPanel(): void {
    const triggerEl = this.trigger().elementRef.nativeElement;
    if (!triggerEl || !this.content()) return;

    const triggerWidth = triggerEl.getBoundingClientRect().width;

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(triggerEl)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      width: triggerWidth,
    });
    const portal = new TemplatePortal(
      this.content()!.templateRef,
      this.viewContainerRef
    );
    this.overlayRef.attach(portal);

    // Fecha o painel ao clicar fora
    this.overlayRef.backdropClick().subscribe(() => this.close());

    this.overlayRef.keydownEvents().subscribe((event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault(); // Previne o scroll da página
        this.keyManager?.onKeydown(event);
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.keyManager?.activeItem?.selectOption();
      } else if (event.key === 'Escape') {
        this.close();
      }
    });

    // Foca a primeira opção ao abrir
    setTimeout(() => this.keyManager?.setFirstItemActive());
  }

  private closePanel(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  // --- Implementação do CVA (sem mudanças) ---
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  writeValue(value: any): void {
    this.selectionModel.select(value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
