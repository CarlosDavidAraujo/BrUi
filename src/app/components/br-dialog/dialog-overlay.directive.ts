import { Directive, ElementRef, inject } from '@angular/core';
import { BrDialogDirective } from './dialog.directive';

@Directive({
  selector: '[brDialogOverlay]',
  standalone: true,
  host: {
    // 1. Ouve o evento de clique e chama um método para tratá-lo
    '(click)': 'handleClick($event)',
    class:
      'fixed inset-0 bg-black/50 data-[state=open]:animate-overlay-show data-[state=closed]:animate-overlay-hide',
  },
})
export class BrDialogOverlayDirective {
  // Injeta o controlador principal do diálogo para poder fechá-lo
  protected readonly dialog = inject(BrDialogDirective);
  // Injeta uma referência ao seu próprio elemento no DOM
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  protected handleClick(event: MouseEvent): void {
    // 2. Lógica para evitar o fechamento indesejado
    //    Verifica se o alvo do clique (event.target) é exatamente
    //    o próprio elemento do overlay, e não um filho dele (como o painel do diálogo).
    if (event.target === this.elementRef.nativeElement) {
      this.dialog.close();
    }
  }
}
