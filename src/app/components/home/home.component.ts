import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  jobs$ = this.jobsService.jobs$;
  constructor(private jobsService: JobsService) {}

  ngOnInit(): void {}
}
