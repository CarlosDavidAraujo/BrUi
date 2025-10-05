import { cn } from '@/lib/utils';
import {
  Component,
  forwardRef,
  input,
  signal,
  computed,
  booleanAttribute,
  model,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ClassValue } from 'clsx';

export type CheckboxState = 'checked' | 'unchecked' | 'indeterminate';
export type AriaChecked = 'true' | 'false' | 'mixed';

@Component({
  selector: 'br-checkbox',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BrCheckboxComponent),
      multi: true,
    },
  ],
  // 3. Acessibilidade e eventos foram movidos para o <button>
  template: `
    <button
      type="button"
      [class]="finalClass()"
      (click)="toggle()"
      role="checkbox"
      [attr.aria-checked]="ariaCheckedValue()"
      [attr.data-state]="dataState()"
      [disabled]="disabled()"
    >
      @if (indeterminate()) {
        <i class="fa-solid fa-minus"></i>
      } @else {
        <i class="fa-solid fa-check" [class.opacity-0]="!checked()"></i>
      }
    </button>
  `,
  // O host agora é apenas um container simples
  host: {
    '[class]': 'hostClass',
  },
})
export class BrCheckboxComponent implements ControlValueAccessor {
  // --- Entradas (Inputs) ---
  readonly checked = model(false);
  readonly indeterminate = input<boolean>(false);
  readonly customClass = input<ClassValue>('', { alias: 'class' });

  // 1. Input 'disabled' simplificado
  readonly disabled = input<boolean, string | boolean>(false, {
    transform: booleanAttribute,
  });

  // --- Estado Derivado (Computed Signals) ---
  readonly hostClass = 'inline-block align-middle'; // Para o container

  readonly finalClass = computed(() =>
    cn(
      'w-6 h-6 rounded-sm border flex items-center justify-center text-primary cursor-pointer data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground disabled:opacity-45 disabled:cursor-not-allowed',
      this.customClass(),
    ),
  );

  readonly dataState = computed<CheckboxState>(() => {
    if (this.indeterminate()) return 'indeterminate';
    return this.checked() ? 'checked' : 'unchecked';
  });

  readonly ariaCheckedValue = computed<AriaChecked>(() => {
    if (this.indeterminate()) return 'mixed';
    return this.checked() ? 'true' : 'false';
  });

  // --- CVA ---
  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: boolean): void {
    this.checked.set(!!value);
  }
  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {}

  // --- Lógica de Interação ---
  protected toggle(): void {
    if (this.disabled()) return;

    let newValue = true;
    if (!this.indeterminate()) {
      newValue = !this.checked();
    }

    this.checked.set(newValue);
    this.onChange(newValue);
    this.onTouched();
  }
}
