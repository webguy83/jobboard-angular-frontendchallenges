import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Job, JobsService } from 'src/app/services/jobs.service';
import { LoadingService } from '../loading/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  jobs$!: Observable<Job[]>;
  moreJobs$!: Observable<Job[]>;

  hideLoadMoreBtn$!: Observable<boolean>;
  constructor(
    private jobsService: JobsService,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadJobs();
    this.hideLoadMoreBtn$ = this.jobsService.noMoreJobsToBeLoaded;
  }

  loadJobs() {
    const jobs$ = this.jobsService.getJobs();
    this.jobs$ = this.loadingService.showLoaderUntilCompleted(jobs$);
  }

  onLoadMoreBtnClick() {
    const moreJobs$ = this.jobsService.loadMore();
    this.moreJobs$ = this.loadingService.showLoaderUntilCompleted(moreJobs$);
  }
}
