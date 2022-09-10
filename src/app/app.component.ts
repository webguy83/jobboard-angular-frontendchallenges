import { Component, HostBinding, OnInit } from '@angular/core';
import { LoadingService } from './components/loading/loading.service';
import { StyleManager } from './style-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LoadingService],
})
export class AppComponent implements OnInit {
  @HostBinding('class') className = '';
  title = 'job-board';

  constructor(private styleManager: StyleManager) {}

  ngOnInit(): void {
    this.styleManager.isDark$.subscribe((isDark) => {
      const darkModeClassName = 'dark-theme';
      this.className = isDark ? darkModeClassName : '';
    });
  }
}
