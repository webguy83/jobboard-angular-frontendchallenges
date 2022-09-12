import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { JobCardComponent } from './job-card/job-card.component';
import { FilterInputComponent } from './filter-input/filter-input.component';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { LoadingComponent } from '../loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { JobSearchRoutingModule } from './job-search-routing.module';
import { StyledButtonDirective } from '../directives/styled-button.directive';

@NgModule({
  declarations: [
    HomeComponent,
    JobCardComponent,
    FilterInputComponent,
    FilterBarComponent,
    LoadingComponent,
    StyledButtonDirective,
  ],
  imports: [CommonModule, MatProgressSpinnerModule, JobSearchRoutingModule],
})
export class JobSearchModule {}
