import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { ThemeModeSliderComponent } from './theme-mode-slider/theme-mode-slider.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DetailComponent } from './detail/detail.component';
import { JobSearchModule } from './job-search/job-search.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ThemeModeSliderComponent,
    DetailComponent,
  ],
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    BrowserModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    LayoutModule,
    BrowserAnimationsModule,
    JobSearchModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
