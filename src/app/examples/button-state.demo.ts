import { Component } from '@angular/core';
import { BrButtonDirective } from '@/components/br-button/button.directive';

@Component({
  selector: 'example-button-states',
  standalone: true,
  imports: [BrButtonDirective],
  templateUrl: 'button-state.demo.html',
})
export class ButtonStatesExample {}
