import { Component } from '@angular/core';
import { BrCheckboxComponent } from '@/components/br-checkbox/checkbox.component';

@Component({
  selector: 'example-checkbox-disabled',
  standalone: true,
  imports: [BrCheckboxComponent],
  template: `
    <div class="flex items-center space-x-2">
      <br-checkbox id="d1" [checked]="false" disabled></br-checkbox>
      <label for="d1" class="text-sm font-medium" disabled>Desmarcado</label>
    </div>
  `,
})
export class CheckboxDisabledExample {}
