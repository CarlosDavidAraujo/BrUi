import { Component } from '@angular/core';
import { BrTooltipTriggerDirective } from '../components/br-tooltip/tooltip-trigger.directive';
import { BrTooltipContentDirective } from '../components/br-tooltip/tooltip-content.directive';
import { BrButtonDirective } from '../components/br-button/button.directive';

@Component({
  selector: 'example-tooltip-variant',
  standalone: true,
  imports: [
    BrButtonDirective,
    BrTooltipTriggerDirective,
    BrTooltipContentDirective,
  ],
  templateUrl: 'tooltip-variant-demo.html',
})
export default class TooltipVariantExample {}
