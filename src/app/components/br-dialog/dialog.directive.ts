import {
  contentChild,
  Directive,
  effect,
  inject,
  model,
  TemplateRef,
} from '@angular/core';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { BrDialogPortalDirective } from './dialog-portal.directive';

export type DialogState = 'isOpen' | 'closed';

@Directive({
  selector: '[brDialog], br-dialog',
  standalone: true,
  exportAs: 'brDialog',
})
export class BrDialogDirective {
  private readonly dialogService = inject(Dialog);

  private dialogRef: DialogRef<unknown> | null = null;

  private dialogTemplate = contentChild(BrDialogPortalDirective, {
    read: TemplateRef,
  });

  get state() {
    return this.dialogRef ? 'open' : 'closed';
  }

  open(): void {
    if (this.dialogRef) {
      return;
    }

    //@ts-expect-error
    this.dialogRef = this.dialogService.open(this.dialogTemplate(), {
      hasBackdrop: true,
    });

    this.dialogRef?.closed.subscribe(() => {
      this.dialogRef = null;
    });
  }

  close(): void {
    if (!this.dialogRef) {
      return;
    }
    this.dialogRef.close();
  }
}
