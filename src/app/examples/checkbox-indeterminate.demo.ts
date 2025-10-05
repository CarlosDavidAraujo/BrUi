import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BrCheckboxComponent } from '@/components/br-checkbox/checkbox.component';

@Component({
  selector: 'example-checkbox-indeterminate',
  standalone: true,
  imports: [BrCheckboxComponent, ReactiveFormsModule, CommonModule],
  template: `
    <div class="flex flex-col gap-3">
      <div class="items-top flex space-x-2">
        <br-checkbox
          [formControl]="parentControl"
          [indeterminate]="isIndeterminate"
          id="parent"
        ></br-checkbox>
        <label for="parent" class="text-sm font-medium">Selecionar Tudo</label>
      </div>

      <div class="ml-6 flex flex-col gap-2" [formGroup]="childrenGroup">
        <div class="items-top flex space-x-2">
          <br-checkbox formControlName="item1" id="item1"></br-checkbox>
          <label for="item1" class="text-sm">Item 1</label>
        </div>
        <div class="items-top flex space-x-2">
          <br-checkbox formControlName="item2" id="item2"></br-checkbox>
          <label for="item2" class="text-sm">Item 2</label>
        </div>
        <div class="items-top flex space-x-2">
          <br-checkbox formControlName="item3" id="item3"></br-checkbox>
          <label for="item3" class="text-sm">Item 3</label>
        </div>
      </div>
    </div>
    <pre class="mt-2 text-xs">
Valor do Grupo: {{ childrenGroup.value | json }}</pre
    >
  `,
})
export class CheckboxIndeterminateExample implements OnInit {
  parentControl = new FormControl(false);
  childrenGroup = new FormGroup({
    item1: new FormControl(false),
    item2: new FormControl(true),
    item3: new FormControl(false),
  });

  isIndeterminate = false;

  constructor() {
    this.childrenGroup.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((values) => {
        const allChecked = Object.values(values).every((v) => v);
        const noneChecked = Object.values(values).every((v) => !v);

        if (allChecked) {
          this.isIndeterminate = false;
          this.parentControl.setValue(true, { emitEvent: false });
        } else if (noneChecked) {
          this.isIndeterminate = false;
          this.parentControl.setValue(false, { emitEvent: false });
        } else {
          this.isIndeterminate = true;
          this.parentControl.setValue(false, { emitEvent: false });
        }
      });

    this.parentControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        this.childrenGroup.setValue(
          {
            item1: value ?? false,
            item2: value ?? false,
            item3: value ?? false,
          },
          { emitEvent: false },
        );
      });
  }

  ngOnInit(): void {
    this.childrenGroup.updateValueAndValidity();
  }
}
