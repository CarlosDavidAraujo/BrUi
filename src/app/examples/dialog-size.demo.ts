import { Component } from '@angular/core';
import { BrButtonDirective } from '@/components/br-button/button.directive';
import {
  BrDialogPortalDirective,
  BrDialogDirective,
  BrDialogTitleDirective,
  BrDialogDescriptionDirective,
  BrDialogTriggerDirective,
  BrDialogContentComponent,
  BrDialogHeaderDirective,
  BrDialogFooterDirective,
} from '@/components/br-dialog';

@Component({
  selector: 'example-dialog-size',
  imports: [
    BrButtonDirective,
    BrDialogPortalDirective,
    BrDialogDirective,
    BrDialogTitleDirective,
    BrDialogDescriptionDirective,
    BrDialogTriggerDirective,
    BrDialogContentComponent,
    BrDialogHeaderDirective,
    BrDialogFooterDirective,
  ],
  templateUrl: 'dialog-size.demo.html',
})
export class DialogSizeExample {}
