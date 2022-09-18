import { Component, Input, OnInit } from '@angular/core';
import { Job } from 'src/app/services/interfaces';

@Component({
  selector: 'app-detail-footer',
  templateUrl: './detail-footer.component.html',
  styleUrls: ['./detail-footer.component.scss'],
})
export class DetailFooterComponent implements OnInit {
  @Input() job: Job | undefined;
  constructor() {}

  ngOnInit(): void {}
}
