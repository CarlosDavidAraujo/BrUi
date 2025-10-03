import { Directive, computed, input } from '@angular/core';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';
import { cn } from '../../../lib/utils';

@Directive({
  selector: 'input[brInput]',
  standalone: true,
  host: {
    // Vinculamos o atributo 'class' ao nosso signal computado que gera as classes finais.
    '[class]': 'finalClasses()',
  },
})
export class BrInputDirective {
  // 1. Captura qualquer classe que o usuário adicione diretamente ao elemento no HTML.
  readonly customClass = input<ClassValue>('', { alias: 'class' });

  // 2. Define a "receita" de classes base para todos os inputs.
  private readonly baseClasses =
    'flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50';

  // 3. Combina as classes base com as do usuário de forma inteligente.
  readonly finalClasses = computed(() =>
    cn(this.baseClasses, this.customClass())
  );
}
