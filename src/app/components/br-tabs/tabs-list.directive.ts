import { AfterContentInit, Directive, contentChildren } from '@angular/core';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { BrTabTriggerDirective } from './tabs-trigger.directive'; // Criaremos a seguir

@Directive({
  selector: '[brTabList]',
  standalone: true,
  host: {
    // 1. Define o papel semântico para acessibilidade.
    role: 'tablist',

    // 2. Ouve por eventos de teclado e os delega para o FocusKeyManager.
    '(keydown)': 'keyManager?.onKeydown($event)',
  },
})
export class BrTabListDirective implements AfterContentInit {
  // 3. Obtém uma lista de todas as diretivas brTabTrigger filhas.
  private triggers = contentChildren(BrTabTriggerDirective);

  // Nossa instância do gerenciador de foco do CDK.
  protected keyManager: FocusKeyManager<BrTabTriggerDirective> | null = null;

  ngAfterContentInit(): void {
    // 4. Inicializa o FocusKeyManager após o conteúdo ser carregado.
    this.keyManager = new FocusKeyManager(this.triggers())
      .withWrap() // Permite voltar do último para o primeiro
      .withHorizontalOrientation('ltr'); // Habilita as setas Esquerda/Direita
  }
}
