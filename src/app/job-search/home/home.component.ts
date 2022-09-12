import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { Job } from 'src/app/services/interfaces';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  jobObservables: Observable<Job[]>[] = [];

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
    const jobs$ = this.jobsService.getInitialJobs();
    this.jobObservables.push(
      this.loadingService.showLoaderUntilCompleted(
        this.loadingService.showLoaderUntilCompleted(jobs$)
      )
    );
  }

  onLoadMoreBtnClick() {
    this.jobObservables.push(
      this.loadingService.showLoaderUntilCompleted(this.jobsService.loadMore())
    );
  }
}
