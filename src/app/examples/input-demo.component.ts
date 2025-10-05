import { Component } from '@angular/core';
import { BrInputDirective } from '../components/br-input/input.directive';
import { BrButtonDirective } from '../components/br-button/button.directive';

@Component({
  selector: 'example-input-default',
  standalone: true,
  imports: [BrInputDirective],
  template: `
    <div class="w-full max-w-sm space-y-2">
      <label for="email-default" class="text-sm font-semibold text-slate-800"
        >Email</label
      >
      <input
        brInput
        type="email"
        id="email-default"
        placeholder="seu@email.com"
      />
    </div>
  `,
})
export class InputDefaultExample {}

@Component({
  selector: 'example-input-disabled',
  standalone: true,
  imports: [BrInputDirective],
  template: `
    <div class="w-full max-w-sm space-y-2">
      <label for="email-disabled" class="text-sm font-semibold text-slate-800"
        >Email</label
      >
      <input
        brInput
        type="email"
        id="email-disabled"
        placeholder="seu@email.com"
        disabled
      />
    </div>
  `,
})
export class InputDisabledExample {}

@Component({
  selector: 'example-input-with-icon',
  standalone: true,
  imports: [BrInputDirective],
  template: `
    <div class="w-full max-w-sm space-y-2">
      <label for="search-icon" class="text-sm font-semibold text-slate-800"
        >Pesquisar</label
      >
      <div class="relative">
        <div
          class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
        >
          <i class="fas fa-user-tie" aria-hidden="true"></i>
        </div>
        <input
          brInput
          type="search"
          id="search-icon"
          placeholder="Pesquisar..."
          class="pl-9"
        />
      </div>
    </div>
  `,
})
export class InputWithIconExample {}

@Component({
  selector: 'example-input-with-button',
  standalone: true,
  imports: [BrInputDirective, BrButtonDirective],
  template: `
    <div class="w-full max-w-sm space-y-2">
      <label for="newsletter" class="text-sm font-semibold text-slate-800"
        >Newsletter</label
      >
      <div class="flex w-full items-center space-x-2">
        <input
          brInput
          type="email"
          id="newsletter"
          placeholder="Email"
          class="flex-1"
        />
        <button brButton>Assinar</button>
      </div>
    </div>
  `,
})
export class InputWithButtonExample {}

@Component({
  selector: 'example-input-file',
  standalone: true,
  imports: [BrInputDirective],
  template: `
    <div class="w-full max-w-sm space-y-2">
      <label for="picture" class="text-sm font-semibold text-slate-800"
        >Foto do Perfil</label
      >
      <input brInput id="picture" type="file" />
    </div>
    <p class="mt-2 text-xs text-slate-600">
      Nota: A diretiva aplica estilos base, mas o botão interno do input de
      arquivo não é totalmente customizável via CSS.
    </p>
  `,
})
export class InputFileExample {}
