import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent implements OnInit {
  searchPlaceHolder = '';
  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.addBreakPoints();
  }

  addBreakPoints() {
    const mobilePoint = '(max-width: 374.98px)';
    const tabletPoint = '(min-width: 375px) and (max-width: 900px)';

    this.breakpointObserver
      .observe([mobilePoint, tabletPoint])
      .subscribe((breakpointState) => {
        const breakpoints = breakpointState.breakpoints;

        if (breakpoints[mobilePoint]) {
          this.searchPlaceHolder = 'Filter by title...';
        } else if (breakpoints[tabletPoint]) {
          this.searchPlaceHolder = 'Filter by title...';
        } else {
          this.searchPlaceHolder = 'Filter by title, companies, expertise...';
        }
      });
  }
}
