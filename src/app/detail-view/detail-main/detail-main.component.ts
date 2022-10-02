import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { Job } from 'src/app/services/interfaces';

@Component({
  selector: 'app-detail-main',
  templateUrl: './detail-main.component.html',
  styleUrls: ['./detail-main.component.scss'],
})
export class DetailMainComponent implements OnInit {
  @Input() job: Job | undefined;
  tabletView = false;
  mobileView = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.addBreakPoint();
  }

  addBreakPoint() {
    const mobilePoint = '(max-width: 500px)';
    const tabletPoint = '(max-width: 600px)';

    this.breakpointObserver
      .observe([mobilePoint, tabletPoint])
      .subscribe((breakpointState) => {
        const breakpoints = breakpointState.breakpoints;

        if (breakpoints[tabletPoint]) {
          this.tabletView = true;
        } else {
          this.tabletView = false;
        }

        if (breakpoints[mobilePoint]) {
          this.mobileView = true;
        } else {
          this.mobileView = false;
        }
      });
  }
}
