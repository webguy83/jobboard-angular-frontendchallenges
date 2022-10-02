import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, HostBinding, OnInit } from '@angular/core';
import { StyleManager } from './services/style-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @HostBinding('class') className = '';
  title = 'job-board';
  mobileView = false;

  constructor(
    private styleManager: StyleManager,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.styleManager.isDark$.subscribe((isDark) => {
      const darkModeClassName = 'dark-theme';
      this.className = isDark ? darkModeClassName : '';
    });
    this.addBreakPoint();
  }

  addBreakPoint() {
    const mobilePoint = '(max-width: 375px)';

    this.breakpointObserver
      .observe([mobilePoint])
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
