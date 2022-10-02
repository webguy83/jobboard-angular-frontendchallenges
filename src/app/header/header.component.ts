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
  mobileView = false;
  shrinkPadding = false;
  currentheaderImgUrl = '';
  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.addBreakPoints();
  }

  addBreakPoints() {
    const mobilePoint = '(max-width: 375px)';
    const tabletPoint = '(min-width: 375.01px) and (max-width: 768px)';
    const largerTabletPoint = '(min-width: 375.01px) and (max-width: 865px)';
    this.breakpointObserver
      .observe([mobilePoint, tabletPoint, largerTabletPoint])
      .subscribe((breakpointState) => {
        const breakpoints = breakpointState.breakpoints;

        if (breakpoints[mobilePoint]) {
          this.deviceView = DeviceView.MOBILE;
          this.mobileView = true;
        } else if (breakpoints[tabletPoint]) {
          this.deviceView = DeviceView.TABLET;
        } else {
          this.deviceView = DeviceView.DESKTOP;
          this.mobileView = false;
        }

        if (breakpoints[largerTabletPoint]) {
          this.shrinkPadding = true;
        } else {
          this.shrinkPadding = false;
        }
        this.currentheaderImgUrl = `url(../../../assets/${this.deviceView}/bg-pattern-header.svg)`;
      });
  }
}
