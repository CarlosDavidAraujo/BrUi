import { Component } from '@angular/core';
import { BrCheckboxComponent } from '@/components/br-checkbox/checkbox.component';

@Component({
  selector: 'example-checkbox-default',
  standalone: true,
  imports: [BrCheckboxComponent],
  template: `
    <div class="items-top flex space-x-2">
      <br-checkbox id="terms1"></br-checkbox>
      <div class="grid gap-1.5 leading-none">
        <label for="terms1"> Aceitar termos e condições </label>
        <p class="text-sm">
          Você concorda com nossos Termos de Serviço e Política de Privacidade.
        </p>
      </div>
    </div>
  `,
})
export class CheckboxDefaultExample {}
