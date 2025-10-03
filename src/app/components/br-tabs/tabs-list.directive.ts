import {
  AfterContentInit,
  Directive,
  computed,
  contentChildren,
  input,
} from '@angular/core';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { BrTabTriggerDirective } from './tabs-trigger.directive'; // Criaremos a seguir
import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';

@Directive({
  selector: '[brTabList]',
  standalone: true,
  host: {
    // 1. Define o papel semântico para acessibilidade.
    role: 'tablist',
    '[class]': 'finalClasses()',

    // 2. Ouve por eventos de teclado e os delega para o FocusKeyManager.
    '(keydown)': 'keyManager?.onKeydown($event)',
  },
})
export class BrTabListDirective implements AfterContentInit {
  customClass = input<ClassValue>('', { alias: 'class' });

  // 3. Obtém uma lista de todas as diretivas brTabTrigger filhas.
  private triggers = contentChildren(BrTabTriggerDirective);

  // Nossa instância do gerenciador de foco do CDK.
  protected keyManager: FocusKeyManager<BrTabTriggerDirective> | null = null;

  finalClasses = computed(() =>
    cn(
      'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
      this.customClass()
    )
  );

  ngAfterContentInit(): void {
    // 4. Inicializa o FocusKeyManager após o conteúdo ser carregado.
    this.keyManager = new FocusKeyManager(this.triggers())
      .withWrap() // Permite voltar do último para o primeiro
      .withHorizontalOrientation('ltr'); // Habilita as setas Esquerda/Direita
  }
}
