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
import { BehaviorSubject } from 'rxjs';
import { concatMap, from, map, Observable, of, tap } from 'rxjs';

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
  private _subject = new BehaviorSubject(false);
  public noMoreJobsToBeLoaded = this._subject.asObservable();
  private _colRef = collection(this.firestore, 'devjobs');
  private _numOfLoadedJobs = 0;
  private _limit = 12;
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

    return data$ as Observable<Job[]>;
  }

  getLastJob() {
    return this.getJobs().pipe(map((data) => data.at(-1)!.id));
  }

  loadMore() {
    const lastJobId$ = this.getLastJob();
    return lastJobId$.pipe(
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
              this._subject.next(true);
            }
          })
        );
      })
    ) as Observable<Job[]>;
  }
}
