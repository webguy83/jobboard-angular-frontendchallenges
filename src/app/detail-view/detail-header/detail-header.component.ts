import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { Job } from 'src/app/services/interfaces';

@Component({
  selector: 'app-detail-header',
  templateUrl: './detail-header.component.html',
  styleUrls: ['./detail-header.component.scss'],
})
export class DetailHeaderComponent implements OnInit {
  @Input() job: Job | undefined;
  mobileView = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  generateWebsiteStaticText(companyName: string): string {
    return `${companyName.toLowerCase().replace(' ', '')}.com`;
  }

  ngOnInit(): void {
    this.addBreakPoint();
  }

  addBreakPoint() {
    const mobilePoint = '(max-width: 650px)';

    this.breakpointObserver
      .observe(mobilePoint)
      .subscribe((breakpointState) => {
        const breakpoints = breakpointState.breakpoints;

        if (breakpoints[mobilePoint]) {
          this.mobileView = true;
        } else {
          this.mobileView = false;
        }
      });
  }
}
