import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  query,
  limit,
  doc,
  startAfter,
  orderBy,
  getDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { concatMap, from, map, Observable, tap } from 'rxjs';

interface Requirements {
  content: string;
  items: string[];
}

interface Role {
  content: string;
  items: string[];
}

interface JobCollection {
  apply: string;
  company: string;
  contract: string;
  description: string;
  index: number;
  location: string;
  logo: string;
  logoBackground: string;
  position: string;
  postedAt: string;
  requirements: Requirements;
  role: Role;
  website: string;
}

export interface Job extends JobCollection {
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  private _hideBtnSubject = new BehaviorSubject(false);
  public noMoreJobsToBeLoaded = this._hideBtnSubject.asObservable();
  private _colRef = collection(this.firestore, 'devjobs');
  private _numOfLoadedJobs = 0;
  private _limit = 2;
  private _allJobs$!: Observable<Job[]>;
  constructor(private readonly firestore: Firestore) {}

  getJobs() {
    const q = query(this._colRef, limit(this._limit), orderBy('index'));

    const data$ = collectionData(q, {
      idField: 'id',
    }).pipe(
      tap((data) => {
        this._numOfLoadedJobs = data.length;
      })
    );

    this._allJobs$ = data$ as Observable<Job[]>;
    return data$ as Observable<Job[]>;
  }

  getLastJob() {
    return this._allJobs$.pipe(map((data) => data.at(-1)!.id));
  }

  loadMore() {
    this._hideBtnSubject.next(true);
    const lastJobId$ = this.getLastJob();
    const latestJobs$ = lastJobId$.pipe(
      concatMap((id) => {
        const docRef = doc(this.firestore, 'devjobs', id);
        return from(getDoc(docRef)).pipe(
          concatMap((lastDocument) => {
            const addedItemsQuery = query(
              this._colRef,
              limit(this._limit),
              orderBy('index'),
              startAfter(lastDocument)
            );
            return collectionData(addedItemsQuery, {
              idField: 'id',
            });
          }),
          tap((data) => {
            this._numOfLoadedJobs += data.length;
            if (this._numOfLoadedJobs % this._limit !== 0) {
              this._hideBtnSubject.next(true);
            } else {
              this._hideBtnSubject.next(false);
            }
          })
        );
      })
    ) as Observable<Job[]>;

    this._allJobs$ = combineLatest([this._allJobs$, latestJobs$]).pipe(
      map((arr) => [...arr[0], ...arr[1]])
    );

    return latestJobs$;
  }
}
