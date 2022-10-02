import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent implements OnInit {
  searchPlaceHolder = 'Filter by title, companies, expertise...';
  tabletView = false;
  hideInput = false;
  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.addBreakPoints();
  }

  addBreakPoints() {
    const smallerTablePoint = '(max-width: 750px)';
    const tabletPoint = '(max-width: 900px)';

    this.breakpointObserver
      .observe([smallerTablePoint, tabletPoint])
      .subscribe((breakpointState) => {
        const breakpoints = breakpointState.breakpoints;

        if (breakpoints[tabletPoint]) {
          this.searchPlaceHolder = 'Filter by title...';
          this.tabletView = true;
        } else {
          this.searchPlaceHolder = 'Filter by title, companies, expertise...';
          this.tabletView = false;
        }

        if (breakpoints[smallerTablePoint]) {
          this.hideInput = true;
        } else {
          this.hideInput = false;
        }
      });
  }
}
