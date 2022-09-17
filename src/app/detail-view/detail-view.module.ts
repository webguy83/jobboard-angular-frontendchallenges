import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import { DetailViewRoutingModule } from './detail-view-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DetailComponent],
  imports: [CommonModule, DetailViewRoutingModule, SharedModule],
})
export class DetailViewModule {}
