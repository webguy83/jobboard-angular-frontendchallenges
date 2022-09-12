import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { JobCardComponent } from './job-card/job-card.component';
import { FilterInputComponent } from './filter-input/filter-input.component';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { JobSearchRoutingModule } from './job-search-routing.module';
import { StyledButtonDirective } from '../directives/styled-button.directive';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    JobCardComponent,
    FilterInputComponent,
    FilterBarComponent,
    StyledButtonDirective,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatProgressSpinnerModule,
    JobSearchRoutingModule,
  ],
})
export class JobSearchModule {}
