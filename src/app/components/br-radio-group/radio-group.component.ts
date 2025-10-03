import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  signal,
  contentChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { BrRadioItemComponent } from './radio-item.component';

@Component({
  selector: 'br-radio-group',
  standalone: true,
  template: `<ng-content></ng-content>`,
  host: {
    role: 'radiogroup',
    '(keydown)': 'onKeydown($event)', // Ouve os eventos de teclado
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BrRadioGroupComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrRadioGroupComponent
  implements ControlValueAccessor, AfterContentInit
{
  // --- Estado ---
  readonly #value = signal<any>(null);
  readonly value = this.#value.asReadonly();
  readonly disabled = signal(false);

  // --- Filhos e Navegação ---
  private items = contentChildren(BrRadioItemComponent);
  private keyManager: FocusKeyManager<BrRadioItemComponent> | null = null;

  ngAfterContentInit(): void {
    // 1. Configura o FocusKeyManager após os filhos serem carregados.
    this.keyManager = new FocusKeyManager(this.items()).withWrap();

    // 2. Opcional, mas melhora a acessibilidade: quando o foco muda, seleciona o item.
    this.keyManager.change.subscribe((activeIndex) => {
      if (activeIndex == null) return;
      const activeItem = this.items()[activeIndex];
      if (activeItem) {
        this.selectValue(activeItem.value());
      }
    });
  }

  // --- Comunicação com Filhos ---
  selectValue(value: any): void {
    if (this.disabled()) return;
    this.writeValue(value); // Atualiza o estado interno
    this.onChange(value); // Notifica o Angular Forms
    this.onTouched();
  }

  // --- CVA ---
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.#value.set(value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
    // Propaga o estado 'disabled' para todos os filhos
    this.items().forEach((item) => (item.disabled = isDisabled));
  }

  // --- Eventos de Teclado ---
  onKeydown(event: KeyboardEvent): void {
    this.keyManager?.onKeydown(event);
  }
}
