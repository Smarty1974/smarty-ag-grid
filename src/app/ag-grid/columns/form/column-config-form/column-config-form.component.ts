import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators }     from "@angular/forms";

@Component({
  selector: 'column-config-form',
  templateUrl: './column-config-form.component.html',
  styleUrl: './column-config-form.component.scss'
})
export class ColumnConfigFormComponent {
  @Input() inputColumn = {} as any;
  @Output() onColumnModified = new EventEmitter<any>();

  columnForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.columnForm = this.fb.group({
      headerName: ['', Validators.required],
      field: ['', Validators.required],
      aggregate: [false],
      enableValue: [false],
      sortable: [true],
      aggFunc: [''],
    });
  }

  onSubmit() {
    if (this.columnForm.valid) {
      this.onColumnModified.emit(this.columnForm.value);
      this.columnForm.reset();
    }
  }
}
