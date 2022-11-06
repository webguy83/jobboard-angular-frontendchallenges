import { Component, OnDestroy, OnInit } from '@angular/core';
import { concatMap, map, Observable, Subscription, tap } from 'rxjs';
import { LoadingService } from '../../shared/loading/loading.service';
import { Job } from 'src/app/services/interfaces';
import { BreakpointObserver } from '@angular/cdk/layout';
import { JobsStore } from 'src/app/services/jobs.store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  jobObservables: Observable<Job[]>[] = [];
  mobileView = false;
  hideLoadBtn$ = this.jobsStore.jobLimitReached$;
  jobs$ = this.jobsStore.jobs$;
  private _querySubscription: Subscription = new Subscription();

  constructor(
    private jobsStore: JobsStore,
    public loadingService: LoadingService,
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this._querySubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.addBreakPoint();
    this.listenForRouteChanges();
  }

  listenForRouteChanges() {
    this._querySubscription = this.route.queryParams
      .pipe(
        map((param) => {
          const output = { ...param };
          if (output['fullTimeOnly']) {
            output['fullTimeOnly'] = output['fullTimeOnly'] === 'true';
          }
          return output;
        }),
        concatMap((params) => {
          return this.loadingService.showLoaderUntilCompleted(
            this.jobsStore.getFilteredJobs(params)
          );
        })
      )
      .subscribe();
  }

  onLoadMoreBtnClick() {
    this.loadingService
      .showLoaderUntilCompleted(this.jobsStore.loadMoreJobs())
      .subscribe();
  }

  addBreakPoint() {
    const mobilePoint = '(max-width: 375px)';

    this.breakpointObserver
      .observe([mobilePoint])
      .subscribe((breakpointState) => {
        const breakpoints = breakpointState.breakpoints;

        if (breakpoints[mobilePoint]) {
          this.mobileView = true;
        } else {
          this.mobileView = false;
        }
      });
  }
}
