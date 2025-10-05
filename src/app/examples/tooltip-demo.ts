import { Component } from '@angular/core';
import { BrTooltipTriggerDirective } from '../components/br-tooltip/tooltip-trigger.directive';
import { BrTooltipContentDirective } from '../components/br-tooltip/tooltip-content.directive';
import { BrButtonDirective } from '../components/br-button/button.directive';
@Component({
  selector: 'example-tooltip',
  standalone: true,
  imports: [
    BrButtonDirective,
    BrTooltipTriggerDirective,
    BrTooltipContentDirective,
  ],
  template: `
    <div class="flex w-full flex-wrap items-center justify-center gap-4 p-20">
      <button brButton brTooltipTrigger position="top" variant="primary">
        Default
        <ng-template brTooltipContent>
          <span>Tooltip with default style</span>
        </ng-template>
      </button>

      <button brButton brTooltipTrigger position="top" variant="primary">
        Info
        <ng-template brTooltipContent variant="info">
          <span>Tooltip with info style</span>
        </ng-template>
      </button>

      <button brButton brTooltipTrigger position="top" variant="destructive">
        Destructive
        <ng-template brTooltipContent variant="destructive">
          <span>Tooltip with destructive style</span>
        </ng-template>
      </button>

      <button brButton brTooltipTrigger position="top" variant="primary">
        Success
        <ng-template brTooltipContent variant="success">
          <span>Tooltip with success style</span>
        </ng-template>
      </button>

      <button brButton brTooltipTrigger position="top" variant="primary">
        Warning
        <ng-template brTooltipContent variant="warning">
          <span>Tooltip with warning style</span>
        </ng-template>
      </button>

      <button brButton brTooltipTrigger position="top" variant="primary">
        Custom
        <ng-template
          brTooltipContent
          class="border-purple-500 bg-purple-400 text-black"
        >
          <span>Tooltip with custom style</span>
        </ng-template>
      </button>
    </div>
  `,
})
export class TooltipExample {}
