import { Directive } from '@angular/core';

@Directive({
  selector: '[brDialogDescription]',
  standalone: true,
  host: {
    '[id]': 'id',
    class: 'mt-2 text-sm text-slate-600',
  },
})
export class BrDialogDescriptionDirective {
  // Um contador estático para garantir IDs únicos
  private static nextId = 0;

  // A propriedade 'id' pública que a BrDialogPanelDirective irá ler
  readonly id = `br-dialog-description-${BrDialogDescriptionDirective.nextId++}`;
}
