import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Job } from './interfaces';
import { JobsService } from './jobs.service';

@Injectable()
export class JobResolver implements Resolve<Job> {
  constructor(private jobService: JobsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Job> {
    const id = route.paramMap.get('id');
    throw new Error('dunce');
  }
}
