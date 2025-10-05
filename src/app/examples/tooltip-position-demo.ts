import { Component } from '@angular/core';
import { BrTooltipTriggerDirective } from '../components/br-tooltip/tooltip-trigger.directive';
import { BrTooltipContentDirective } from '../components/br-tooltip/tooltip-content.directive';
import { BrButtonDirective } from '../components/br-button/button.directive';

@Component({
  selector: 'example-tooltip-position',
  standalone: true,
  imports: [
    BrButtonDirective,
    BrTooltipTriggerDirective,
    BrTooltipContentDirective,
  ],
  template: `
    <div class="flex w-full items-center justify-center gap-4 p-20">
      <button brButton brTooltipTrigger position="top">
        Top
        <ng-template brTooltipContent>
          <span>Tooltip on top</span>
        </ng-template>
      </button>

      <button brButton brTooltipTrigger position="bottom">
        Bottom
        <ng-template brTooltipContent>
          <span>Tooltip on bottom</span>
        </ng-template>
      </button>

      <button brButton brTooltipTrigger position="left">
        Left
        <ng-template brTooltipContent>
          <span>Tooltip on left</span>
        </ng-template>
      </button>

      <button brButton brTooltipTrigger position="right">
        Right
        <ng-template brTooltipContent>
          <span>Tooltip on right</span>
        </ng-template>
      </button>
    </div>
  `,
})
export default class TooltipPositionExample {}
