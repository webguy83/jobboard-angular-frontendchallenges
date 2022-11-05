import { Component, OnInit } from '@angular/core';
import {
  first,
  last,
  lastValueFrom,
  Observable,
  shareReplay,
  take,
} from 'rxjs';
import { LoadingService } from '../../shared/loading/loading.service';
import { Job } from 'src/app/services/interfaces';
import { JobsService } from 'src/app/services/jobs.service';
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

  constructor(
    private jobsStore: JobsStore,
    public loadingService: LoadingService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.loadJobs();
    this.addBreakPoint();
  }

  loadJobs() {
    this.jobObservables.push(
      this.loadingService.showLoaderUntilCompleted(
        this.jobsStore.allCombinedJobs$
      )
    );
  }

  onLoadMoreBtnClick() {
    this.jobObservables.push(
      this.loadingService.showLoaderUntilCompleted(
        this.jobsStore.loadMoreJobs()
      )
    );
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
