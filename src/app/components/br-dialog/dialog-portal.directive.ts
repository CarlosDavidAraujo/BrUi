import { Directive } from '@angular/core';

@Directive({
  selector: 'ng-template[brDialogPortal]', // Seletor mais específico
  standalone: true,
})
export class BrDialogPortalDirective {
  // Esta diretiva não precisa de nenhuma lógica.
  // Ela serve apenas como um token para ser consultada pela BrDialogDirective.
}
