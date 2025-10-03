import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  input,
} from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';
import { BrSelectComponent } from './select.component';

@Component({
  selector: 'br-option',
  standalone: true,
  template: `<ng-content></ng-content>`,
  host: {
    role: 'option',
    '(click)': 'selectOption()',
    '[attr.aria-selected]': 'isSelected()',
    '[class.bg-slate-100]': 'isSelected()',
    class: 'block',
    tabindex: '-1',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrOptionComponent implements FocusableOption {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly selectComponent = inject(BrSelectComponent);

  /** O valor associado a esta opção. */
  readonly value = input.required<any>({ alias: 'value' });

  /** O texto visível da opção. */
  get viewValue(): string {
    return this.elementRef.nativeElement.textContent?.trim() ?? '';
  }

  /** Verifica se esta opção é a que está selecionada no componente pai. */
  readonly isSelected = computed(() =>
    this.selectComponent.selectionModel.isSelected(this.value())
  );

  /** Implementação da FocusableOption: permite que o FocusKeyManager foque este elemento. */
  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  /** Comunica ao pai que esta opção foi selecionada. */
  selectOption(): void {
    this.selectComponent.selectionModel.select(this.value());
    this.selectComponent.close();
  }
}
