import { Directive, computed, inject, input } from '@angular/core';
import { BrTabsDirective } from './tabs.directive';

@Directive({
  selector: '[brTabContent]',
  standalone: true,
  host: {
    role: 'tabpanel',
    '[hidden]': '!isActive()',
    '[id]': 'id',
    '[attr.aria-labelledby]': 'triggerId',
    tabIndex: '0',
  },
})
export class BrTabContentDirective {
  // --- Injeções e Input ---
  private readonly tabsManager = inject(BrTabsDirective);

  /** O identificador único para este painel de conteúdo. */
  readonly brTabContent = input.required<string>();

  // --- Estado Derivado ---
  /** Signal computado que verifica se este painel deve estar ativo. */
  readonly isActive = computed(
    () => this.tabsManager.activeTab() === this.brTabContent()
  );

  // --- IDs para Acessibilidade ---
  /** ID único para o próprio painel de conteúdo. */
  get id(): string {
    return `br-tab-content-${this.brTabContent()}`;
  }

  /** ID do gatilho que rotula este painel (por convenção). */
  get triggerId(): string {
    return `br-tab-trigger-${this.brTabContent()}`;
  }
}
