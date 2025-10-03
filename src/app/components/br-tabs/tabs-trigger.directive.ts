import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';
import { BrTabsDirective } from './tabs.directive';
import { cn } from '@/lib/utils';

@Directive({
  selector: 'button[brTabTrigger]',
  standalone: true,
  host: {
    role: 'tab',
    '(click)': 'selectTab()',
    '[attr.data-state]': 'isActive() ? "active" : "inactive"',
    '[class]': 'finalClasses()',

    //Acessibilidade
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
  readonly customClass = input<string>('', { alias: 'class' });

  finalClasses = computed(() =>
    cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
      this.customClass()
    )
  );

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
