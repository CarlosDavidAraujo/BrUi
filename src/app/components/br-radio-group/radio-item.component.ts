import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  input,
} from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';
import { BrRadioGroupComponent } from './radio-group.component';
import { cn } from 'src/lib/utils'; // Usando nosso helper de classes

@Component({
  selector: 'br-radio-item',
  standalone: true,
  template: `
    <button
      type="button"
      role="radio"
      [attr.aria-checked]="isChecked()"
      [attr.data-state]="isChecked() ? 'checked' : 'unchecked'"
      [attr.aria-disabled]="radioGroup.disabled() ? 'true' : 'false'"
      [class]="radioClasses()"
    >
      <div [class]="indicatorClasses()"></div>
    </button>
    <label [class]="labelClasses()"><ng-content></ng-content></label>
  `,
  host: {
    '(click)': 'select()',
    '[class]': 'hostClasses()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrRadioItemComponent implements FocusableOption {
  protected readonly elementRef = inject(ElementRef<HTMLElement>);
  // Injeta o componente pai para comunicação
  protected readonly radioGroup = inject(BrRadioGroupComponent, {
    // Adicionado para referência, mas o padrão é false
    optional: false,
  });

  /** O valor único desta opção de rádio. */
  readonly value = input.required<any>();

  disabled = false;

  /** Signal computado que verifica se esta opção está selecionada. */
  readonly isChecked = computed(() => this.radioGroup.value() === this.value());

  /** Implementação do FocusableOption: permite que o KeyManager foque este elemento. */
  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  /** Notifica o grupo pai que esta opção foi selecionada. */
  select(): void {
    if (this.disabled) return;

    // 1. Mudamos de 'writeValue' para um método dedicado a selecionar.
    this.radioGroup.selectValue(this.value());
  }

  // --- Lógica de Estilo com `cn` ---
  protected hostClasses = computed(() =>
    cn('flex items-center space-x-2 relative')
  );

  protected labelClasses = computed(() =>
    cn(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
    )
  );

  protected radioClasses = computed(() =>
    cn(
      'peer h-4 w-4 shrink-0 rounded-full border border-slate-900 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
    )
  );

  protected indicatorClasses = computed(() =>
    cn(
      'aspect-square h-full w-full flex items-center justify-center after:block after:h-2.5 after:w-2.5 after:rounded-full after:bg-slate-900 after:content-[""]',
      this.isChecked() ? 'opacity-100' : 'opacity-0'
    )
  );
}
