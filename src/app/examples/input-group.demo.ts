import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BrInputGroupAddonDirective,
  BrInputGroupButtonDirective,
  BrInputGroupComponent,
  BrInputGroupInputDirective,
  BrInputGroupTextareaDirective,
  BrInputGroupTextDirective,
} from '@/components/br-input-group';
import { BrTooltipTriggerDirective } from '@/components/br-tooltip/tooltip-trigger.directive';
import { BrTooltipContentDirective } from '@/components/br-tooltip/tooltip-content.directive';
import { BrSeparatorComponent } from '../components/br-separator/separator.component';

@Component({
  selector: 'example-input-group',
  standalone: true,
  imports: [
    BrInputGroupComponent,
    BrInputGroupInputDirective,
    BrInputGroupTextareaDirective,
    BrInputGroupAddonDirective,
    BrInputGroupTextDirective,
    BrInputGroupButtonDirective,
    BrTooltipTriggerDirective,
    BrTooltipContentDirective,
    BrSeparatorComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './input-group.demo.html',
})
export class InputGroupExample {}
