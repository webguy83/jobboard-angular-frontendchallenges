import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  concatMap,
  map,
  Observable,
  ReplaySubject,
  tap,
} from 'rxjs';
import { LoadingService } from '../shared/loading/loading.service';
import { Job } from './interfaces';
import { JobsService } from './jobs.service';

@Injectable({
  providedIn: 'root',
})
export class JobsStore {
  private subject = new ReplaySubject<Job[]>();
  private limitSubject = new BehaviorSubject(false);
  jobs$: Observable<Job[]> = this.subject.asObservable();
  jobLimitReached$: Observable<boolean> = this.limitSubject.asObservable();
  allCombinedJobs$: Observable<Job[]> = this.jobs$;

  constructor(
    private loadingService: LoadingService,
    private jobsService: JobsService
  ) {
    this.loadInitialJobs();
  }

  private loadInitialJobs() {
    const loadJobs$ = this.jobsService
      .queryJobs()
      .pipe(tap((jobs) => this.subject.next(jobs)));

    this.loadingService.showLoaderUntilCompleted(loadJobs$).subscribe();
  }

  loadMoreJobs() {
    const latestJobs$ = this.subject.pipe(
      map((jobs) => jobs[jobs.length - 1].id),
      concatMap((lastJobId) => this.jobsService.getAdditionalJobs(lastJobId))
    ) as Observable<Job[]>;

    this.allCombinedJobs$ = combineLatest([this.jobs$, latestJobs$]).pipe(
      map(([allJobs, latestJobs]) => [...allJobs, ...latestJobs])
    );

    this.limitSubject.next(true);

    return latestJobs$;
  }
}
