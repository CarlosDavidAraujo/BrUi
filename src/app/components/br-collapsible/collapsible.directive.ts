import { Directive, booleanAttribute, computed, model } from '@angular/core';

// Exportamos o tipo de estado para consistência
export type CollapsibleState = 'open' | 'closed';

@Directive({
  selector: '[brCollapsible]',
  standalone: true,
  exportAs: 'brCollapsible',
  host: {
    // Aplica o data-state no próprio container, permitindo estilizar
    '[attr.data-state]': 'dataState()',
  },
})
export class BrCollapsibleDirective {
  // 1. O estado principal, usando model() para two-way binding [(open)]
  readonly open = model(false);

  // 2. Um contador para garantir IDs únicos para o atributo aria-controls
  private static nextId = 0;
  readonly contentId = `br-collapsible-content-${BrCollapsibleDirective.nextId++}`;

  // 3. Um estado derivado para o atributo data-state
  readonly dataState = computed<CollapsibleState>(() =>
    this.open() ? 'open' : 'closed'
  );

  // --- API Pública ---
  toggle(): void {
    this.open.update((value) => !value);
  }
}
