import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Subscription, tap } from 'rxjs';
import { FilteredData } from 'src/app/services/interfaces';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent implements OnInit, OnDestroy {
  @HostBinding('class') className = 'filter-bar-container';
  searchPlaceHolder = 'Filter by title, companies, expertise...';
  tabletView = false;
  hideInput = false;
  private _querySubscription: Subscription = new Subscription();
  options: string[] = ['One', 'Two', 'Three'];

  filterInputForm = this.fb.group({
    position: [''],
    location: [''],
    fullTimeOnly: [false],
  });
  constructor(
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this._querySubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.addBreakPoints();
    this.listenForRouteChanges();
  }

  listenForRouteChanges() {
    this._querySubscription = this.activatedRoute.queryParams
      .pipe(
        map((param) => {
          const output = { ...param };
          if (output['fullTimeOnly']) {
            output['fullTimeOnly'] = output['fullTimeOnly'] === 'true';
          }
          return output;
        }),
        tap((data) => {
          this.filterInputForm.patchValue(data);
        })
      )
      .subscribe();
  }

  filterBtnClick() {
    this.openFilterModal()
      .pipe(
        filter((data) => !!data),
        tap((data) => {
          this.navigateTheQueries(data);
        })
      )
      .subscribe();
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
    this.navigateTheQueries(data);
  }

  navigateTheQueries(data: FilteredData) {
    this.router.navigate([], {
      queryParams: data,
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge',
    });

    this.filterInputForm.markAsPristine();
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
