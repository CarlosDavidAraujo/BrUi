import { Directive } from '@angular/core';

@Directive({
  selector: '[brDialogTitle]',
  standalone: true,
  host: {
    // 1. Vincula a propriedade 'id' da classe ao atributo 'id' do elemento HTML
    '[id]': 'id',
    class: 'text-lg font-semibold text-slate-900',
  },
})
export class BrDialogTitleDirective {
  // 2. Um contador estático para garantir que cada título de diálogo tenha um ID único
  private static nextId = 0;

  // 3. A propriedade 'id' pública que a BrDialogPanelDirective irá ler
  readonly id = `br-dialog-title-${BrDialogTitleDirective.nextId++}`;
}
