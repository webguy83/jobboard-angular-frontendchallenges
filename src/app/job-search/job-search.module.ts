import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from './home/home.component';
import { JobCardComponent } from './job-card/job-card.component';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { JobSearchRoutingModule } from './job-search-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoadingService } from '../shared/loading/loading.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { CustomCheckboxComponent } from './custom-checkbox/custom-checkbox.component';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    HomeComponent,
    JobCardComponent,
    FilterBarComponent,
    FilterDialogComponent,
    CustomCheckboxComponent,
    CustomInputComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    JobSearchRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
  ],
  providers: [LoadingService],
})
export class JobSearchModule {}
