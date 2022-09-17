import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { Job } from './interfaces';
import { JobsService } from './jobs.service';

@Injectable()
export class JobResolver implements Resolve<Job> {
  constructor(private jobService: JobsService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Job> {
    const id = route.paramMap.get('id');
    if (id) {
      return this.jobService.getJob(id).pipe(
        tap((job) => {
          if (!job) {
            this.router.navigate(['']);
          }
        }),
        catchError(() => {
          this.router.navigate(['']);
          return EMPTY;
        })
      );
    } else {
      this.router.navigate(['']);
      return EMPTY;
    }
  }
}
