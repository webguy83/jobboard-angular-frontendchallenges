import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Requirements {
  content: string;
  items: string[];
}

interface Role {
  content: string;
  items: string[];
}

interface Jobs {
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

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  constructor(private firestore: AngularFirestore) {}

  jobs$ = this.firestore.collection<Jobs>('devjobs').valueChanges();
}
