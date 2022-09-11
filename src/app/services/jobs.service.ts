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
  DocumentSnapshot,
  DocumentData,
} from '@angular/fire/firestore';
import {
  BehaviorSubject,
  combineLatest,
  concatMap,
  from,
  map,
  Observable,
  tap,
} from 'rxjs';
import { Job } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  private _hideBtnSubject = new BehaviorSubject(true);
  public noMoreJobsToBeLoaded = this._hideBtnSubject.asObservable();
  private _colRef = collection(this.firestore, 'devjobs');
  private _numOfLoadedJobs = 0;
  private _limit = 2;
  private _allJobs$!: Observable<Job[]>;
  constructor(private readonly firestore: Firestore) {}

  getInitialJobs() {
    const q = query(this._colRef, limit(this._limit), orderBy('index'));
    const data$ = collectionData(q, {
      idField: 'id',
    }).pipe(
      tap((data) => {
        this._hideBtnSubject.next(false);
        this._numOfLoadedJobs = data.length;
      })
    );

    this._allJobs$ = data$ as Observable<Job[]>;
    return data$ as Observable<Job[]>;
  }

  private _getLastCurrentJob() {
    return this._allJobs$.pipe(map((data) => data.at(-1)!.id));
  }

  private _queryMoreJobs(lastDocument: DocumentSnapshot<DocumentData>) {
    const addedItemsQuery = query(
      this._colRef,
      limit(this._limit),
      orderBy('index'),
      startAfter(lastDocument)
    );
    return collectionData(addedItemsQuery, {
      idField: 'id',
    });
  }

  private _adjustNumberOfJobs(docData: DocumentData[]) {
    this._numOfLoadedJobs += docData.length;
    if (this._numOfLoadedJobs % this._limit !== 0) {
      this._hideBtnSubject.next(true);
    } else {
      this._hideBtnSubject.next(false);
    }
  }

  private _getMoreJobs(id: string) {
    const docRef = doc(this.firestore, 'devjobs', id);
    return from(getDoc(docRef)).pipe(
      concatMap((lastDocument) => this._queryMoreJobs(lastDocument)),
      tap((docData) => this._adjustNumberOfJobs(docData))
    );
  }

  loadMore() {
    this._hideBtnSubject.next(true);
    const lastJobId$ = this._getLastCurrentJob();
    const latestJobs$ = lastJobId$.pipe(
      concatMap((id) => this._getMoreJobs(id))
    ) as Observable<Job[]>;

    this._allJobs$ = combineLatest([this._allJobs$, latestJobs$]).pipe(
      map((arr) => [...arr[0], ...arr[1]])
    );

    return latestJobs$;
  }
}
