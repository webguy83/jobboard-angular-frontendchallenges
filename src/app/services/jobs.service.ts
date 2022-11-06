import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  query,
  where,
  limit,
  doc,
  startAfter,
  orderBy,
  getDoc,
  DocumentSnapshot,
  DocumentData,
  QueryConstraint,
} from '@angular/fire/firestore';
import {
  concatMap,
  first,
  from,
  map,
  Observable,
  shareReplay,
  tap,
} from 'rxjs';
import { FilteredData, Job } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  private _dbTableName = 'devjobs';
  private _colRef = collection(this.firestore, this._dbTableName);
  private _limit = 12;
  constructor(private readonly firestore: Firestore) {}

  queryFilteredJobs(filteredData: FilteredData) {
    const queries: QueryConstraint[] = [];
    for (let key of Object.keys(filteredData)) {
      if (key === 'fullTimeOnly' && filteredData[key as keyof FilteredData]) {
        queries.push(where('contract', '==', 'Full Time'));
      } else if (filteredData[key as keyof FilteredData]) {
        queries.push(where(key, '==', filteredData[key as keyof FilteredData]));
      }
    }
    const q = query(
      this._colRef,
      limit(this._limit),
      ...queries,
      orderBy('index')
    );
    const data$ = collectionData(q, {
      idField: 'id',
    }).pipe(first(), shareReplay());

    return data$ as Observable<Job[]>;
  }

  getJob(id: string) {
    const docRef = doc(this.firestore, this._dbTableName, id);
    return from(getDoc(docRef)).pipe(
      map((newDoc) => newDoc.data())
    ) as Observable<Job>;
  }

  queryJobs() {
    const q = query(this._colRef, limit(this._limit), orderBy('index'));
    return collectionData(q, {
      idField: 'id',
    }) as Observable<Job[]>;
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
    }) as Observable<Job[]>;
  }

  getAdditionalJobs(id: string) {
    const docRef = doc(this.firestore, this._dbTableName, id);
    return from(getDoc(docRef)).pipe(
      concatMap((lastDocument) => this._queryMoreJobs(lastDocument)),
      tap(() => (this._limit += 12))
    );
  }

  get limit() {
    return this._limit;
  }

  set limit(val: number) {
    this._limit = val;
  }
}
