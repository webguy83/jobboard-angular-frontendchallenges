import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe((breakpointState) => {
        const breakpoints = breakpointState.breakpoints;

        if (breakpoints[Breakpoints.XSmall]) {
          this.deviceView = DeviceView.MOBILE;
        } else if (breakpoints[Breakpoints.Small]) {
          this.deviceView = DeviceView.TABLET;
        } else {
          this.deviceView = DeviceView.DESKTOP;
        }
        this.currentheaderImgUrl = `url(../../../assets/${this.deviceView}/bg-pattern-header.svg)`;
      });
  }
}
