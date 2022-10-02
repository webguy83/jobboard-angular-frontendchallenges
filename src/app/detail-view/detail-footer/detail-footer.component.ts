import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { Job } from 'src/app/services/interfaces';

@Component({
  selector: 'app-detail-footer',
  templateUrl: './detail-footer.component.html',
  styleUrls: ['./detail-footer.component.scss'],
})
export class DetailFooterComponent implements OnInit {
  @Input() job: Job | undefined;
  tabletView = false;
  mobileView = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.addBreakPoint();
  }

  addBreakPoint() {
    const tabletPoint = '(min-width: 500.01px) and (max-width: 600px)';
    const mobilePoint = '(max-width: 500px)';

    this.breakpointObserver
      .observe([tabletPoint, mobilePoint])
      .subscribe((breakpointState) => {
        const breakpoints = breakpointState.breakpoints;

        if (breakpoints[tabletPoint]) {
          this.tabletView = true;
        } else if (breakpoints[mobilePoint]) {
          this.mobileView = true;
        } else {
          this.tabletView = false;
          this.mobileView = false;
        }
      });
  }
}
