import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { ThemeModeSliderComponent } from './components/theme-mode-slider/theme-mode-slider.component';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './components/home/home.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { FilterInputComponent } from './components/filter-input/filter-input.component';
import { StyledButtonDirective } from './directives/styled-button.directive';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ThemeModeSliderComponent, HomeComponent, FilterBarComponent, FilterInputComponent, StyledButtonDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
