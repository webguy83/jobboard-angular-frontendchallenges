import { Component, OnInit } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { LoadingService } from '../../shared/loading/loading.service';
import { Job } from 'src/app/services/interfaces';
import { BreakpointObserver } from '@angular/cdk/layout';
import { JobsStore } from 'src/app/services/jobs.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  jobObservables: Observable<Job[]>[] = [];
  mobileView = false;
  hideLoadBtn$ = this.jobsStore.jobLimitReached$;
  jobs$ = this.jobsStore.jobs$;

  constructor(
    private jobsStore: JobsStore,
    public loadingService: LoadingService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.addBreakPoint();
    this.loadingService
      .showLoaderUntilCompleted(
        this.jobsStore.jobs$.pipe(
          tap((jobs) => {
            this.jobObservables = [of(jobs)];
          })
        )
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
