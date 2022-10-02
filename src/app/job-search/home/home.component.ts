import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from '../../shared/loading/loading.service';
import { Job } from 'src/app/services/interfaces';
import { JobsService } from 'src/app/services/jobs.service';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  jobObservables: Observable<Job[]>[] = [];
  mobileView = false;
  hideLoadMoreBtn$!: Observable<boolean>;
  constructor(
    private jobsService: JobsService,
    public loadingService: LoadingService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.loadJobs();
    this.hideLoadMoreBtn$ = this.jobsService.noMoreJobsToBeLoaded$;
    this.addBreakPoint();
  }

  loadJobs() {
    const jobs$ = this.jobsService.getInitialJobs();
    this.jobObservables.push(
      this.loadingService.showLoaderUntilCompleted(jobs$)
    );
  }

  onLoadMoreBtnClick() {
    this.jobObservables.push(
      this.loadingService.showLoaderUntilCompleted(this.jobsService.loadMore())
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
