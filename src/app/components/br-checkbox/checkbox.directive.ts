import {
  Directive,
  Input,
  booleanAttribute,
  computed,
  forwardRef,
  input,
  model,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type CheckboxState = 'checked' | 'unchecked' | 'indeterminate';
export type AriaChecked = 'true' | 'false' | 'mixed';

@Directive({
  selector: 'button[brCheckbox]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BrCheckboxDirective),
      multi: true,
    },
  ],
  host: {
    // --- Comportamento ---
    '(click)': 'toggle()',
    '(keydown.space)': 'onSpaceKey($event)',

    // --- Acessibilidade (ARIA) ---
    role: 'checkbox',
    '[attr.aria-checked]': 'ariaCheckedValue()',
    '[attr.aria-disabled]': 'disabled()',

    // --- Bindings para o DOM ---
    '[attr.data-state]': 'dataState()',
    '[attr.disabled]': 'disabled() ? "" : null',
    '[attr.tabindex]': '0',
  },
})
export class BrCheckboxDirective implements ControlValueAccessor {
  // --- Entradas (Inputs) ---
  readonly checked = model<boolean>(false);
  readonly indeterminate = input<boolean>(false);
  readonly #disabled = signal(false);
  readonly disabled = this.#disabled.asReadonly();

  @Input({ transform: booleanAttribute, alias: 'disabled' })
  set disabledInput(value: boolean) {
    this.#disabled.set(value);
  }

  // --- Estado Derivado (Computed Signals) ---

  // Calcula o estado para o atributo data-state, usado para estilização
  readonly dataState = computed<CheckboxState>(() => {
    if (this.indeterminate()) {
      return 'indeterminate';
    }
    return this.checked() ? 'checked' : 'unchecked';
  });

  // Calcula o valor para o atributo aria-checked, usado por leitores de tela
  readonly ariaCheckedValue = computed<AriaChecked>(() => {
    if (this.indeterminate()) {
      return 'mixed'; // O valor ARIA para o estado indeterminado
    }
    return this.checked() ? 'true' : 'false';
  });

  /*  // --- Lógica de Interação ---
  protected toggle(): void {
    if (this.disabled()) {
      return;
    }
    // O clique do usuário sempre resolve o estado indeterminado
    if (this.indeterminate()) {
      this.checked.set(true);
    } else {
      this.checked.update((value) => !value);
    }
  }

  protected onSpaceKey(event: Event): void {
    event.preventDefault(); // Previne que a página role
    this.toggle();
  } */

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  /**
   * Chamado pelo Forms API para escrever um valor no nosso componente.
   */
  writeValue(value: boolean): void {
    this.checked.set(!!value);
  }

  /**
   * O Angular nos dá uma função de callback para registrar mudanças.
   */
  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  /**
   * O Angular nos dá uma função de callback para registrar o "toque".
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Chamado pelo Forms API para desabilitar o componente.
   */
  setDisabledState(isDisabled: boolean): void {
    this.#disabled.set(isDisabled);
  }

  // --- Lógica de Interação Atualizada ---
  protected toggle(): void {
    if (this.disabled()) {
      return;
    }

    if (this.indeterminate()) {
      this.checked.set(true);
    } else {
      this.checked.update((value) => !value);
    }

    // 5. Notificar o Angular Forms sobre a mudança de valor e o toque.
    this.onChange(this.checked());
    this.onTouched();
  }

  protected onSpaceKey(event: Event): void {
    event.preventDefault();
    this.toggle();
  }
}
