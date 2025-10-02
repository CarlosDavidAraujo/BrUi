import {
  contentChild,
  Directive,
  effect,
  inject,
  model,
  TemplateRef,
} from '@angular/core';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { BrDialogContentDirective } from './dialog-content.directive'; // Criaremos a seguir

// Exportamos o tipo de estado para consistência
export type DialogState = 'isOpen' | 'closed';

@Directive({
  selector: '[brDialog]',
  standalone: true,
  // Exportamos a diretiva para que o template possa obter uma referência a ela.
  // Ex: <div brDialog #dialog="brDialog">
  exportAs: 'brDialog',
})
export class BrDialogDirective {
  private readonly dialogService = inject(Dialog);

  // Sinal para gerenciar o estado do diálogo (aberto/fechado)
  readonly isOpen = model<boolean>(false);

  // Referência à instância do diálogo do CDK quando ele estiver aberto
  private dialogRef: DialogRef<unknown> | null = null;

  // Encontra o <ng-template> que está marcado com a diretiva brDialogContent
  private dialogTemplate = contentChild(BrDialogContentDirective, {
    read: TemplateRef,
  });

  constructor() {
    // 3. Criamos um effect para reagir a mudanças no model 'isOpen'
    //    Isso permite que o diálogo seja aberto/fechado externamente.
    effect(
      () => {
        if (this.isOpen()) {
          this.openDialog(); // Abre se o model for 'true'
        } else {
          this.closeDialog(); // Fecha se o model for 'false'
        }
      },
      { allowSignalWrites: true } // Necessário porque o 'close' pode alterar o signal 'isOpen'
    );
  }

  // Ação de abrir, apenas atualiza o model. O effect cuidará da lógica.
  open(): void {
    this.isOpen.set(true);
  }

  // Ação de fechar, apenas atualiza o model. O effect cuidará da lógica.
  close(): void {
    this.isOpen.set(false);
  }

  private openDialog(): void {
    if (this.dialogRef) {
      return; // Já está aberto
    }
    //@ts-expect-error
    this.dialogRef = this.dialogService.open(this.dialogTemplate());
    this.dialogRef?.closed.subscribe(() => {
      // Quando o CDK fecha o diálogo (ex: tecla ESC),
      // nós atualizamos nosso model para refletir a mudança.
      this.isOpen.set(false);
      this.dialogRef = null;
    });
  }

  // Lógica interna para fechar o diálogo (chamada pelo effect)
  private closeDialog(): void {
    if (!this.dialogRef) {
      return; // Já está fechado
    }
    this.dialogRef.close();
  }
}
