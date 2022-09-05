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
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { JobCardComponent } from './components/job-card/job-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ThemeModeSliderComponent,
    HomeComponent,
    FilterBarComponent,
    FilterInputComponent,
    StyledButtonDirective,
    JobCardComponent,
  ],
  imports: [
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
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
