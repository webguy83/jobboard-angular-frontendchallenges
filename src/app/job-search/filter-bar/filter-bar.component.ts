import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { filter, Subscription } from 'rxjs';
import { JobsService } from 'src/app/services/jobs.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent implements OnInit, OnDestroy {
  @HostBinding('class') className = 'filter-bar-container';
  private _sub: Subscription | undefined;
  searchPlaceHolder = 'Filter by title, companies, expertise...';
  tabletView = false;
  hideInput = false;

  filterInputForm = this.fb.group({
    position: [''],
    location: [''],
    fullTimeOnly: [false],
  });
  constructor(
    private breakpointObserver: BreakpointObserver,
    private _jobsService: JobsService,
    private _loadingService: LoadingService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}
  ngOnDestroy(): void {
    this._sub?.unsubscribe();
  }

  ngOnInit(): void {
    this.addBreakPoints();
  }

  filterBtnClick() {
    this._sub = this.openFilterModal()
      .pipe(filter((val) => !!val))
      .subscribe((val) => {
        this.filterInputForm.markAsPristine();
        this._jobsService.getFilteredJobs(val);
      });
  }

  openFilterModal() {
    const config = new MatDialogConfig();
    config.autoFocus = true;
    config.panelClass = 'dialog-popup';
    config.backdropClass = 'dialog-popup-backdrop';
    config.width = '80vw';
    config.maxWidth = '330px';
    config.data = { fg: this.filterInputForm };

    const dialogRef = this.dialog.open<FilterDialogComponent>(
      FilterDialogComponent,
      config
    );
    return dialogRef.afterClosed();
  }

  onSubmit() {
    const data = this.filterInputForm.value;
    const jobs$ = this._jobsService.getFilteredJobs(data);
    jobs$.subscribe((val) => {
      this.filterInputForm.markAsPristine();
    });
  }

  addBreakPoints() {
    const smallerTablePoint = '(max-width: 750px)';
    const tabletPoint = '(max-width: 900px)';

    this.breakpointObserver
      .observe([smallerTablePoint, tabletPoint])
      .subscribe((breakpointState) => {
        const breakpoints = breakpointState.breakpoints;

        if (breakpoints[tabletPoint]) {
          this.searchPlaceHolder = 'Filter by title...';
          this.tabletView = true;
        } else {
          this.searchPlaceHolder = 'Filter by title, companies, expertise...';
          this.tabletView = false;
        }

        if (breakpoints[smallerTablePoint]) {
          this.hideInput = true;
        } else {
          this.hideInput = false;
        }
      });
  }
}
