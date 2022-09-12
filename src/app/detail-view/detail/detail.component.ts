import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/services/interfaces';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  job: Job | undefined;

  constructor() {}

  ngOnInit(): void {}
}
