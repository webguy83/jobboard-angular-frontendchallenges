import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

enum DeviceView {
  DESKTOP = 'desktop',
  TABLET = 'tablet',
  MOBILE = 'mobile',
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  deviceView: DeviceView = DeviceView.DESKTOP;
  currentheaderImgUrl = '';
  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.addBreakPoints();
  }

  addBreakPoints() {
    const mobilePoint = '(max-width: 375px)';
    const tabletPoint = '(min-width: 375.01px) and (max-width: 768px)';
    this.breakpointObserver
      .observe([mobilePoint, tabletPoint])
      .subscribe((breakpointState) => {
        const breakpoints = breakpointState.breakpoints;

        if (breakpoints[mobilePoint]) {
          this.deviceView = DeviceView.MOBILE;
        } else if (breakpoints[tabletPoint]) {
          this.deviceView = DeviceView.TABLET;
        } else {
          this.deviceView = DeviceView.DESKTOP;
        }
        this.currentheaderImgUrl = `url(../../../assets/${this.deviceView}/bg-pattern-header.svg)`;
      });
  }
}
