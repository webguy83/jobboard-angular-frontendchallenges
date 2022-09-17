import { Component, Input, OnInit } from '@angular/core';
import { Job } from 'src/app/services/interfaces';

@Component({
  selector: 'app-detail-main',
  templateUrl: './detail-main.component.html',
  styleUrls: ['./detail-main.component.scss'],
})
export class DetailMainComponent implements OnInit {
  @Input() job: Job | undefined;

  constructor() {}

  ngOnInit(): void {}
}
