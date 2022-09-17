import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/services/interfaces';

@Component({
  selector: 'app-detail',
  templateUrl: './detail-main.component.html',
  styleUrls: ['./detail-main.component.scss'],
})
export class DetailMainComponent implements OnInit {
  job!: Job;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.job = this.route.snapshot.data['job'];
  }
}
