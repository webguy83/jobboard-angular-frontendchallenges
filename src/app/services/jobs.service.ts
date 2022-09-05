import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  query,
  limit,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
  location: string;
  logo: string;
  logoBackground: string;
  position: string;
  postedAt: string;
  requirements: Requirements;
  role: Role;
  website: string;
}

interface Job extends JobCollection {
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  constructor(private readonly firestore: Firestore) {}

  getJobs() {
    const ref = collection(this.firestore, 'devjobs');
    const q = query(ref, limit(12));
    return collectionData(q, {
      idField: 'id',
    }) as Observable<Job[]>;
  }
}
