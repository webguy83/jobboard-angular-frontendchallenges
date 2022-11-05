import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

interface DialogData {
  fg: FormGroup;
  submitFn: () => void;
}

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss'],
})
export class FilterDialogComponent implements OnInit, OnDestroy {
  private _sub: Subscription | undefined;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _dialogRef: MatDialogRef<FilterDialogComponent>
  ) {}

  ngOnInit(): void {
    this._sub = this.data.fg.valueChanges.subscribe((values) =>
      this.data.fg.setValue(values, { emitEvent: false })
    );
  }

  onSubmit() {
    this._dialogRef.close(this.data.fg.value);
  }

  ngOnDestroy(): void {
    this._sub?.unsubscribe();
  }
}
