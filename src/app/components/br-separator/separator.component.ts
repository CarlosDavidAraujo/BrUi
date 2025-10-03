import { Component, computed, input } from '@angular/core';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';
import { cn } from '../../../lib/utils';

@Component({
  selector: 'br-separator',
  standalone: true,
  template: '', // O componente não tem conteúdo interno.
  host: {
    // Atributos de acessibilidade
    role: 'separator',
    '[attr.aria-orientation]':
      "orientation() === 'vertical' ? 'vertical' : undefined",

    // Vincula o atributo 'class' ao nosso signal computado
    '[class]': 'finalClasses()',
  },
})
export class BrSeparatorComponent {
  /**
   * A orientação do separador.
   * @default 'horizontal'
   */
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');

  /**
   * Captura classes customizadas passadas pelo usuário.
   */
  readonly userClass = input<ClassValue>('', { alias: 'class' });

  /**
   * Signal computado que monta a string de classes final com base na orientação.
   */
  readonly finalClasses = computed(() =>
    cn(
      'shrink-0 bg-slate-200', // Classes base para cor e comportamento em flexbox
      this.orientation() === 'horizontal'
        ? 'h-[1px] w-full' // Classes para a versão horizontal
        : 'w-[1px] h-full', // Classes para a versão vertical
      this.userClass()
    )
  );
}
