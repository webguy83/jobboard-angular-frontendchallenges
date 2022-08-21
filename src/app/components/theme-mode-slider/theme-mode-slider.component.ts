import { Component, OnInit } from '@angular/core';
import { StyleManager } from 'src/app/style-manager.service';

@Component({
  selector: 'app-theme-mode-slider',
  templateUrl: './theme-mode-slider.component.html',
  styleUrls: ['./theme-mode-slider.component.scss'],
})
export class ThemeModeSliderComponent implements OnInit {
  isDark$ = this.styleManager.isDark$;
  constructor(private styleManager: StyleManager) {}

  ngOnInit(): void {}

  toggleDarkTheme() {
    this.styleManager.toggleDarkTheme();
  }

  onSliderChange() {
    this.toggleDarkTheme();
  }
}
