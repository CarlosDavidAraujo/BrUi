import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';
import { BrTabsDirective } from './tabs.directive';

@Directive({
  selector: 'button[brTabTrigger]',
  standalone: true,
  host: {
    role: 'tab',
    '(click)': 'selectTab()',
    '[attr.data-state]': 'isActive() ? "active" : "inactive"',
    '[attr.aria-selected]': 'isActive()',
    '[attr.tabindex]': 'isActive() ? 0 : -1',
    '[id]': 'id',
    '[attr.aria-controls]': 'contentId',
  },
})
export class BrTabTriggerDirective implements FocusableOption {
  // --- Injeções de Dependência ---
  private readonly tabsManager = inject(BrTabsDirective);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  // --- Input e IDs ---
  /** O identificador único para esta aba. */
  readonly brTabTrigger = input.required<string>();

  get id(): string {
    return `br-tab-trigger-${this.brTabTrigger()}`;
  }

  /** ID do painel de conteúdo que este gatilho controla. */
  get contentId(): string {
    return `br-tab-content-${this.brTabTrigger()}`;
  }

  // --- Estado Derivado ---
  /** Signal computado que verifica se esta aba é a que está ativa. */
  readonly isActive = computed(
    () => this.tabsManager.activeTab() === this.brTabTrigger()
  );

  // --- Métodos ---
  /** Notifica o gerenciador principal para ativar esta aba. */
  selectTab(): void {
    this.tabsManager.selectTab(this.brTabTrigger());
  }

  /** Implementação da interface FocusableOption para o FocusKeyManager. */
  focus(): void {
    this.elementRef.nativeElement.focus();
  }
}
