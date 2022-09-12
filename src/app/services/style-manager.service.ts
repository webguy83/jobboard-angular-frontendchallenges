import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StyleManager {
  private _isDarkSubject = new BehaviorSubject(false);
  isDark$ = this._isDarkSubject.asObservable();

  toggleDarkTheme() {
    if (this._isDarkSubject.getValue()) {
      document.body.classList.remove('dark-theme');
      this._isDarkSubject.next(false);
    } else {
      document.body.classList.add('dark-theme');
      this._isDarkSubject.next(true);
    }
  }
}
