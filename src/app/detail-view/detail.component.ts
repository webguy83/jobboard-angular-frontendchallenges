import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job } from '../services/interfaces';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  job!: Job;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.job = this.route.snapshot.data['job'];
  }
}
