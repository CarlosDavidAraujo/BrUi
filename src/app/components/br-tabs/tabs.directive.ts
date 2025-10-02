import { Directive, model } from '@angular/core';

@Directive({
  selector: '[brTabs]',
  standalone: true,
  exportAs: 'brTabs',
})
export class BrTabsDirective {
  /**
   * O model que mantém o identificador (ID) da aba atualmente ativa.
   * Permite o uso de two-way data binding [(activeTab)]="...".
   * O valor pode ser string (um ID de aba) ou null (nenhuma aba selecionada).
   */
  readonly activeTab = model<string | null>(null);

  /**
   * API pública para que as diretivas filhas (os gatilhos) possam
   * solicitar a mudança da aba ativa.
   * @param tabId O identificador da aba a ser ativada.
   */
  selectTab(tabId: string): void {
    this.activeTab.set(tabId);
  }
}
