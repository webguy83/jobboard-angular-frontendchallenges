import { Component, Input, OnInit } from '@angular/core';
import { Job } from 'src/app/services/interfaces';

@Component({
  selector: 'app-detail-header',
  templateUrl: './detail-header.component.html',
  styleUrls: ['./detail-header.component.scss'],
})
export class DetailHeaderComponent implements OnInit {
  @Input() job: Job | undefined;
  constructor() {}

  generateWebsiteStaticText(companyName: string): string {
    return `${companyName.toLowerCase().replace(' ', '')}.com`;
  }

  ngOnInit(): void {}
}
