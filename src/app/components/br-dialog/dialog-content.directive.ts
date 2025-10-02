import { Directive } from '@angular/core';

@Directive({
  selector: 'ng-template[brDialogContent]', // Seletor mais específico
  standalone: true,
})
export class BrDialogContentDirective {
  // Esta diretiva não precisa de nenhuma lógica.
  // Ela serve apenas como um token para ser consultada pela BrDialogDirective.
}
