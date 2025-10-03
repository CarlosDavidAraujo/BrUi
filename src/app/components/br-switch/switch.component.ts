import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cn } from 'src/lib/utils';

@Component({
  selector: 'br-switch',
  standalone: true,
  template: `
    <span [class]="trackClasses()">
      <span [class]="thumbClasses()"></span>
    </span>
  `,
  host: {
    // 2. Tornamos o componente focável e adicionamos listeners
    tabindex: '0',
    '(click)': 'toggle()',
    '(keydown.enter)': 'toggle()',
    '(keydown.space)': 'toggle()',
    '[class]': 'hostClasses()',
    // 3. Atributos de acessibilidade
    role: 'switch',
    '[attr.aria-checked]': 'isChecked()',
    '[attr.aria-disabled]': 'isDisabled()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BrSwitchComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrSwitchComponent implements ControlValueAccessor {
  // --- Estado Interno ---
  readonly #isChecked = signal(false);
  readonly isChecked = this.#isChecked.asReadonly();
  readonly isDisabled = signal(false);

  // Captura classes customizadas do usuário
  readonly userClass = input<string>('', { alias: 'class' });

  // --- Implementação do ControlValueAccessor ---
  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: boolean): void {
    this.#isChecked.set(!!value); // Garante que o valor seja booleano
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  // --- Lógica de Interação ---
  toggle(): void {
    if (this.isDisabled()) return;

    this.#isChecked.update((v) => !v);
    this.onChange(this.isChecked());
    this.onTouched();
  }

  // --- Lógica de Estilo com `cn` ---
  // 4. Signals computados para gerar as classes dinâmicas

  protected hostClasses = computed(() =>
    cn(
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
      this.userClass()
    )
  );

  protected trackClasses = computed(() =>
    cn(
      'inline-block h-full w-full rounded-full',
      this.isChecked() ? 'bg-slate-900' : 'bg-slate-200'
    )
  );

  protected thumbClasses = computed(() =>
    cn(
      'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform',
      this.isChecked() ? 'translate-x-5' : 'translate-x-0'
    )
  );
}
