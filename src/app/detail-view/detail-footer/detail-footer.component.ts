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
  mobileView = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.addBreakPoint();
  }

  addBreakPoint() {
    const mobilePoint = '(max-width: 600px)';

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
