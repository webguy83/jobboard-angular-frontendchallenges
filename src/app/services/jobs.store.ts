import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  concatMap,
  map,
  Observable,
  take,
  tap,
} from 'rxjs';
import { LoadingService } from '../shared/loading/loading.service';
import { Job } from './interfaces';
import { JobsService } from './jobs.service';

@Injectable({
  providedIn: 'root',
})
export class JobsStore {
  private mainJobSubject = new BehaviorSubject<Job[]>([]);
  private limitSubject = new BehaviorSubject(true);
  jobs$: Observable<Job[]> = this.mainJobSubject.asObservable();
  jobLimitReached$: Observable<boolean> = this.limitSubject.asObservable();

  constructor(
    private loadingService: LoadingService,
    private jobsService: JobsService
  ) {
    this.loadInitialJobs();
  }

  getFilteredJobs(data: any) {
    return this.jobsService.queryFilteredJobs(data).pipe(
      tap((filteredJobs) => {
        if (filteredJobs.length < this.jobsService.limit) {
          this.limitSubject.next(true);
        } else {
          this.limitSubject.next(false);
        }
        this.mainJobSubject.next(filteredJobs);
      })
    );
  }

  private loadInitialJobs() {
    const loadJobs$ = this.jobsService
      .queryJobs()
      .pipe(tap((jobs) => this.mainJobSubject.next(jobs)));

    this.loadingService.showLoaderUntilCompleted(loadJobs$).subscribe();
  }

  loadMoreJobs() {
    const latestJobs$ = this.mainJobSubject.pipe(
      map((jobs) => jobs[jobs.length - 1].id),
      concatMap((lastJobId) => this.jobsService.getAdditionalJobs(lastJobId))
    ) as Observable<Job[]>;

    return combineLatest([this.jobs$, latestJobs$]).pipe(
      map(([initJobs, latestJobs]) => [...initJobs, ...latestJobs]),
      take(1),
      tap((jobs) => {
        this.mainJobSubject.next(jobs);
        this.limitSubject.next(true);
        this.jobsService.limit += 12;
      })
    );
  }
}
