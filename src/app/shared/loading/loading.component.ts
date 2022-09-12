import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  @Input() routing = false;
  @Input() detectRoutingOngoing = false;

  constructor(public loadingService: LoadingService) {}

  ngOnInit(): void {}
}
